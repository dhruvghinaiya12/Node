const {Router}=require("express")
const ResultController=require ("../controller/ResultController");

const ResultRoutes=Router();

ResultRoutes.get("/",ResultController.getResult)

module.exports=ResultRoutes;
