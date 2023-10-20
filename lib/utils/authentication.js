"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jwt = require("jsonwebtoken");
const faculty_DAL_1 = require("../Components/Faculty/faculty.DAL");
const student_DAL_1 = require("../Components/Student/student.DAL");
const config_1 = require("../config");
exports.default = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '');
        const privateKey = config_1.default.server.private;
        const { id } = jwt.verify(token, privateKey);
        const loginUser = (await (0, faculty_DAL_1.findFacultyById)(id)) === null
            ? await (0, student_DAL_1.findStudentById)(id)
            : await (0, faculty_DAL_1.findFacultyById)(id);
        if (!loginUser) {
            res.status(400).send({
                success: false,
                error: { statusCode: 400, message: 'User not Found' },
            });
        }
        if (token === loginUser.authToken) {
            req.loginUser = loginUser;
            next();
        }
        else {
            res.status(401).send({
                success: false,
                error: { statusCode: 401, message: 'Unauthorized User' },
            });
        }
    }
    catch (error) {
        res.status(401).send({
            success: false,
            error: { statusCode: 401, message: 'Unauthorized User' },
        });
    }
};
//# sourceMappingURL=authentication.js.map