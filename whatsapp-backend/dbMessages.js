import moongoose from 'mongoose';

const whatsappSchema = moongoose.Schema({
    message:String,
    name:String,
    timestamp:String,
    received:Boolean,

});

export default moongoose.model('messagecontents',whatsappSchema)