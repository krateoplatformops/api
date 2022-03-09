const mongoose = require('mongoose')
const Schema = mongoose.Schema

const { dbConstants } = require('../constants')

const logoSchema = new Schema({
  type: {
    type: String,
    required: true,
    default: 'logo'
  },
  theme: {
    type: String,
    default: 'light',
    enum: dbConstants.THEMES
  },
  image: {
    type: String
  }
})

logoSchema.index({ type: 1 }, { name: 'logoIndex' })

module.exports = mongoose.model(
  'Logo',
  logoSchema,
  dbConstants.COLLECTION_CONFIG
)
