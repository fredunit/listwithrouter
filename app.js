//require packages used in the project
const express = require('express')
const app = express()
const port = 3000
const exphbs = require('express-handlebars')
const restaurantList = require('./restaurant.json').results
const Restaurant = require('./models/restaurant')
const methodOverride = require('method-override')
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/restaurant-list', { useNewUrlParser: true, useUnifiedTopology: true })


const db = mongoose.connection
db.on('error', () => {
  console.log('mongodb error!')
})

db.once('open', () => {
  console.log('mongodb connected!')
})


//setting template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main'}))
app.set('view engine', 'handlebars')


app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'))

//routes setting
app.get('/', (req, res) => {
  Restaurant.find()
  .lean()
  .sort({ _id: 'asc'})
  .then(restaurant => res.render('index', { restaurant }))
  .catch(error => console.log(error))
})

app.get('/restaurants/:id', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
  .lean()
  .then(restaurant => res.render('show', { restaurant }))
  
})

app.get('/search', (req, res) => {
  const keyword = req.query.keyword
  const restaurants = restaurantList.filter(restaurant => {

    return restaurant.name.toLowerCase().includes(keyword.toLowerCase()) || 
    restaurant.name_en.toLowerCase().includes(keyword.toLowerCase())
  })
  res.render('index', {restaurants: restaurants})
})

//create
app.get('/restaurants', (req, res) => {
  return res.render('new')
})

app.post('/restaurants/new', (req, res) => {
  const restaurant= req.body
  return Restaurant.create(restaurant)
  .then(() => res.redirect('/'))
  .catch(error => console.log(error))
})

//edit and update restaurants
app.get('/restaurants/:id/edit', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .lean()
    .then(restaurant => { res.render('edit', restaurant) })
    .catch(error => console.log(error))
})

app.put('/restaurants/:id', (req, res) => {
  const id = req.params.id
  const {name, category, image,
        location, phone, rating,
        google_map, description} = req.body
  return Restaurant.findById(id)
    .then(restaurant => {
        restaurant.name = name
        restaurant.category = category
        restaurant.image = image
        restaurant.loction = location
        restaurant.phone = phone
        restaurant.rating = rating
        restaurant.google_map = google_map
        restaurant.description = description
        return restaurant.save()
      })
    .then(() => res.redirect(`/restaurants/${id}`))
    .catch(error => console.log(error))
})

//delete
app.delete('/restaurants/:id', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
  .then(restaurant => restaurant.remove())
  .then(() => res.redirect('/'))
  .catch(error => console.log(error))
})

//start and listen on the Express server
app.listen(port, () => {
  console.log(`listening on ${port}`)
})