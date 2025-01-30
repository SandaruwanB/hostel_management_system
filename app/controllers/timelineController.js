module.exports.index = async (req,res)=>{
    res.render('student/timeline', {user : req.user})
}