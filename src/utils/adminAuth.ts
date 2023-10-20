export default async (req, res, next) => {
	try {
		if (req.loginUser.role == 'Admin') {
			next();
		} else {
			return res
				.status(401)
				.send('Sorry! Only Admin Have This Rights...');
		}
	} catch (e) {
		res.status(401).send({
			error: 'Sorry! Only Admin Have This Rights...',
		});
	}
};
