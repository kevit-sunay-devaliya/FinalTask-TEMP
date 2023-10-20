import { Router } from 'express';

import authorizationAdmin from '../../utils/adminAuth';
import authentication from '../../utils/authentication';
import authorizationFaculty from '../../utils/facultyAuth';
import facultyController from './faculty.controller';

class facultyRoutes {
	public router: Router;

	facultyController = new facultyController();

	constructor() {
		this.router = Router();
		this.initalizeRoutes();
	}

	initalizeRoutes() {
		//Create New User
		this.router.post(
			'/signup',
			authentication,
			authorizationAdmin,
			this.facultyController.createFaculty,
		);

		//Login User
		this.router.post('/login', this.facultyController.loginFaculty);

		//LogOut Users
		this.router.post(
			'/logout',
			authentication,
			this.facultyController.logOutFaculty,
		);

		//List User
		this.router.get(
			'/',
			authentication,
			authorizationAdmin,
			this.facultyController.getFaculties,
		);

		//Update User
		this.router.patch(
			'/update/:id?',
			authentication,
			authorizationFaculty,
			this.facultyController.updateFaculty,
		);

		//Delete User
		this.router.delete(
			'/delete/:id?',
			authentication,
			authorizationAdmin,
			this.facultyController.deleteFaculty,
		);

		//Get Profile
		this.router.get(
			'/me',
			authentication,
			this.facultyController.getProfile,
		);
	}
}

export default new facultyRoutes().router;
