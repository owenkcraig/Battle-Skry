const express = require("express");
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const app = express();
const PORT = 8080;

const User = require('./models/user.js');
const Battle = require('./models/battle.js')
const { Monster } = require('./models/monsters.js')

const uri = 'mongodb://localhost:27017/app-database';
// const userSeeds = require('./seeds/creates_users.js');
// const battleSeeds = require('./seeds/creates_battles.js');

// app.get("/healthcheck", (req, res) => {
// 	res.status(200).json({
// 		message: "Health check"
// 	});
// });

app.use(bodyParser.json());

app.get('/users', (req, res) => {
	User.find({})
		.then(docs => {
			res.status(200).send({ message: 'Success', payload: docs });
		})
		.catch(err => {
			res.status(500).send({ message: err.message });
		});
});

app.post('/battlesPost', async (req, res) => {
	const newBattle = new Battle({
		battleName: req.body.battleName,
		battleNotes: req.body.battleNotes,
		monsters: req.body.monsters
	});

	try {
		const docs = await newBattle.save();
		res.status(200).send({ message: 'Success', payload: docs });
	} catch (error) {
		console.log(error);
	}
});

app.get('/battlesGet', (req, res) => {
	Battle.find({})
		.then(docs => {
			res.status(200).send({ message: 'Success', payload: docs });
		})
		.catch(err => {
			res.status(500).send({ message: err.message });
		});
});

app.get('/battlesGet/:_id', (req, res) => {
	const thisBattleId = req.params._id;
	Battle.findById(thisBattleId)
		.then(docs => {
			res.status(200).send({ message: 'Success', payload: docs });
		})
		.catch(err => {
			res.status(500).send({ message: err.message });
		});
});

app.patch('/battlesPatch/:_id', async (req, res) => {
	const updatedBattle = await Battle.findByIdAndUpdate(req.params._id, req.body);
	res.status(200).send(updatedBattle)
});

app.patch('/monsterHp/:monster_id', async (req, res) => {
	const updatedMonster = await Monster.findByIdAndUpdate({ _id: req.params.monster_id }, {
		monsterHp: req.body.monsterHp
	})
	console.log(updatedMonster)
	res.status(200).send(updatedMonster);
})

app.delete('/battlesPatch/:_id', async (req, res) => {
	const deletedBattle = await Battle.findByIdAndRemove(req.params._id);
	res.status(200).send(deletedBattle)
});

mongoose
  .connect(uri)
  .then(() => {
    console.log(`Successfully connected to: ${uri}`)
  })
  .catch(err => console.log(err.message));

app.listen(PORT, () => {
	console.log("I'm listening.")
});




