const valid=(req,res,next)=>{
    let {username, password, email} = req.body;
    if(!username ||!password ||!email){
        return res.status(400).send({message: 'All fields are required.'})
    }
    else{
        next()
    }
}

module.exports=valid;