import * as mongoose from 'mongoose';
import Student from './student.model';

/**
 *
 * @param studentBody => Department Object to be created.
 */
export async function createStudent(studentBody) {
	try {
		return await Student.create(studentBody);
	} catch (error) {}
}

/**
 *
 * @param studentBody => Department Object to be created.
 */
export async function findStudentByEmailId(emailId) {
	try {
		return await Student.findOne({ emailId });
	} catch (error) {}
}

export async function findStudents() {
	try {
		return await Student.find().lean();
	} catch (error) {}
}

/**
 *
 * @param id UserID
 * @returns User
 */
export async function findStudentyById(id) {
	try {
		return await Student.findById(new mongoose.Types.ObjectId(id));
	} catch (error) {}
}
