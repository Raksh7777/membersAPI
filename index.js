const express=require('express');
const path= require('path');
const exphbs=require('express-handlebars')
const members=require('./member')


const logger=require('./middleware/loggerf')

const app=express();
//creating a middleware function
//HANDLEBARS MIDDLEWARE
app.engine('handlebars', exphbs({defaultLayout:'main'}));
app.set('view engine', 'handlebars');

//app.get('/',(req,res)=>{
//res.send('<h1> Hello from express! </h1>');
//res.sendFile(path.join(__dirname,'public','index.html'));
//});
//set static folder
app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.get('/',(req,res)=> 
    res.render('index',{
    title:'Member app by Raksh',
    members
})
);

app.use(express.static(path.join(__dirname,'public')));
//app.use(logger);
app.use('/api/members',require('./routes/api/members'))
//body parser middleware


const PORT=process.env.PORT || 5000;
app.listen(PORT,()=> console.log(`Server started on port ${PORT} `));