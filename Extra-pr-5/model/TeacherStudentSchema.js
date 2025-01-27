const mongoose = require('mongoose');
const User = require('./UserSchema');

const teacherStudentSchema = new mongoose.Schema({

  teacherId: [{ type: mongoose.Schema.Types.ObjectId,ref: User }],
  studentId: [{type: mongoose.Schema.Types.ObjectId,ref: User}],
});

const TeacherStudent = mongoose.model("TeacherStudent", teacherStudentSchema);

module.exports = TeacherStudent;
