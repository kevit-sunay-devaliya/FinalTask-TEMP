"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBatchDepartmentWiseData = exports.deleteAll = exports.findStudentById = exports.findStudents = exports.findStudentByEmailId = exports.createStudent = void 0;
const mongoose = require("mongoose");
const student_model_1 = require("./student.model");
async function createStudent(studentBody) {
    try {
        return await student_model_1.default.create(studentBody);
    }
    catch (error) { }
}
exports.createStudent = createStudent;
async function findStudentByEmailId(emailId) {
    try {
        return await student_model_1.default.findOne({ emailId });
    }
    catch (error) { }
}
exports.findStudentByEmailId = findStudentByEmailId;
async function findStudents() {
    try {
        return await student_model_1.default.find().lean();
    }
    catch (error) { }
}
exports.findStudents = findStudents;
async function findStudentById(id) {
    try {
        return await student_model_1.default.findById(new mongoose.Types.ObjectId(id));
    }
    catch (error) { }
}
exports.findStudentById = findStudentById;
async function deleteAll() {
    try {
        return await student_model_1.default.deleteMany({});
    }
    catch (error) { }
}
exports.deleteAll = deleteAll;
async function getBatchDepartmentWiseData() {
    try {
        const pipeline = [
            {
                $lookup: {
                    from: 'departments',
                    localField: 'departmentId',
                    foreignField: '_id',
                    as: 'result',
                },
            },
            {
                $unwind: {
                    path: '$result',
                },
            },
            {
                $group: {
                    _id: {
                        batchYear: '$batchYear',
                        department: '$result.initial',
                    },
                    count: {
                        $sum: 1,
                    },
                },
            },
            {
                $addFields: {
                    TotalYearCount: '$count',
                },
            },
            {
                $group: {
                    _id: '$_id.batchYear',
                    branches: {
                        $push: {
                            dep: '$_id.department',
                            totalStudent: '$count',
                        },
                    },
                },
            },
            {
                $addFields: {
                    TotalStudents: {
                        $reduce: {
                            input: '$branches',
                            initialValue: 0,
                            in: {
                                $add: ['$$value', '$$this.totalStudent'],
                            },
                        },
                    },
                },
            },
            {
                $addFields: {
                    year: '$_id',
                },
            },
            {
                $project: {
                    data: {
                        $map: {
                            input: '$branches',
                            as: 'branch',
                            in: {
                                k: '$$branch.dep',
                                v: '$$branch.totalStudent',
                            },
                        },
                    },
                    _id: 0,
                    year: 1,
                    TotalStudents: 1,
                },
            },
            {
                $project: {
                    branches: {
                        $arrayToObject: '$data',
                    },
                    year: 1,
                    TotalStudents: 1,
                },
            },
        ];
        const data = await student_model_1.default.aggregate(pipeline)
            .allowDiskUse(true)
            .exec();
        return data;
    }
    catch (error) {
        throw new Error(error);
    }
}
exports.getBatchDepartmentWiseData = getBatchDepartmentWiseData;
//# sourceMappingURL=student.DAL.js.map