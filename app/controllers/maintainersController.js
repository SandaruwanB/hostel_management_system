module.exports.index = (req,res)=>{
    res.render('user/maintainers', {user : req.user})
}