module.exports.index = (req,res)=>{
    res.render('user/students', {user : req.user});
}