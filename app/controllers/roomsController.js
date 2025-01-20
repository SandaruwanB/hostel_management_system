const rooms = require('../models/rooms');

module.exports.index = async (req,res)=>{
    const allRooms = await rooms.findAll();
    res.render('user/rooms', {user : req.user, rooms : allRooms});
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