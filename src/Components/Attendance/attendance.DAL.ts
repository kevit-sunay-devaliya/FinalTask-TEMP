import { findStudentById } from '../Student/student.DAL';

/**
 *
 * @param attendanceBody => List Of Students with attendance date and status
 */
export async function fillAttendance(attendanceBody) {
	try {
		attendanceBody.map(async (attendance) => {
			if ((attendance.studentId && attendance.date && attendance.present)) {
				const student = await findStudentById(attendance.studentId);
				if (
					!student.attendance.some(
						(item) => item.date === attendance.date,
					)
				) {
					student.attendance.push({
						date: attendance.date,
						present: attendance.present,
					});
					
					await student.save();
				}
                else{
                    throw new Error();
                }
			}
		});
		return true;
	} catch (error) {
		throw new Error(error);
	}
}
