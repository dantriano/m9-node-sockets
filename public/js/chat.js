$(document).ready(function () {
  //Inicializa socket con IO
  const socket = io();

  $("#send").submit(function (e) {
    e.preventDefault();
    var msg = $("#msg").val();
    $("#chatBox").append(`<p>${msg}<p>`);
    var toSend = { user: 1, text: msg };
    socket.emit("default", toSend);
  });

  socket.on("toClient", (data) => {
    console.log(data);
  });
});
