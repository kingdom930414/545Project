const express = require("express");
const bodyParser = require("body-parser");
const exphbs = require("express-handlebars")
const app = express();
var http = require('http').Server(app);
const io = require("socket.io")(http);

const static = express.static(__dirname + "/public");
const configRoutes = require("./routes");
app.use(express.json({ limit: '10mb' }));
app.use("/public", static);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.engine('handlebars', exphbs({
    defaultLayout: 'main',
    extname: 'handlebars'
}));
app.set('view engine', 'handlebars');

io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
});
io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    console.log('message: ' + msg);
  });
});

io.emit('some event', { for: 'everyone' });

io.on('connection', function(socket){
  socket.broadcast.emit('hi');
});

io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });
});


configRoutes(app);

app.listen(3001, () => {
  console.log("We've now got a server!");
  console.log("Your routes will be running on http://localhost:3001");
});
