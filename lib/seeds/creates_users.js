const User = require('../models/user');
const helmsdeep = require('./creates_battles');

const hercules = new User({
	name: 'Hercules Q. Rockefeller',
	email: 'LoveMangos@HateMangos.com'
});

hercules.battle.push(helmsdeep);

module.exports = async () => {
	try {
		await User.remove({});
		const doc = await hercules.save();
		console.log(doc);
	} catch (error) {
		console.log(error);
	}
}