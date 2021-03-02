let socket = io.connect();

// socket.on("messages", (data) => {
// 	console.log(data);
// });

function render(data) {
	var html = data
		.map(function (elem, index) {
			return `<div><strong style="color:blue">${
				elem.author
			}</strong> <span style="color:brown">${today.toLocaleDateString("en-US", options)}</span>: 
		<em style="color:green">${elem.text}</em></div>`;
		})
		.join(" ");
	document.getElementById("messages").innerHTML = html;
}
socket.on("messages", function (data) {
	render(data);
});

function addMessage(e) {
	var mensaje = {
		author: document.getElementById("username").value,
		text: document.getElementById("texto").value,
	};
	socket.emit("new-message", mensaje);
	return false;
}

var today = new Date();

var options = {
	year: "numeric",
	month: "numeric",
	day: "numeric",
	hour: "2-digit",
	minute: "2-digit",
	second: "2-digit",
};

//obs -- para hora HH:MM:SS usar toLocaleTimeString()

// class Clock extends React.Component {
//   // Add your methods in here.
//   constructor(props){
//     super(props);
//     this.state={date: new Date()}
//   }
//   render(){
//     return (<div>{this.state.date.toLocaleTimeString()}</div>)
//   }
// }
