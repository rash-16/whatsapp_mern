import express from 'express';
import mongoose from 'mongoose'
import Messages from './dbMessages.js';
import Pusher from 'pusher'
//app config
const app = express();
const port = process.env.PORT || 9000;

const pusher = new Pusher({
    appId: "1197585",
    key: "2781ace4d1d67d462a69",
    secret: "5bd207226c968c4d454f",
    cluster: "ap2",
    useTLS: true
  });

//middleware
app.use(express.json())
app.use((req,res,next)=>{
    res.setHeader("Access-Control-Allow-Origin","*");
    res.setHeader("Access-Control-Allow-Headers","*");
    next();

});

//db config
const connection_url =`mongodb+srv://admin:abUo0kqO7Bihh4sN@cluster0.hawwl.mongodb.net/whatsappDB?retryWrites=true&w=majority`
mongoose.connect(connection_url,{
    useCreateIndex:true,
    useNewUrlParser:true,
    useUnifiedTopology:true
})
const db = mongoose.connection
db.once('open',()=>{
    console.log("DB is connected");
    const msgCollection =db.collection('messagecontents')
    const changestream =msgCollection.watch()
    changestream.on("change",(change) =>{
        console.log("A change occured",change)
        if(change.operationType === 'insert'){
            const messageDetails = change.fullDocument;
            pusher.trigger('messages','inserted',{
                name:messageDetails.name,
                message:messageDetails.message,
                timestamp:messageDetails.timestamp,
                received:messageDetails.received
            });
        }else{
            console.log("Err triggering pusher")
        }
    })
})

//app routes
app.get('/',(req,res) => res.status(200).send('hello world'));
app.get('/messages/sync',(req,res) =>{
    Messages.find((err,data) => {
        if(err){
            res.status(500).send(err)
        }else{
            res.status(200).send(data)
        }
    })
})
app.post('/messages/new',(req,res) =>{
    const dbMessage = req.body
    Messages.create(dbMessage,(err,data) =>{
        console.log("data",data)
            if(err){
                res.status(500).send(err)
            }else{
                res.status(201).send(`new msg created:\n ${data}`)
            }
    })
})
//listen
app.listen(port,() =>console.log(`Listening on the localhost:${port}`));


//abUo0kqO7Bihh4sN -mongo admin psw
