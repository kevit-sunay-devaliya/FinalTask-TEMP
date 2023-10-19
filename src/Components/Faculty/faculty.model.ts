import * as bcrypt from 'bcrypt';
import mongoose from 'mongoose';


const { Schema, model } = mongoose;

// Faculty Schema For DataBase
const facultySchema = new Schema(
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
		role: {
			type: Schema.Types.String,
			required: true,
		},
	},
	{
		timestamps: true,
	},
);

//encrypt password
facultySchema.pre('save', async function (next) {
	try {
		if (this.isModified('password')) {
			this.password = await bcrypt.hash(this.password, 8);
		}
		next();
	} catch (error) {}
});

const Faculty = model('Faculty', facultySchema);
export default Faculty;
