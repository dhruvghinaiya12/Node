const {Router}=require("express")
const QueAnsController=require ("../controller/QueAnsController");
const CheckToken = require("../middleware/auth");

const QueAnsRoutes=Router();

QueAnsRoutes.get("/getAllQuestions", QueAnsController.getAllQuestion)
QueAnsRoutes.post("/addQuestion", QueAnsController.CreateQustion)
QueAnsRoutes.patch("/:questionId",CheckToken, QueAnsController.updateQustion)
QueAnsRoutes.delete("/:questionId",CheckToken, QueAnsController.deleteQustion)


module.exports=QueAnsRoutes;

