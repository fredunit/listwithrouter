//require packages used in the project
const express = require('express')
const app = express()
const port = 3000
const exphbs = require('express-handlebars')


const methodOverride = require('method-override')
const routes = require('./routes')
require('./config/mongoose')


//setting template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main'}))
app.set('view engine', 'handlebars')


app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'))


//routes setting
app.use(routes)



//start and listen on the Express server
app.listen(port, () => {
  console.log(`listening on ${port}`)
})