"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const attendance_routes_1 = require("./Components/Attendance/attendance.routes");
const department_routes_1 = require("./Components/Department/department.routes");
const faculty_routes_1 = require("./Components/Faculty/faculty.routes");
const student_routes_1 = require("./Components/Student/student.routes");
const index_1 = require("./index");
class ApplicationConfig {
    static registerRoute(app) {
        app.use('/', index_1.default);
        app.use('/department', department_routes_1.default);
        app.use('/faculty', faculty_routes_1.default);
        app.use('/student', student_routes_1.default);
        app.use('/attendance', attendance_routes_1.default);
    }
}
exports.default = ApplicationConfig;
//# sourceMappingURL=application.routes.js.map