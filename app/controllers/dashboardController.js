module.exports.index = async (req,res)=>{
    res.render('user/dashboard', {user : req.user});
}