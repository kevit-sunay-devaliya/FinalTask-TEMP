"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const department_DAL_1 = require("./department.DAL");
class departmentController {
    async createDepartment(req, res) {
        try {
            const departmentObj = req.body;
            const department = await (0, department_DAL_1.createDepartment)(departmentObj);
            res.status(200).send({
                success: true,
                data: {
                    statusCode: 200,
                    data: department,
                    message: 'New Department Created Successfully',
                },
            });
        }
        catch (error) {
            res.status(500).send({
                success: false,
                error: {
                    statusCode: 500,
                    message: 'Error while creating new Department',
                },
            });
        }
    }
    async getDepartments(req, res) {
        try {
            const departments = await (0, department_DAL_1.findDepartments)();
            res.status(200).send({
                success: true,
                data: {
                    statusCode: 200,
                    data: departments,
                    message: 'Success',
                },
            });
        }
        catch (error) {
            res.status(500).send({
                success: false,
                error: {
                    statusCode: 500,
                    message: 'Error while Loading Departments',
                },
            });
        }
    }
    async updateDepartment(req, res) {
        try {
            const id = req.params.id;
            const department = await (0, department_DAL_1.findDepartmentById)(id);
            if (!department) {
                res.status(404).send({
                    success: false,
                    error: { statusCode: 404, message: 'Department not found' },
                });
            }
            for (const field in req.body) {
                department[field] = req.body[field];
            }
            await department.save();
            res.status(200).send({
                success: true,
                data: {
                    statusCode: 200,
                    data: department,
                    message: 'Department Updated Successfully',
                },
            });
        }
        catch (error) {
            res.status(500).send({ error: error });
        }
    }
    async deleteDepartment(req, res) {
        try {
            const id = req.params.id;
            const department = await (0, department_DAL_1.findDepartmentById)(id);
            if (!department) {
                res.status(404).send({
                    success: false,
                    error: { statusCode: 404, message: 'Department not found' },
                });
            }
            await department.deleteOne();
            res.status(200).send({
                success: true,
                data: {
                    statusCode: 200,
                    data: department,
                    message: 'Department Deleted Successfully',
                },
            });
        }
        catch (error) {
            res.status(500).send({
                success: false,
                error: {
                    statusCode: 500,
                    message: 'Error while deleting Users',
                },
            });
        }
    }
}
exports.default = departmentController;
//# sourceMappingURL=department.controller.js.map