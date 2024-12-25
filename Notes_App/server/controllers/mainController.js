exports.homepage=async(req,res)=>{
    const locals={
        title:"nodejs",
        description:"free nodejs note app",
    }
    res.render("index", locals)
}
exports.about=async(req,res)=>{
    const locals={
        title:"about nodejs",
        description:"free nodejs note app",
    }
    res.render("about", locals)
}