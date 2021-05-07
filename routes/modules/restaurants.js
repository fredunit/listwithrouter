const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/restaurant')



//create
router.get('/new', (req, res) => {
  return res.render('new')
})

router.post('/', (req, res) => {
  const restaurant= req.body
  return Restaurant.create(restaurant)
  .then(() => res.redirect('/'))
  .catch(error => console.log(error))
})

router.get('/:id', (req, res) => {
  const { id } = req.params

  return Restaurant.findById(id)
    .lean()
    .then(restaurant => res.render('show', { restaurant }))
    .catch(error => console.log(error))
})





//edit and update restaurants
router.get('/:id/edit', (req, res) => {
  const { id } = req.params
  return Restaurant.findById(id)
    .lean()
    .then(restaurant => { res.render('edit', restaurant) })
    .catch(error => console.log(error))
})

router.put('/:id', (req, res) => {
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
router.delete('/:id', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
  .then(restaurant => restaurant.remove())
  .then(() => res.redirect('/'))
  .catch(error => console.log(error))
})

module.exports = router