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
export async function findStudentById(id) {
	try {
		return await Student.findById(new mongoose.Types.ObjectId(id));
	} catch (error) {}
}
/**
 *
 * @returns delete All students
 */
export async function deleteAll() {
	try {
		return await Student.deleteMany({});
	} catch (error) {}
}

/**
 * Find BatchYear, Department and Semester Wise Student Count
 * @returns Student Count
 */
export async function getBatchDepartmentWiseData() {
	try {
		const pipeline = [
			{
				$lookup: {
					from: 'departments',
					localField: 'departmentId',
					foreignField: '_id',
					as: 'result',
				},
			},
			{
				$unwind: {
					path: '$result',
				},
			},
			{
				$group: {
					_id: {
						batchYear: '$batchYear',
						department: '$result.initial',
					},
					count: {
						$sum: 1,
					},
				},
			},
			{
				$addFields: {
					TotalYearCount: '$count',
				},
			},
			{
				$group: {
					_id: '$_id.batchYear',
					branches: {
						$push: {
							dep: '$_id.department',
							totalStudent: '$count',
						},
					},
				},
			},
			{
				$addFields: {
					TotalStudents: {
						$reduce: {
							input: '$branches',
							initialValue: 0,
							in: {
								$add: ['$$value', '$$this.totalStudent'],
							},
						},
					},
				},
			},
			{
				$addFields: {
					year: '$_id',
				},
			},
			{
				$project: {
					data: {
						$map: {
							input: '$branches',
							as: 'branch',
							in: {
								k: '$$branch.dep',
								v: '$$branch.totalStudent',
							},
						},
					},
					_id: 0,
					year: 1,
					TotalStudents: 1,
				},
			},
			{
				$project: {
					branches: {
						$arrayToObject: '$data',
					},
					year: 1,
					TotalStudents: 1,
				},
			},
		];
		const data = await Student.aggregate(pipeline)
			.allowDiskUse(true)
			.exec();

		return data;
	} catch (error) {
		throw new Error(error);
	}
}


/**
 * Find Absent Students
 * @param requestBody => year,branch,semester,date within a Object
 * @returns => Absent Students
 */
export async function getAbsentStudentBatchYearSemesterDateWise(requestBody: { [key: string]: any }) {
	try {
	  const pipeline: any = [
		{
		  $lookup: {
			from: 'departments',
			localField: 'departmentId',
			foreignField: '_id',
			as: 'result',
		  },
		},
		{
		  $unwind: {
			path: '$result',
		  },
		},
		{
		  $project: {
			name: 1,
			address: 1,
			batchYear: 1,
			semester: 1,
			onRoll: 1,
			emailId: 1,
			Department: '$result.name',
			DepartmentInitial: '$result.initial',
			attendance: 1,
		  },
		},
		{
		  $project: {
			AbsentDays: {
			  $filter: {
				input: '$attendance',
				as: 'attgrt',
				cond: {
				  $and: [
					{
					  $eq: ['$$attgrt.present', false],
					},
					{
					  $eq: ['$$attgrt.date', requestBody.date],
					},
				  ],
				},
			  },
			},
			name: 1,
			address: 1,
			batchYear: 1,
			semester: 1,
			onRoll: 1,
			emailId: 1,
			Department: '$result.name',
			DepartmentInitial: '$result.initial',
		  },
		},
		{
		  $match: {
			$expr: {
			  $gt: [
				{
				  $size: '$AbsentDays',
				},
				0,
			  ],
			},
		  },
		},
	  ];
	  if (requestBody.batch) {
		const object = {
		  $match: {
			batchYear: requestBody.batch,
		  },
		};
		pipeline.unshift(object);
	  }
	  if (requestBody.branch) {
		const object = {
		  $match: {
			'result.initial': requestBody.branch,
		  },
		};
		pipeline.splice(2, 0, object);
	  }
	  if (requestBody.semester) {
		const object = {
		  $match: {
			semester: requestBody.semester,
		  },
		};
		pipeline.unshift(object);
	  }
	  const data = await Student.aggregate(pipeline).exec();
	  return data;
	} catch (error) {
	  throw new Error(error);
	}
  }