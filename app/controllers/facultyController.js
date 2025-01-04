module.exports.index = (req,res)=>{
    res.render('user/faculty', {user : req.user})
}