import * as bcrypt from 'bcrypt';
import mongoose from 'mongoose';

// import { findDepartmentById } from "Components/Department/department.DAL";
// import Department from "Components/Department/department.model";

const { Schema, model } = mongoose;

// const attandanceSchema = new mongoose.Schema({
//     studentId: String,
//     present: Boolean,
// });

// const userSchema = new mongoose.Schema({
//     name: String,
//     age: Number,
// });

// Faculty Schema For DataBase
const studentSchema = new Schema(
	{
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
		// departmentId: {
		// 	type: Schema.Types.ObjectId,
		// 	required: true,
		// 	ref: 'Department',
		// },
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
		// onRoll: {
		//     type: Schema.Types.Boolean,
		//     required: true,
		//     default: true
		// },
		// attendance: [{
		//     type:mongoose.Schema.Types.Mixed,
		//     default:[]
		// }]
	},
	{
		timestamps: true,
	},
);

//encrypt password
studentSchema.pre('save', async function (next) {
	try {
		if (this.isModified('password')) {
			this.password = await bcrypt.hash(this.password, 8);
		}
		next();
	} catch (error) {}
});

const Student = model('Student', studentSchema);
export default Student;
