const socket = io("http://localhost:8000");

const form = document.getElementById("send-container");
const messageInput = document.getElementById("messageInp");
const messageContainer = document.querySelector(".container");
const audio = new Audio("ting.mp3");

const name = prompt("Enter your name");

socket.emit("new-user-joined", name);

append = (message, position) => {
  const messageElement = document.createElement("div");
  messageElement.innerText = message;
  messageElement.classList.add("message"); //message is a string here whose value is given at line number 20 where as position is being changed dynamically left or right therefore it is not in quotes
  messageElement.classList.add(position); //position is a variable whose value may be left or right
  messageContainer.append(messageElement);
  if (position == "left") {
    //so that it only plays when msg is received and not when both received and sent
    audio.play();
  }
};
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const message = messageInput.value;
  append(`You: ${message}`, "right");
  socket.emit("send", message);
  messageInput.value = "";
});
socket.on("user-joined", (name) => {
  //user joined method gives name
  append(`${name} joined the chat`, "left");
});
socket.on("receive", (data) => {
  append(`${data.name}: ${data.message}`, "left");
});
socket.on("left", (name) => {
  append(`${name} has left the chat room!`, "left");
});
