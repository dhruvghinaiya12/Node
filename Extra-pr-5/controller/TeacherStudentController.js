const TeacherStudent = require("../model/TeacherStudentSchema");
const User = require("../model/UserSchema");

exports.AssignTeacher = async (req, res) => {
  try {
    const { teacherId, studentId } = req.body;

    let teacher = await User.findById(teacherId);
    if (!teacher) {
      return res.status(404).send("Teacher not found ");
    }

    let student = await User.findById(studentId);
    if (!student ) {
      return res.status(404).send("Student not found ");
    }

    const assign = await TeacherStudent.create({ teacherId, studentId });
    res.status(201).send(assign);

  } catch (error) {
    console.log(error);
  }
};


exports.ViewAllTeacherStudent = async (req, res) => {
    try {
      const data = await TeacherStudent.find().populate("teacherId").populate("studentId");
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  exports.teacherViewAllStudent = async (req, res) => {
    try {
      const { teacherId } = req.params;
      const data = await TeacherStudent.find({ teacherId }).populate("studentId");
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  exports.studentViewAllTeacher = async (req, res) => {
    try {
      const { studentId } = req.params;
      const data = await TeacherStudent.find({ studentId }).populate("teacherId");
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  