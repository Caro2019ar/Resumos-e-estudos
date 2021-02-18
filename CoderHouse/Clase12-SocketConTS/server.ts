import { Application, Request, Response } from "express";
const express = require("express");
const app: Application = express();
// const path =require('path')
const http = require("http").Server(app);
const io = require("socket.io")(http);
const port = 3000;

app.use(express.static("./public"));

app.get("/", (req: Request, res: Response) => {
	res.sendFile("index.html", { root: __dirname });
});

http.listen(port, () => {
	console.log(`Conexión al puerto ${port}`);
});

// io.on("connection", (socket) => {
// 	console.log("Usuario conectado");
// 	socket.emit("message", "Este es mi mensaje desde el servidor");
// 	socket.on("message", (data) => {
// 		console.log(data);
// 	});
// });

var message2 = "epa";
io.on("connection", function (socket: any) {
	console.log("a user connected");
	socket.on("message", function (message: any) {
		console.log(message);
		socket.emit("message", message2);
	});
});
