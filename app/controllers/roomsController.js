const { Op } = require('sequelize');
const rooms = require('../models/rooms');

module.exports.index = async (req,res)=>{
    const allRooms = await rooms.findAll();
    res.render('user/rooms', {user : req.user, rooms : allRooms});
}

module.exports.create = async (req,res)=>{
    const { roomNumber, bedsCount } = req.body;

    await rooms.findOne({
        where : {
            room_number : roomNumber
        }
    }).then(async (room)=>{
        if (room){
            res.json({result : "This room already exists"});
        } else {
            await rooms.create({
                room_number : roomNumber,
                beds_count : bedsCount
            }).then(()=>{
                res.json({result : "success"});
            });
        }
    });
}

module.exports.delete = async (req,res)=>{
    const reqId = req.params.id;

    await rooms.destroy({
        where : {
            id : reqId
        }
    }).then(()=>{
        res.json({result : "success"});
    })
}


module.exports.update = async (req,res)=>{
    const reqId = req.params.id;
    const { roomNumber, bedsCount } = req.body;

    await rooms.findAll({
        where : {
            [Op.and] : [
                {room_number : roomNumber},
                {id : {[Op.ne] : reqId}}
            ]
        }
    }).then(async (existing)=>{
        if (existing.length > 0){
            res.json({result : "This room already exists"});
        } else {
            await rooms.findOne({
                where : {
                    id : reqId
                }
            }).then(async (room)=>{
                await room.update({
                    room_number : roomNumber,
                    beds_count : bedsCount
                }).then(()=>{
                    res.json({result : "success"});
                });
            });
        }
    });
}