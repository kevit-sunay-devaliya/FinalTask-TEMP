export default async (req, res, next) => {
	try {
		if (req.loginUser.role == 'Faculty' || req.loginUser.role == 'Admin') {
			next();
		} else {
			return res
				.status(401)
				.send('Sorry! Only Faculty Have This Rights...');
		}
	} catch (e) {
		res.status(401).send({
			error: 'Sorry! Only Faculty Have This Rights...',
		});
	}
};
