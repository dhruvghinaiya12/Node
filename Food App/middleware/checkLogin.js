const isLogin=(res,req,next)=>{
    let {userId,username}=req.cookies
    if(userId&&username){
        next()
    }else{
        res.redirect('/user/login')
    }
}

module.exports = isLogin;