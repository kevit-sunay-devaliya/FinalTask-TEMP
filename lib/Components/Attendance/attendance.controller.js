"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const attendance_DAL_1 = require("./attendance.DAL");
class studentController {
    async fillAttendance(req, res) {
        try {
            const response = (0, attendance_DAL_1.fillAttendance)(req.body);
            res.status(200).send({ 'success': true, 'data': { 'statusCode': 200, 'message': 'Attendance Filled Successfully' } });
        }
        catch (error) {
            res.status(500).send({ 'success': false, 'error': { 'statusCode': 500, 'message': error } });
        }
    }
}
exports.default = studentController;
//# sourceMappingURL=attendance.controller.js.map