const {Router}=require("express")
const ExamController=require ("../controller/ExamController");

const ExamRoutes=Router();

ExamRoutes.get("/getExam",ExamController.GetExam)
ExamRoutes.post("/addExam",ExamController.CreateExam)
ExamRoutes.patch("/:examId",ExamController.UpdateExam)
ExamRoutes.delete("/:examId",ExamController.DeleteExam)


module.exports=ExamRoutes;

