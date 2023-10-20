"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const adminAuth_1 = require("../../utils/adminAuth");
const authentication_1 = require("../../utils/authentication");
const department_controller_1 = require("./department.controller");
class departmentRoutes {
    constructor() {
        this.departmentController = new department_controller_1.default();
        this.router = (0, express_1.Router)();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.post('/add', authentication_1.default, adminAuth_1.default, this.departmentController.createDepartment);
        this.router.get('/', authentication_1.default, adminAuth_1.default, this.departmentController.getDepartments);
        this.router.patch('/update/:id', authentication_1.default, adminAuth_1.default, this.departmentController.updateDepartment);
        this.router.delete('/delete/:id', authentication_1.default, adminAuth_1.default, this.departmentController.deleteDepartment);
    }
}
exports.default = new departmentRoutes().router;
//# sourceMappingURL=department.routes.js.map