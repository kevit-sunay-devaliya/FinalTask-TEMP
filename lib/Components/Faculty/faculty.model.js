"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt = require("bcrypt");
const mongoose_1 = require("mongoose");
const { Schema, model } = mongoose_1.default;
const facultySchema = new Schema({
    name: {
        type: Schema.Types.String,
        required: true,
    },
    emailId: {
        type: Schema.Types.String,
        required: true,
    },
    password: {
        type: Schema.Types.String,
        require: true,
    },
    address: {
        type: Schema.Types.String,
        required: true,
    },
    authToken: {
        type: Schema.Types.String,
        required: true,
        default: ' ',
    },
    role: {
        type: Schema.Types.String,
        required: true,
    },
}, {
    timestamps: true,
});
facultySchema.pre('save', async function (next) {
    try {
        if (this.isModified('password')) {
            this.password = await bcrypt.hash(this.password, 8);
        }
        next();
    }
    catch (error) { }
});
const Faculty = model('Faculty', facultySchema);
exports.default = Faculty;
//# sourceMappingURL=faculty.model.js.map