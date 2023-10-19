import mongoose from 'mongoose';

const { Schema, model } = mongoose;

// Department Schema For DataBase
const departmentSchema = new Schema(
	{
		name: {
			type: Schema.Types.String,
			required: true,
		},
		totalSeat: {
			type: Schema.Types.Number,
			required: true,
		},
		initial: {
			type: Schema.Types.String,
			required: true,
		},
	},
	{
		timestamps: true,
	},
);

const Department = model('Department', departmentSchema);
export default Department;
