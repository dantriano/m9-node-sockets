require("dotenv").config();
const port = process.env.SERVER_PORT || 6000;
var express = require("express"),
  app = express(),
  server = require("http").createServer(app),
  path = require("path"),
   io = require("socket.io")(server);

server.listen(port, (err, res) => {
  if (err) console.log(`ERROR: Connecting APP ${err}`);
  else console.log(`Server is running on port ${port}`);
});

// Import routes of our app

var socketsRouter = require("./app/routes/sockets");
var handlerError = require("./app/routes/handler");

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

io.on("connection",(socket)=>{
  console.log("Socket conectado");
  //Este socket tendrá un atributo user con valor Pedro,
  //desde la primera conexión hasta que se cierre el socket 
  if(!socket.user) socket.user="Pedro";
  socket.on("default",(data)=>{
    console.log(data);
    socket.broadcast.emit("toClient",data)
  })
})

// Define routes using URL path
app.use("/", socketsRouter);
app.use(handlerError);

/*Socket functions */

module.exports = app;
