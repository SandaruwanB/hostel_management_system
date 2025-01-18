module.exports.managerView = async (req, res)=>{
    res.render('user/user', {user : req.user});
}