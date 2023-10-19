import { Router } from 'express';


import authentication from '../../utils/authentication';
import authorization from '../../utils/authorization';
import departmentController from './department.controller';

class departmentRoutes {
	public router: Router;

	departmentController = new departmentController();

	constructor() {
		this.router = Router();
		this.initializeRoutes();
	}

	initializeRoutes() {
		//Create Department
		this.router.post(
			'/add',
			authentication,
			authorization,
			this.departmentController.createDepartment,
		);

		//List Departments
		this.router.get(
			'/',
			authentication,
			authorization,
			this.departmentController.getDepartments,
		);

		//Update Department By Id
		this.router.patch(
			'/update/:id',
			authentication,
			authorization,
			this.departmentController.updateDepartment,
		);

		//Delete Department By Id
		this.router.delete(
			'/delete/:id',
			authentication,
			authorization,
			this.departmentController.deleteDepartment,
		);
	}
}

export default new departmentRoutes().router;
