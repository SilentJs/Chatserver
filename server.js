const mongoose = require('mongoose');
const Msg = require('./models/messages');
const io = require('socket.io')(3000,{
    cors: {
      origin: "103.252.27.178",
      methods: ["GET", "POST"]
    }
  });
const mongoDB = 'mongodb+srv://kvdrdo-chat:FXf6zVwZNpAG9nab@cluster0.lqt4d.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
    console.log('connected')
}).catch(err => console.log(err))


io.on('connection', (socket) => {
    Msg.find().then(result => {
        socket.emit('output-messages', result)
    })


    console.log('a user connected');
    systemMsg = ["System","Welcome to the chat"]
    socket.emit('message', systemMsg);
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });


    socket.on('chatmessage', data=> {
        io.emit('log',data)
        const message = new Msg({
            username:data[0],
            msg:data[1]
        });
        message.save().then(() => {
            io.emit('message', data)
        })


    })
});