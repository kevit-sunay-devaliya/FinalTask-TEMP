import { Router } from 'express';

import authentication from '../../utils/authentication';
import authorization from '../../utils/facultyAuth';
import studentController from './student.controller';

class studentRoutes {
	public router: Router;

	studentController = new studentController();

	constructor() {
		this.router = Router();
		this.initalizeRoutes();
	}

	initalizeRoutes() {
		//Create New Student
		this.router.post(
			'/signup',
			authentication,
			authorization,
			this.studentController.createStudent,
		);

		//Login Student
		this.router.post('/login', this.studentController.loginStudent);

		//LogOut Students
		this.router.post(
			'/logout',
			authentication,
			this.studentController.logOutStudent,
		);

		//List Student
		this.router.get(
			'/',
			authentication,
			authorization,
			this.studentController.getStudents,
		);

		//Update Student
		this.router.patch(
			'/update/:id?',
			authentication,
			this.studentController.updateStudent,
		);

		//Delete Student
		this.router.delete(
			'/delete/:id?',
			authentication,
			authorization,
			this.studentController.deleteStudent,
		);

		//Delete All Students
		this.router.delete(
			'/delete',
			authentication,
			authorization,
			this.studentController.deleteAllStudents,
		);

		//Get Profile
		this.router.get(
			'/me',
			authentication,
			this.studentController.getProfile,
		);

		//Student Analysis Routes
		this.router.post(
			'/getAbsentStudents',
			this.studentController.getAbsentStudentBatchYearSemesterDateWise,
		);
	}
}

export default new studentRoutes().router;
