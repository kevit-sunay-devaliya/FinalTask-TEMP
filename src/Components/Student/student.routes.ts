import { Router } from 'express';
import authentication from '../../utils/authentication';
import studentController from './student.controller';

// import authorization from '../../utils/authorization';

class studentRoutes {
	public router: Router;

	studentController = new studentController();

	constructor() {
		this.router = Router();
		this.initalizeRoutes();
	}

	initalizeRoutes() {
		//Create New Student
		this.router.post('/signup', this.studentController.createStudent);

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
			this.studentController.deleteStudent,
		);

		//Get Profile
		this.router.get(
			'/me',
			authentication,
			this.studentController.getProfile,
		);
	}
}

export default new studentRoutes().router;
