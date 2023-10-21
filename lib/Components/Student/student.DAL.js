"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getVacancySeat = exports.getMoreThen75PercentStudent = exports.getAbsentStudentBatchYearSemesterDateWise = exports.getBatchDepartmentWiseData = exports.deleteAll = exports.findStudentById = exports.findStudents = exports.findStudentByEmailId = exports.createStudent = void 0;
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
async function getAbsentStudentBatchYearSemesterDateWise(requestBody) {
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
                $project: {
                    Absent: {
                        $filter: {
                            input: '$attendance',
                            as: 'attObj',
                            cond: {
                                $and: [
                                    {
                                        $eq: ['$$attObj.present', 'false'],
                                    },
                                    {
                                        $eq: ['$$attObj.date', requestBody.date],
                                    },
                                ],
                            },
                        },
                    },
                    name: 1,
                    address: 1,
                    batchYear: 1,
                    semester: 1,
                    emailId: 1,
                    Department: '$result.name',
                    DepartmentInitial: '$result.initial',
                },
            },
            {
                $match: {
                    $expr: {
                        $gt: [
                            {
                                $size: '$Absent',
                            },
                            0,
                        ],
                    },
                },
            },
        ];
        if (requestBody.batch) {
            const object = {
                $match: {
                    batchYear: requestBody.batch,
                },
            };
            pipeline.unshift(object);
        }
        if (requestBody.branch) {
            const object = {
                $match: {
                    'result.initial': requestBody.branch,
                },
            };
            pipeline.splice(2, 0, object);
        }
        if (requestBody.semester) {
            const object = {
                $match: {
                    semester: requestBody.semester,
                },
            };
            pipeline.unshift(object);
        }
        const data = await student_model_1.default.aggregate(pipeline).exec();
        return data;
    }
    catch (error) {
        throw new Error(error);
    }
}
exports.getAbsentStudentBatchYearSemesterDateWise = getAbsentStudentBatchYearSemesterDateWise;
async function getMoreThen75PercentStudent(requestBody) {
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
                $project: {
                    totalAttendanceDay: {
                        $size: '$attendance',
                    },
                    customArr: {
                        $filter: {
                            input: '$attendance',
                            as: 'attObj',
                            cond: {
                                $and: [
                                    {
                                        $eq: ['$$attObj.present', 'true'],
                                    },
                                ],
                            },
                        },
                    },
                    name: 1,
                    Department: '$result.initial',
                    emailId: 1,
                    address: 1,
                    semester: 1,
                    batchYear: 1,
                },
            },
            {
                $addFields: {
                    presentAttendanceDay: {
                        $size: '$customArr',
                    },
                },
            },
            {
                $addFields: {
                    percentage: {
                        $multiply: [
                            {
                                $divide: ['$presentAttendanceDay', '$totalAttendanceDay'],
                            },
                            100,
                        ],
                    },
                },
            },
            {
                $match: {
                    percentage: {
                        $gt: 75,
                    },
                },
            },
            {
                $project: {
                    customArr: 0,
                    presentAttendanceDay: 0,
                    totalAttendanceDay: 0,
                },
            },
        ];
        if (requestBody.batch) {
            const object = {
                $match: {
                    batchYear: requestBody.batch,
                },
            };
            pipeline.unshift(object);
        }
        if (requestBody.branch) {
            const object = {
                $match: {
                    'result.initial': requestBody.branch,
                },
            };
            pipeline.splice(2, 0, object);
        }
        if (requestBody.semester) {
            const object = {
                $match: {
                    semester: requestBody.semester,
                },
            };
            pipeline.unshift(object);
        }
        const data = await student_model_1.default.aggregate(pipeline).allowDiskUse(true).exec();
        return data;
    }
    catch (error) {
        throw new Error(error);
    }
}
exports.getMoreThen75PercentStudent = getMoreThen75PercentStudent;
async function getVacancySeat(requestBody) {
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
                    departmentTotalSeat: {
                        $first: '$result.totalSeat',
                    },
                },
            },
            {
                $group: {
                    _id: '$_id.batchYear',
                    branches: {
                        $push: {
                            dep: '$_id.department',
                            totalStudent: '$count',
                            totalStudentsIntake: '$departmentTotalSeat',
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
                    TotalStudentsIntake: {
                        $reduce: {
                            input: '$branches',
                            initialValue: 0,
                            in: {
                                $add: ['$$value', '$$this.totalStudentsIntake'],
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
                    _id: 0,
                    AvailableSeat: {
                        $subtract: ['$totalStudentsIntake', '$TotalStudents'],
                    },
                    branches: 1,
                    TotalStudents: 1,
                    TotalStudentsIntake: 1,
                    year: 1,
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
                                v: {
                                    totalStudent: '$$branch.totalStudent',
                                    totalStudentsIntake: '$$branch.totalStudentsIntake',
                                    availableStudent: {
                                        $subtract: ['$$branch.totalStudentsIntake', '$$branch.totalStudent'],
                                    },
                                },
                            },
                        },
                    },
                    year: 1,
                    TotalStudents: 1,
                    TotalStudentsIntake: 1,
                    AvailableSeat: 1,
                },
            },
            {
                $project: {
                    branches: {
                        $arrayToObject: '$data',
                    },
                    year: 1,
                    TotalStudents: 1,
                    TotalStudentsIntake: 1,
                },
            },
        ];
        if (requestBody.batch) {
            const object = {
                $match: {
                    batchYear: requestBody.batch,
                },
            };
            pipeline.unshift(object);
        }
        if (requestBody.branch) {
            const object = {
                $match: {
                    'result.initial': requestBody.branch,
                },
            };
            pipeline.splice(2, 0, object);
        }
        const data = await student_model_1.default.aggregate(pipeline).allowDiskUse(true).exec();
        return data;
    }
    catch (error) {
        throw new Error(error);
    }
}
exports.getVacancySeat = getVacancySeat;
//# sourceMappingURL=student.DAL.js.map