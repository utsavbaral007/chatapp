const socket = io()
let name
const textarea = document.querySelector('#textarea')
const chatArea = document.querySelector('.chat-area')
do{
	name = prompt("Please enter your name: ")
} while(!name)

textarea.addEventListener('keyup', (e) =>{
	if(e.key === 'Enter'){
		sendMessage(e.target.value)
	}
})

const sendMessage = (message) => {
	let msg = {
		user: name,
		message: message.trim()
	}
	appendMessage(msg, 'outgoing')
	textarea.value = ''

	socket.emit('message', msg)
}

const appendMessage = (msg, type) =>{
	let mainDiv = document.createElement('div')
	let className = type
	mainDiv.classList.add(className, 'text')

	let markup = `
		<h5>${msg.user}</h5>
		<p>${msg.message}</p>
	`
	mainDiv.innerHTML = markup
	chatArea.appendChild(mainDiv)
}

socket.on('message', (msg)=>{
	appendMessage(msg, 'incoming')
})