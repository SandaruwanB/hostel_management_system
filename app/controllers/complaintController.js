module.exports.index = (req,res)=>{
    res.render('user/complaints', {user : req.user});
}

module.exports.getCreateView = (req,res)=>{
    
}

module.exports.create = (req,res)=>{
    
}

module.exports.getReadView = (req,res)=>{
    res.render('user/forms/complaints', {user : req.user});
}