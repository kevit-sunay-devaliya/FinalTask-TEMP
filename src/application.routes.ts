import { Application } from 'express';
import attendanceRoutes from './Components/Attendance/attendance.routes';
import departmentRoutes from './Components/Department/department.routes';
import facultyRoutes from './Components/Faculty/faculty.routes';
import studentRoutes from './Components/Student/student.routes';

import IndexRoute from './index';

export default class ApplicationConfig {
	public static registerRoute(app: Application) {
		app.use('/', IndexRoute);
		app.use('/department', departmentRoutes);
		app.use('/faculty', facultyRoutes);
		app.use('/student', studentRoutes);
		app.use('/attendance',attendanceRoutes);
	}
}
