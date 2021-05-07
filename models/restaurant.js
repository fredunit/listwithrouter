const mongoose = require('mongoose')
const { Schema } = mongoose
const restaurantSchema = new Schema({
  name: {
  type: String,
  require: true
  },
  en_name: String,
  category: String,
  image: String,
  location: String,
  phone: String,
  google_map: String,
  rating: String,
  description: String
})
module.exports = mongoose.model('Restaurant', restaurantSchema)
