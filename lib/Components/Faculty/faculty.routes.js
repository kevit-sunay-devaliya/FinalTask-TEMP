"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const adminAuth_1 = require("../../utils/adminAuth");
const authentication_1 = require("../../utils/authentication");
const facultyAuth_1 = require("../../utils/facultyAuth");
const faculty_controller_1 = require("./faculty.controller");
class facultyRoutes {
    constructor() {
        this.facultyController = new faculty_controller_1.default();
        this.router = (0, express_1.Router)();
        this.initalizeRoutes();
    }
    initalizeRoutes() {
        this.router.post('/signup', authentication_1.default, adminAuth_1.default, this.facultyController.createFaculty);
        this.router.post('/login', this.facultyController.loginFaculty);
        this.router.post('/logout', authentication_1.default, this.facultyController.logOutFaculty);
        this.router.get('/', authentication_1.default, adminAuth_1.default, this.facultyController.getFaculties);
        this.router.patch('/update/:id?', authentication_1.default, facultyAuth_1.default, this.facultyController.updateFaculty);
        this.router.delete('/delete/:id?', authentication_1.default, adminAuth_1.default, this.facultyController.deleteFaculty);
        this.router.get('/me', authentication_1.default, this.facultyController.getProfile);
    }
}
exports.default = new facultyRoutes().router;
//# sourceMappingURL=faculty.routes.js.map