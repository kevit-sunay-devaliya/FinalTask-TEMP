"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authentication_1 = require("../../utils/authentication");
const facultyAuth_1 = require("../../utils/facultyAuth");
const attendance_controller_1 = require("./attendance.controller");
class attendanceRoutes {
    constructor() {
        this.attendanceController = new attendance_controller_1.default();
        this.router = (0, express_1.Router)();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.post('/add', authentication_1.default, facultyAuth_1.default, this.attendanceController.fillAttendance);
    }
}
exports.default = new attendanceRoutes().router;
//# sourceMappingURL=attendance.routes.js.map