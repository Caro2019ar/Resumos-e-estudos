import express, { Application, Request, Response } from "express";
const path = require("path");
const app: Application = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);
const bodyParser = require("body-parser");
const port = 8080;
//const productos = require("./rutas/productos");

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use("/api/productos", productos);

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

app.get("/", (req: Request, res: Response) => {
	res.render("ingrese");
});
let messages: any = [
	{ email: "Juan@gmail.com", text: "¡Hola! ¿Que tal?" },
	{ email: "Pedro@yahoo.com", text: "¡Muy bien! ¿Y vos?" },
	{ email: "Ana@hotmail.com", text: "¡Genial!" },
];

let produtos: any = [];

io.on("connection", (socket: any) => {
	console.log("Nuevo cliente conectado");
	socket.emit("messages", messages);
	socket.on("new-message", function (data: any) {
		messages.push(data);
		io.sockets.emit("messages", messages);
	});
	socket.emit("produtos", produtos);
	socket.on("new-produto", function (produto: any) {
		produtos.push(produto);
		io.sockets.emit("produtos", produtos);
	});
});

//--- OK:
// io.on("connection", (socket: any) => {
// 	console.log("Usuario conectado");
// 	socket.emit("mi mensaje", "Este es mi mensaje desde el servidor");
// 	socket.on("notificacion", (data: any) => {
// 		console.log("notificacion", data);
// 	});
// });

http.listen(port, () => {
	console.log(`Conexión al puerto ${port}`);
});
