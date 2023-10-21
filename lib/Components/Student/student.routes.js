"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authentication_1 = require("../../utils/authentication");
const facultyAuth_1 = require("../../utils/facultyAuth");
const student_controller_1 = require("./student.controller");
class studentRoutes {
    constructor() {
        this.studentController = new student_controller_1.default();
        this.router = (0, express_1.Router)();
        this.initalizeRoutes();
    }
    initalizeRoutes() {
        this.router.post('/signup', authentication_1.default, facultyAuth_1.default, this.studentController.createStudent);
        this.router.post('/login', this.studentController.loginStudent);
        this.router.post('/logout', authentication_1.default, this.studentController.logOutStudent);
        this.router.get('/', authentication_1.default, facultyAuth_1.default, this.studentController.getStudents);
        this.router.patch('/update/:id?', authentication_1.default, this.studentController.updateStudent);
        this.router.delete('/delete/:id?', authentication_1.default, facultyAuth_1.default, this.studentController.deleteStudent);
        this.router.delete('/del', authentication_1.default, facultyAuth_1.default, this.studentController.deleteAllStudents);
        this.router.get('/me', authentication_1.default, this.studentController.getProfile);
        this.router.post('/getAbsentStudents', this.studentController.getAbsentStudentBatchYearSemesterDateWise);
        this.router.post('/getMoreThen75PercentAttendanceStudent', this.studentController.getMoreThen75PercentStudent);
        this.router.post('/getVacancySeat', authentication_1.default, facultyAuth_1.default, this.studentController.getVacancySeat);
    }
}
exports.default = new studentRoutes().router;
//# sourceMappingURL=student.routes.js.map