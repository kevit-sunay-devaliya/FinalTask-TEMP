/* eslint-disable @typescript-eslint/no-unused-vars */
// import * as fs from 'fs';
// import { join } from 'path';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import Config from '../../config';

import {
	createStudent,
	findStudentByEmailId,
	findStudentyById,
	findStudents,
} from './student.DAL';


class studentController {
	async createStudent(req, res, next) {
		try {
			const studentObj = req.body;
			console.log(studentObj);
			const student = await createStudent(studentObj);
			// console.log(studentObj);
			await student.save();

			res.status(201).send({
				success: true,
				data: {
					statusCode: 201,
					data: student,
					message: 'New Student Created Successfully',
				},
			});
		} catch (error) {
			res.status(500).send({
				success: false,
				error: {
					statusCode: 500,
					message: 'Error while creating new Student',
				},
			});
		}
	}

	async loginStudent(req, res, next) {
		try {
			const { emailId, password } = req.body;
			if (!emailId || !password) {
				res.status(404).send({
					success: false,
					error: {
						statusCode: 404,
						message: 'Please Provide an emailId and password',
					},
				});
			}
			const student = await findStudentByEmailId(emailId);
			if (student) {
				const match = await bcrypt.compare(password, student.password);
				if (match) {
					// const privateKey = fs.readFileSync(
					//     join(__dirname,'../../../keys/Private.key'),{ encoding: 'utf8', flag: 'r' });

					const privateKey: string = Config.server.private;
					const token = jwt.sign(
						{ id: student._id, emailId: student.emailId },
						privateKey,
					);
					student.authToken = token;
					// console.log(student.authToken)
					await student.save();
					res.status(200).send({
						success: true,
						data: {
							statusCode: 200,
							data: student.authToken,
							message: 'Authentication Token Generated',
						},
					});
				} else {
					res.status(401).send({
						success: false,
						error: {
							statusCode: 401,
							message: 'Invalid EmailId or Password',
						},
					});
				}
			} else {
				res.status(401).send({
					success: false,
					error: {
						statusCode: 401,
						message: 'Invalid EmailId or Password',
					},
				});
			}
		} catch (error) {
			res.status(500).send({
				success: false,
				error: { statusCode: 500, message: 'Error while Login' },
			});
		}
	}

	async logOutStudent(req, res) {
		try {
			const id = req.loginUser.id;
			const student = await findStudentyById(id);
			if (!student) {
				res.status(404).send({
					success: false,
					error: { statusCode: 404, message: 'student not found' },
				});
			}
			student.authToken = ' ';
			await student.save();
			res.status(200).send({
				success: true,
				data: {
					statusCode: 200,
					data: student,
					message: 'student Logout Successfully',
				},
			});
		} catch (error) {
			res.status(500).send({
				success: false,
				error: { statusCode: 500, message: 'Error while LogOut' },
			});
		}
	}

	async getStudents(req, res) {
		try {
			const students = await findStudents();
			res.status(200).send({
				success: true,
				data: { statusCode: 200, data: students, message: 'Success' },
			});
		} catch (error) {
			res.status(500).send({
				success: false,
				error: {
					statusCode: 500,
					message: 'Error while Loading Users',
				},
			});
		}
	}

	async updateStudent(req, res) {
		try {
			const id = req.params.id;
			// console.log(id)
			const student = await findStudentyById(id);
			// console.log(student)
			if (!student) {
				res.status(404).send({
					success: false,
					error: { statusCode: 404, message: 'student not found' },
				});
			}

			for (const field in req.body) {
				student[field] = req.body[field];
				// console.log(student)
			}
			await student.save();

			res.status(200).send({
				success: true,
				data: {
					statusCode: 200,
					data: student,
					message: 'student Updated Successfully',
				},
			});
		} catch (error) {
			res.status(500).send({
				success: false,
				error: {
					statusCode: 500,
					message: 'Error while updating student',
				},
			});
		}
	}

	async deleteStudent(req, res) {
		try {
			const id = req.params.id;
			const student = await findStudentyById(id);

			if (!student) {
				res.status(404).send({
					success: false,
					error: { statusCode: 404, message: 'student not found' },
				});
			}
			await student.deleteOne();
			res.status(200).send({
				success: true,
				data: {
					statusCode: 200,
					data: student,
					message: 'student Deleted Sucessfully',
				},
			});
		} catch (error) {
			res.status(500).send({
				success: false,
				error: {
					statusCode: 500,
					message: 'Error while deleting student',
				},
			});
		}
	}

	async getProfile(req, res, next) {
		try {
			const student = await findStudentyById(req.loginUser._id);
			if (!student) {
				res.status(404).send({
					success: false,
					error: { statusCode: 404, message: 'Student  not found' },
				});
			}
			res.status(200).send({
				success: true,
				data: { statusCode: 200, data: student, message: 'Profile' },
			});
		} catch {
			res.status(500).send({
				success: false,
				error: {
					statusCode: 500,
					message: 'Error while Loading your profile',
				},
			});
		}
	}
}
export default studentController;
