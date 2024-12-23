const CheckSuperAdmin=(req,res,next)=>{
    if(req.user.role=="SuperAdmin"){
        return next();
    }
    else{
        return res.send("you are not accessing this")
    }
}

const CheckAdmin=(req,res,next)=>{
    if(req.user.role=="Admin"){
        return next();
    }
    else{
        return res.send("you are not accessing this")
    }
}

module.exports = {CheckSuperAdmin,CheckAdmin};    