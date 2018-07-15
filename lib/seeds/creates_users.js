const User = require('../models/user')

const hercules = new User({
	name: 'Hercules Q. Rockefeller',
	email: 'LoveMangos@HateMangos.com'
});

module.exports = async () => {
	try {
		await User.remove({});
		const doc = await hercules.save();
		console.log(doc);
	} catch (error) {
		console.log(error);
	}
}