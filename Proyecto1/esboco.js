		*******************arquivo HTML
		Nao consigo colocar o CSS externo, criei pasta, verifiquei caminhos, mesmo código embedded no HTML não roda no CSS externo
		
		*******************Server em # app.ts
		// Com TS, PORT env, EJS?
		import express, { Application, Request, Response } from "express";
		const app: Application = express();
		const port = process.env.PORT || 8080;
		const bodyParser = require("body-parser");

		app.use(express.json());
		app.use(bodyParser.urlencoded({ extended: true }));

		// const productos = require("./productos");
		// app.use("/api/productos", productos);
		// ruta base tem que ser "/" para depois bifucar em 2 rutas> productos e carrito
		app.listen(port, () => {
			console.log(`Conexión al puerto ${port}`);
		});

		*********************productos.ts
		import express, { Application, Request, Response } from "express";
		let router = express.Router();
		let modu = require("./modulo");
		let Maneja = modu.ManejaProd;
		let produ = new Maneja();
		router.use(express.json());
		router.use(express.urlencoded({ extended: true }));

		// Permite listar todos produtos ou produto por id (para users e ADMs)
		router.get("/listar", (req: Request, res: Response) => {
			res.sendFile(__dirname + "/lista.html", {
				lista: produ.vista(),
			});
		});
		router.get("/listar/:id?", (req: Request, res: Response) => {
			res.send(produ.devProd(req.params.id));
		});

		// para adicionar produtos à lista (ADMs)
		router.post("/agregar", (req: Request, res: Response) => {
			const guardado = produ.guardar({
				title: req.body.title,
				price: req.body.price,
				thumbnail: req.body.thumbnail,
			});
			res.sendFile(__dirname + "/index.html");
		});

		// Atualiza o produto (ADMs)
		router.put("/actualizar/:id", (req: Request, res: Response) => {
			const actualizado = produ.actualizar(req.params.id, {
				title: req.body.title,
				price: req.body.price,
				thumbnail: req.body.thumbnail,
			});
			res.send(actualizado);
		});

		//Apaga o prod (ADMs)
		router.delete("/borrar/:id", (req: Request, res: Response) => {
			res.send(produ.borrar(req.params.id));
		});

		module.exports = router;

		************************ Não sei onde... ********************************
		
		//O produto terá os campos: id, timestamp (pode ser por Date.now()), nombre, descripcion, código, foto(url), precio, stock
		interface Producto {
			id: number;
			timestamp: number;
			nombre: string;
			descripcion: string;
			codigo: string;
			precio: number;
			foto: string;
			stock: number;
		}



**********Consigna: 
Deberás entregar el estado de avance de tu aplicación eCommerce Backend, que implemente un servidor de aplicación basado en la plataforma Node.js y el middleware express. El servidor implementará dos conjuntos de rutas agrupadas en routers, uno con la url base '/productos' y el otro con '/carrito'. El puerto de escucha será el 8080 para desarrollo y process.env.PORT para producción en glitch.com

>>>>Aspectos a incluir en el entregable: 
1. El router base '/productos' implementará cuatro rutas:
'/listar/:id?' : Me permite listar todos los productos disponibles ó un producto por su id (disponible para usuarios y administradores)
'/agregar' : Para incorporar productos al listado (disponible para administradores)
'/actualizar/:id' : Actualiza un producto por su id (disponible para administradores)
'/borrar/:id' : Borra un producto por su id (disponible para administradores)

2. El router base '/carrito' implementará tres rutas:
'/listar/:id?' : Me permite listar todos los productos guardados en el carrito ó un producto por su id de carrito (disponible para usuarios y administradores)
'/agregar/:id_producto' : Para incorporar productos al carrito por su id de producto (disponible para usuarios y administradores)
'/borrar/:id' : Eliminar un producto del carrito por su id de carrito (disponible para usuarios y administradores)
3. Crear una variable booleana administrador, cuyo valor configuraremos más adelante con el sistema de login. Según su valor (true ó false) me permitirá alcanzar o no las rutas indicadas. En el caso de recibir un request a una ruta no permitida por el perfil, devolver un objeto de error. Ejemplo: { error : -1, descripcion: ruta 'x' método 'y' no autorizada}
4. Un producto dispondrá de los siguientes campos:  id, timestamp, nombre, descripcion, código, foto (url), precio, stock.

5. El carrito de compras tendrá la siguiente estructura: 
id, timestamp(carrito), producto: { id, timestamp(producto), nombre, descripcion, código, foto (url), precio, stock }
6. El timestamp puede implementarse con Date.now()
7. Comenzar a trabajar con el listado de productos y el carrito de compras en memoria del servidor, luego persistirlos en el filesystem.

>>>>A tener en cuenta:
1. Para realizar la prueba de funcionalidad hay dos opciones:
a. Probar con postman cada uno de los endpoints (productos y carrito) y su operación en conjunto.
b. Realizar una aplicación frontend sencilla, utilizando HTML/CSS/JS ó algún framework de preferencia, que represente el listado de productos en forma de cards. En cada card figuran los datos del producto, que, en el caso de ser administradores, podremos editar su información. Para este último caso incorporar los botones actualizar y eliminar. También tendremos un formulario de ingreso de productos nuevos con los campos correspondientes y un botón enviar. Asimismo, construir la vista del carrito donde se podrán ver los productos agregados e incorporar productos a comprar por su id de producto.

2. Esta aplicación de frontend debe enviar los requests get, post, put y delete al servidor utilizando fetch y debe estar ofrecida en su espacio público. En el caso de requerir una ruta no implementada en el servidor, este debe contestar un objeto de error: ej { error : -2, descripcion: ruta 'x' método 'y' no implementada}
3. En todos los casos, el diálogo entre el frontend y el backend debe ser en formato JSON. El servidor no debe generar ninguna vista.
4. La estructura de programación será ECMAScript, separada tres en módulos básicos (router, lógica de negocio/api y persistencia ). Más adelante implementaremos el desarrollo en capas. Utilizar preferentemente clases, constructores de variables let y const y arrow function.
5. Realizar la prueba de funcionalidad completa en el ámbito local (puerto 8080) y en glitch.com


URLS imagens: 

Muffin:
https://images.pexels.com/photos/913135/pexels-photo-913135.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260

Sorvete:
https://images.pexels.com/photos/380954/pexels-photo-380954.jpeg?cs=srgb&dl=pexels-mike-380954.jpg&fm=jpg

Essencia:
https://images.pexels.com/photos/4041392/pexels-photo-4041392.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260

Calça
https://images.pexels.com/photos/4210866/pexels-photo-4210866.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500

https://images.pexels.com/photos/4210853/pexels-photo-4210853.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940

Calça foto retrato
https://images.pexels.com/photos/934070/pexels-photo-934070.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500

https://images.pexels.com/photos/934063/pexels-photo-934063.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500