const rooms = require('../models/rooms');

module.exports.index = async (req,res)=>{
    const allRooms = await rooms.findAll();
    res.render('user/rooms', {user : req.user, rooms : allRooms});
}