/* eslint-disable @typescript-eslint/no-unused-vars */
import mongoose, { ObjectId } from 'mongoose';

import {
	createDepartment,
	findDepartments,
	findDepartmentById,
} from './department.DAL';
import Department from './department.model';

class departmentController {
	/**
	 * Creates A New Department
	 * @param {Request} req => Express Request
	 * @param {Response} res => Express Response
	 */
	async createDepartment(req, res) {
		try {
			const departmentObj = req.body;
			const department = await createDepartment(departmentObj);
			res.status(200).send({
				success: true,
				data: {
					statusCode: 200,
					data: department,
					message: 'New Department Created Successfully',
				},
			});
		} catch (error) {
			res.status(500).send({
				success: false,
				error: {
					statusCode: 500,
					message: 'Error while creating new Department',
				},
			});
		}
	}

	/**
	 * List Departments
	 * @param {Request} req => Express Request
	 * @param {Response} res => Express Response
	 */
	async getDepartments(req, res) {
		try {
			const departments = await findDepartments();
			res.status(200).send({
				success: true,
				data: {
					statusCode: 200,
					data: departments,
					message: 'Success',
				},
			});
		} catch (error) {
			res.status(500).send({
				success: false,
				error: {
					statusCode: 500,
					message: 'Error while Loading Departments',
				},
			});
		}
	}

	/**
	 * Updates Department By DepartmentId
	 * @param {Request} req => Express Request
	 * @param {Response} res => Express Response
	 */
	async updateDepartment(req, res) {
		try {
			const id = req.params.id;
			const department = await findDepartmentById(id);
			if (!department) {
				res.status(404).send({
					success: false,
					error: { statusCode: 404, message: 'Department not found' },
				});
			}
			for (const field in req.body) {
				department[field] = req.body[field];
			}
			await department.save();
			res.status(200).send({
				success: true,
				data: {
					statusCode: 200,
					data: department,
					message: 'Department Updated Successfully',
				},
			});
		} catch (error) {
			res.status(500).send({ error: error });
		}
	}

	/**
	 * Delete Department By DepartmentId
	 * @param {Request} req => Express Request
	 * @param {Response} res => Express Response
	 */
	async deleteDepartment(req, res) {
		try {
			const id = req.params.id;
			const department = await findDepartmentById(id);
			if (!department) {
				res.status(404).send({
					success: false,
					error: { statusCode: 404, message: 'Department not found' },
				});
			}
			await department.deleteOne();
			res.status(200).send({
				success: true,
				data: {
					statusCode: 200,
					data: department,
					message: 'Department Deleted Successfully',
				},
			});
		} catch (error) {
			res.status(500).send({
				success: false,
				error: {
					statusCode: 500,
					message: 'Error while deleting Users',
				},
			});
		}
	}
}
export default departmentController;
