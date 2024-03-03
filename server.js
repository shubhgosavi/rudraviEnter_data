/*require('./models/db');

const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const bodyparser = require('body-parser');
var router = express.Router();

const employeeController = require('./controllers/employeeController');

var app = express();
app.use(bodyparser.urlencoded({
    extended: true
}));
app.use(bodyparser.json());
app.set('views', path.join(__dirname, '/views/'));
app.engine('hbs', exphbs({ extname: 'hbs', defaultLayout: 'mainLayout', layoutsDir: __dirname + '/views/layouts/' }));
app.set('view engine', 'hbs');

app.listen(3000, () => {
    console.log('Express server started at port : 3000');
});
app.use('/employee', employeeController);


app.use('/data', employeeController.getAllItems);
//router.post('/', itemController.createItem);
//router.put('/:id', itemController.updateItem);
//router.delete('/:id', itemController.deleteItem);


*/


const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser'); 
const employeeController = require('./controllers/employeeController'); 

const app = express();
const PORT = process.env.PORT || 3000; 
app.use(bodyParser.urlencoded({extended : true}));

app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/EmployeeDb',{useNewUrlParser : true, useUnifiedTopology : true})
const db = mongoose.connection
db.on('error',(err)=>{
  console.log(err);
})

db.once('open',()=>{
  console.log('connected!!!!!');
})

// Routes
const itemRoutes = require('./routes/itemRoutes');
app.use('/items', itemRoutes); 

app.get('/data', employeeController.getAllItems);
app.post('/add', employeeController.createItem);



app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
