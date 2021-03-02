const express = require("express");
const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server);

const port = 8080;

app.use(express.static("public"));

app.get("/", (req, res) => {
	res.sendFile("index.html", { root: __dirname });
});

let messages = [
	{ author: "Juan", text: "¡Hola! ¿Que tal?" },
	{ author: "Pedro", text: "¡Muy bien! ¿Y vos?" },
	{ author: "Ana", text: "¡Genial!" },
];

server.listen(port, () => {
	console.log(`Conexión al puerto ${port}`);
});

io.on("connection", (socket) => {
	console.log("Nuevo cliente conectado");
	socket.emit("messages", messages);
	socket.on("new-message", function (data) {
		messages.push(data);
		io.sockets.emit("messages", messages);
	});
});
