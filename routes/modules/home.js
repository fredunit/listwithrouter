const express = require('express')
const router = express.Router()

const Restaurant = require('../../models/restaurant')

router.get('/', (req, res) => {
  Restaurant.find()
  .lean()
  .then(restaurant => res.render('index', { restaurant }))
  .catch(error => console.log(error))
})

router.get('/search', (req, res) => {
  const keyword = req.query.keyword
  const restaurants = restaurantList.filter(restaurant => {

    return restaurant.name.toLowerCase().includes(keyword.toLowerCase()) || 
    restaurant.name_en.toLowerCase().includes(keyword.toLowerCase())
  })
  res.render('index', {restaurants: restaurants})
})


module.exports = router