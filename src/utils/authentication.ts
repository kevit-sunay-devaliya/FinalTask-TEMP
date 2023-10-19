import * as jwt from 'jsonwebtoken';
import { findFacultyById } from '../Components/Faculty/faculty.DAL';
import { findStudentyById } from '../Components/Student/student.DAL';
import Config from '../config';

export default async (req, res, next) => {
	try {
		const token = req.header('Authorization').replace('Bearer ', '');
		const privateKey: string = Config.server.private;
		// const privateKey = fs.readFileSync(
		// 	join(__dirname, '../../../keys/Private.key'),
		// );
		//get id of user by token
		const { id } = jwt.verify(token, privateKey);
		//get user by id
		const loginUser =
			(await findFacultyById(id)) === null
				? await findStudentyById(id)
				: await findFacultyById(id);

		if (!loginUser) {
			res.status(400).send({
				success: false,
				error: { statusCode: 400, message: 'User not Found' },
			});
		}

		//checking for valid token
		if (token === loginUser.authToken) {
			req.loginUser = loginUser;
			next();
		} else {
			res.status(401).send({
				success: false,
				error: { statusCode: 401, message: 'Unauthorized User' },
			});
		}
	} catch (error) {
		res.status(401).send({
			success: false,
			error: { statusCode: 401, message: 'Unauthorized User' },
		});
	}
};
