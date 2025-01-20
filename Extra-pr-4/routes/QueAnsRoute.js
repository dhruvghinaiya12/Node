const {Router}=require("express")
const QueAnsController=require ("../controller/QueAnsController");

const QueAnsRoutes=Router();

QueAnsRoutes.get("/getAllQuestions",QueAnsController.getAllQuestion)
QueAnsRoutes.post("/addQuestion",QueAnsController.CreateQustion)
QueAnsRoutes.patch("/:questionId",QueAnsController.updateQustion)
QueAnsRoutes.delete("/:questionId",QueAnsController.deleteQustion)


module.exports=QueAnsRoutes;

