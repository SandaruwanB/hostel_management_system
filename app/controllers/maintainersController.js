module.exports.index = (req,res)=>{
    res.render('user/maintainers', {user : req.user})
}

module.exports.getCreateView = (req,res)=>{
    res.render('user/forms/maintainers', {user : req.user});
}

module.exports.create = (req,res)=>{
    
}