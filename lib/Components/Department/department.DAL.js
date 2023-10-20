"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findDepartmentById = exports.findDepartments = exports.createDepartment = void 0;
const department_model_1 = require("./department.model");
async function createDepartment(departmentBody) {
    try {
        return await department_model_1.default.create(departmentBody);
    }
    catch (error) {
        throw new Error(error);
    }
}
exports.createDepartment = createDepartment;
async function findDepartments() {
    try {
        return await department_model_1.default.find().sort({ name: 1 });
    }
    catch (error) {
        throw new Error(error);
    }
}
exports.findDepartments = findDepartments;
async function findDepartmentById(id) {
    try {
        return await department_model_1.default.findById(id);
    }
    catch (error) {
        throw new Error(error);
    }
}
exports.findDepartmentById = findDepartmentById;
//# sourceMappingURL=department.DAL.js.map