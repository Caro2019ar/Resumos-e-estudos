import express, { Application, Request, Response } from "express";
const path = require("path");
const router = express.Router();
let modu = require("../modulo");
let Maneja = modu.ManejaProd;
let produ = new Maneja();
router.use(express.json());
router.use(express.urlencoded({ extended: true }));

const pathRoot = path.normalize(__dirname + "/..");

// //************/ Sugestão do Profe (fazer GET/POST/PATCH/DELETE tudo no endpoint /productos):
router.get("/", (req: Request, res: Response) => {
	res.sendFile(pathRoot + "/form.html");
});
// router.get("/:id?", (req: Request, res: Response) => {
// 	res.send(produ.devProd(req.params.id));
// });

// Deixei a lista separada no endpoint /productos/listar até melhorar código e juntar FORM.html + LISTA.pug:
router.get("/listar", (req: Request, res: Response) => {
	res.render("lista", {
		lista: produ.vista(),
	});
});
router.get("/listar/:id", (req: Request, res: Response) => {
	res.render("lista", {
		lista: produ.devProd(req.params.id),
	});
});

// Para adicionar produtos à lista (ADMs)
router.post("/", (req: Request, res: Response) => {
	const guardado = produ.guardar({
		nombre: req.body.nombre,
		precio: req.body.precio,
		foto: req.body.foto,
		descripcion: req.body.descripcion,
		codigo: req.body.codigo,
		stock: req.body.stock,
	});
	res.sendFile(pathRoot + "/form.html");
});

// Atualiza o produto (ADMs)
router.put("/:id", (req: Request, res: Response) => {
	const actualizado = produ.actualizar(req.params.id, {
		nombre: req.body.nombre,
		precio: req.body.precio,
		foto: req.body.foto,
		descripcion: req.body.descripcion,
		codigo: req.body.codigo,
		stock: req.body.stock,
	});
	res.send(actualizado);
});

//Apaga o prod (ADMs)
router.delete("/:id", (req: Request, res: Response) => {
	res.send(produ.borrar(req.params.id));
});

module.exports = router;
