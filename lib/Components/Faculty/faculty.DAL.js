"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findFacultyById = exports.findFaculties = exports.findFacultyByEmailId = exports.createFaculty = void 0;
const mongoose_1 = require("mongoose");
const faculty_model_1 = require("./faculty.model");
async function createFaculty(facultyBody) {
    try {
        return await faculty_model_1.default.create(facultyBody);
    }
    catch (error) { }
}
exports.createFaculty = createFaculty;
async function findFacultyByEmailId(emailId) {
    try {
        return await faculty_model_1.default.findOne({ emailId });
    }
    catch (error) { }
}
exports.findFacultyByEmailId = findFacultyByEmailId;
async function findFaculties() {
    try {
        return await faculty_model_1.default.find().lean();
    }
    catch (error) { }
}
exports.findFaculties = findFaculties;
async function findFacultyById(id) {
    try {
        return await faculty_model_1.default.findById(new mongoose_1.default.Types.ObjectId(id));
    }
    catch (error) { }
}
exports.findFacultyById = findFacultyById;
//# sourceMappingURL=faculty.DAL.js.map