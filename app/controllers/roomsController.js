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