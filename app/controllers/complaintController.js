module.exports.index = (req,res)=>{
    res.render('user/complaints', {user : req.user});
}