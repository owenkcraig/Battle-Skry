const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const monsterSchema = new Schema({
	monsterName: { type: String, required: true },
	monsterHp: { type: Number, required: true },
	monsterMaxHp: { type: Number, required: true}
});

module.exports = {
	monsterSchema,
	Monster: mongoose.model('Monster', monsterSchema)
}
