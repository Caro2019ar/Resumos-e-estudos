//--Teste inicial
1-TS Config de sempre -OK 
2- Instalado Sockets:
    "@types/socket.io": "^2.1.13",
	"@types/socket.io-client": "^1.4.35",		
    "socket.io": "^3.1.1" 
3- A página de Ingresso e de vista de produtos estão funcionando com os handlebars, TS.
4- Não está gerando a mensagem do socket e no html aparece um erro: "Uncaught SyntaxError: Unexpected token '('" do arquivo index.hbs referente isso "var socket = io.("http://localhost:8080");"
5- Ou seja, o Socket parece não estar atuando.


//Colocando scr no index.hbs pro JS não funciona
{{!-- <script src="/index.d.ts"></script> --}}

//---Para o SocketConTS funcionou assim (no html):
    var socket = io.("http://localhost:8080");


//---- Colocando o script do var socket = io...  Não funciona nem no index.hbs, nem no ingrese.hbs
<script src="/socket.io/socket.io.js"></script>
	<script type="text/javascript">
        const socket = io('ws://localhost:3000')
        socket.on("mi mensaje", (data: any) => {
            alert(data);
            socket.emit(
                "notificacion",
                "mensaje recibido, despues de dar OK en el alert"
            );
        });
    </script>

//------------Arquivo do index.ts:
// function render(data: any) {
// 	var html: any = data
// 		.map(function (elem, index) {
// 			return `<div><strong>${elem.author}</strong>:
// 		<em>${elem.text}</em></div>`;
// 		})
// 		.join(" ");
// 	document.getElementById("messages").innerHTML = html;
// }
// socket.on("messages", function (data: any) {
// 	render(data);
// });

// function addMessage(e: any) {
// 	var mensaje: any = {
// 		author: document.getElementById("username").value,
// 		text: document.getElementById("texto").value,
// 	};
// 	socket.emit("new-message", mensaje);
// 	return false;
// }


//-------Para Clase13-CHAT ******************************

// ---------- Para teste no server.ts:
let messages: any = [
	{ author: "Juan", text: "¡Hola! ¿Que tal?" },
	{ author: "Pedro", text: "¡Muy bien! ¿Y vos?" },
	{ author: "Ana", text: "¡Genial!" },
];

io.on("connection", (socket: any) => {
	console.log("Nuevo cliente conectado");
	socket.emit("messages", messages);
	socket.on("new-message", function (data: any) {
		messages.push(data);
		io.sockets.emit("messages", messages);
	});
});

// -------No Ingrese.hbs:
<div id="messages"></div>

	<form onsubmit="return addMessage(this)">
		<input type="text" id="username" placeholder="Tu Numbre">
		<input type="text" id="texto" placeholder="Cuentanos algo...">
		<input type="submit" value="Enviar">
	</form>