import express, { Application, Request, Response } from "express";
const path = require("path");
const http = require("http");
const socketio = require("socket.io");
const app: Application = express();
const server = http.createServer(app);
const io = socketio(server);
const bodyParser = require("body-parser");
const port = 8080;
const productos = require("./rutas/productos");
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/api/productos", productos);

const handlebars = require("express-handlebars");

app.engine(
	"hbs",
	handlebars({
		extname: ".hbs",
		defaultLayout: "index.hbs",
		layoutsDir: __dirname + "/views/layouts/",
		partialsDir: __dirname + "/views/partials/",
	})
);

app.set("views", "./views");
app.set("view engine", "hbs");
//app.use(express.static(path.join(__dirname, "views")));

// app.get("/", (req: Request, res: Response) => {
// 	res.sendFile("views/layouts/index.hbs", { root: __dirname });
// });

// res.sendFile("views/ingrese.hbs", { root: __dirname });

// let messages: any = [
// 	{ author: "Juan", text: "¡Hola! ¿Que tal?" },
// 	{ author: "Pedro", text: "¡Muy bien! ¿Y vos?" },
// 	{ author: "Ana", text: "¡Genial!" },
// ];

// io.on("connection", (socket: any) => {
// 	console.log("Nuevo cliente conectado");
// 	socket.emit("messages", messages);
// 	socket.on("new-message", function (data: any) {
// 		messages.push(data);
// 		io.sockets.emit("messages", messages);
// 	});
// });

io.on("connection", (socket: any) => {
	console.log("Usuario conectado");
	socket.emit("mi mensaje", "Este es mi mensaje desde el servidor");
	socket.on("notificacion", (data: any) => {
		console.log(data);
	});
});

server.listen(port, () => {
	console.log(`Conexión al puerto ${port}`);
});
