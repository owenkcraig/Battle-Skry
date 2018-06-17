const express = require("express");
const app = express();
const PORT = 8080;
const defaultUser = {
	name: "Hercules Q. Rockefeller",
	email: "LoveMangos@HateMangos.com"
}

app.get("/healthcheck", (req, res) => {
	res.status(200).json({
		message: "Health check"
	});
});

app.post("/login", (req, res) => {
	res.status(200).json({
		userName: defaultUser.name,
		userEmail: defaultUser.email
	});
});

app.listen(PORT, () => {
	console.log("I'm listening.")
});