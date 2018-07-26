const express = require("express");
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const config = require('config');
const app = express();
const API_PORT = process.env.PORT || config.PORT;
const path = require('path');

const User = require('./models/user.js');
const Battle = require('./models/battle.js')
const { Monster } = require('./models/monsters.js')
const MONGOOSE_URI = process.env.MONGODB_URI || config.MONGODB_URI;


app.use(bodyParser.json());

app.use('/', express.static('public'));

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
		monsters: req.body.monsters,
		userId: req.body.userId
	});

	try {
		const docs = await newBattle.save();
		res.status(200).send({ message: 'Success', payload: docs });
	} catch (error) {
		console.log(error);
	}
});

app.get('/battlesGet/user/:_userid', (req, res) => {
	Battle.find({ userId: req.params._userid })
		.then(docs => {
			res.status(200).send({ message: 'Success', payload: docs });
		})
		.catch(err => {
			res.status(500).send({ message: err.message });
		});
});

app.get('/battlesGet/battle/:_id', (req, res) => {
	const thisBattleId = req.params._id;
	Battle.findById(thisBattleId)
		.then(docs => {
			res.status(200).send({ message: 'Success', payload: docs });
		})
		.catch(err => {
			res.status(500).send({ message: err.message });
		});
});

app.patch('/battlesPatch/battle/:_id', async (req, res) => {
	const updatedBattle = await Battle.findByIdAndUpdate(req.params._id, req.body);
	res.status(200).send(updatedBattle)
});

app.delete('/battlesPatch/battle/:_id', async (req, res) => {
	const deletedBattle = await Battle.findByIdAndRemove(req.params._id);
	res.status(200).send(deletedBattle)
});

mongoose
  .connect(MONGOOSE_URI)
  .then(() => {
    console.log(`Successfully connected to: ${MONGOOSE_URI}`)
  })
  .catch(err => console.log(err.message));

app.listen(API_PORT, () => {
	console.log("I'm listening.")
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../build/index.html'))
})


