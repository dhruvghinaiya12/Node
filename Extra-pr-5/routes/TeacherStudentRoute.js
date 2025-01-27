const { Router } = require("express");
const TeacherStudentController = require("../controller/TeacherStudentController");
const CheckToken = require("../middleware/Auth");

const TeacherStudentRoute = Router();

TeacherStudentRoute.post("/assign-teacher", CheckToken, TeacherStudentController.AssignTeacher);
TeacherStudentRoute.get("/view-all", CheckToken, TeacherStudentController.ViewAllTeacherStudent);
TeacherStudentRoute.get("/viewstudents/:teacherId", CheckToken, TeacherStudentController.teacherViewAllStudent);
TeacherStudentRoute.get("/viewteachers/:studentid", CheckToken, TeacherStudentController.studentViewAllTeacher);

module.exports = TeacherStudentRoute;


