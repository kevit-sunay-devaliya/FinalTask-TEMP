"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt = require("bcrypt");
const mongoose_1 = require("mongoose");
const { Schema, model } = mongoose_1.default;
const attandanceSchema = new mongoose_1.default.Schema({
    studentId: String,
    date: String,
    present: Boolean,
});
const studentSchema = new Schema({
    name: {
        type: Schema.Types.String,
        required: true,
    },
    emailId: {
        type: Schema.Types.String,
        required: true,
        unique: true
    },
    phone_number: {
        type: Schema.Types.Number,
        unique: true,
        minlength: 10
    },
    password: {
        type: Schema.Types.String,
        require: true,
    },
    address: {
        type: Schema.Types.String,
        required: true,
    },
    departmentId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Department',
    },
    authToken: {
        type: Schema.Types.String,
        required: true,
        default: ' ',
    },
    semester: {
        type: Schema.Types.Number,
        required: true,
        default: 1,
    },
    batchYear: {
        type: Schema.Types.Number,
        required: true,
    },
    attendance: [{
            type: mongoose_1.default.Schema.Types.Mixed,
            default: []
        }]
}, {
    timestamps: true,
});
studentSchema.index({ emailId: 1, departmentId: 1 }, { unique: true });
studentSchema.pre('save', async function (next) {
    try {
        if (this.isModified('password')) {
            this.password = await bcrypt.hash(this.password, 8);
        }
        next();
    }
    catch (error) { }
});
const Student = model('Student', studentSchema);
exports.default = Student;
//# sourceMappingURL=student.model.js.map