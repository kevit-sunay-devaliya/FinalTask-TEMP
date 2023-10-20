"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fillAttendance = void 0;
const student_DAL_1 = require("../Student/student.DAL");
async function fillAttendance(attendanceBody) {
    try {
        attendanceBody.map(async (attendance) => {
            if (attendance.studentId && attendance.date && attendance.present) {
                const student = await (0, student_DAL_1.findStudentById)(attendance.studentId);
                if (!student.attendance.some((item) => item.date === attendance.date)) {
                    student.attendance.push({
                        date: attendance.date,
                        present: attendance.present,
                    });
                    await student.save();
                }
                else {
                    throw new Error();
                }
            }
        });
        return true;
    }
    catch (error) {
        throw new Error(error);
    }
}
exports.fillAttendance = fillAttendance;
//# sourceMappingURL=attendance.DAL.js.map