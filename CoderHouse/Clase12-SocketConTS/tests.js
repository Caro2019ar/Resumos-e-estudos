const socket = io("http://localhost:3000");
function sendMsg() {
	socket.emit("message", "HELLO WORLD");
}
socket.on("message", function (data) {
	console.log(data);
});
