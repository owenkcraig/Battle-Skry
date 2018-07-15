const { Monster } = require('../models/monsters');

const jeffrey = new Monster({
	monsterName: `Jeffrey`,
	monsterHp: 50,
	monsterMaxHp: 50 
});

module.exports = jeffrey;