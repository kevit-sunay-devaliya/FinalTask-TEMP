import mongoose from 'mongoose';
import Faculty from './faculty.model';

/**
 *
 * @param facultyBody => Department Object to be created.
 */
export async function createFaculty(facultyBody) {
	try {
		return await Faculty.create(facultyBody);
	} catch (error) {}
}

/**
 *
 * @param facultyBody => Department Object to be created.
 */
export async function findFacultyByEmailId(emailId) {
	try {
		return await Faculty.findOne({ emailId });
	} catch (error) {}
}

export async function findFaculties(accessRoles) {
	try {
		return await Faculty.aggregate([
			{
				$match: {
					role: {
						$in: accessRoles,
					},
				},
			},
		]).exec();
	} catch (error) {}
}

/**
 *
 * @param id UserID
 * @returns User
 */
export async function findFacultyById(id) {
	try {
		return await Faculty.findById(new mongoose.Types.ObjectId(id));
	} catch (error) {}
}
