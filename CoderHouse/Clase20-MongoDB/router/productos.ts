import express, { Application, Request, Response } from "express";
const path = require("path");
const router = express.Router();
let modu = require("../service/productos.service.ts");
let Maneja = modu.ManejaProd;
let produ = new Maneja();
router.use(express.json());
router.use(express.urlencoded({ extended: true }));

const pathRoot = path.join(__dirname + "/..");

router.get("/", (req: Request, res: Response) => {
	res.sendFile(pathRoot + "/form.html");
});

// Deixei a lista separada no endpoint /productos/listar até melhorar código e juntar FORM.html + LISTA.pug:

router.get("/listar", (req: Request, res: Response) => {
	const listado = produ.vista();
	res.send(listado);
});

// //Não dá pra mandar um res.JSON/send pro servidor com a lista E também renderizar a lista, não pode mandar mais de 1 resposta, isso não funciona:
// router.get(
// 	"/listar",
// 	(req: Request, res: Response, next) => {
// 		const listado = produ.vista();
// 		res.json(listado);
// 		next();
// 	},
// 	function (req, res) {
// 		res.render("lista", {
// 			lista: produ.vista(),
// 		});
// 	}
// );

router.get("/listar/:id", (req: Request, res: Response) => {
	const prodListado = produ.devProd(req.params.id);
	res.send(prodListado);
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
	res.send("Producto creado");
	// res.sendFile(pathRoot + "/form.html");
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
	res.send("Producto actualizado");
});

//Apaga o prod (ADMs)
router.delete("/:id", (req: Request, res: Response) => {
	const prodBorrado = produ.borrar(req.params.id);
	res.send("Producto borrado");
});

module.exports = router;
