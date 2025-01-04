module.exports.index = (req, res)=>{
    res.render('user/payments', {user : req.user});
}