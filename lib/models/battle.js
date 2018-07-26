const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { monsterSchema } = require('./monsters.js')

const battleSchema = new Schema({
	battleName: { type: String, required: true },
	battleNotes: { type: String, required: false },
	monsters: [monsterSchema],
	userId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
		required: true
	}
});

module.exports = mongoose.model('Battle', battleSchema);