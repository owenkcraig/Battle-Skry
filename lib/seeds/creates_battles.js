const Battle = require('../models/battle');
const jeffrey = require('./creates_monsters');

const helmsDeep = new Battle({
	battleName: `The Battle of Helm's Deep`,
	battleNotes: 'This was a very big battle and it was funny when that one orc ran up with a torch.',
	monsters: []
});

helmsDeep.monsters.push(jeffrey);

module.exports = async () => {
	try {
		await Battle.remove({});
		const doc = await helmsDeep.save();
		console.log(doc);
	} catch (error) {
		console.log(error);
	}
}

