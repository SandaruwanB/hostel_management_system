module.exports.index = (req,res)=>{
    res.render('user/students', {user : req.user});
}

module.exports.getCreateView = (req,res)=>{
    res.render('user/forms/students');
}