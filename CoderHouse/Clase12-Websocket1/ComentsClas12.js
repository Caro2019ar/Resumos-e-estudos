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
