module.exports.index = (req, res)=>{
    res.render('user/payments', {user : req.user});
}

module.exports.getCreateView = (req, res)=>{
    res.render('user/forms/payments', {user : req.user});
}