const mongoose = require('mongoose')
const Schema = mongoose.Schema

const { dbConstants } = require('../constants')

const configSchema = new Schema({
  type: {
    type: String,
    required: true
  }
})

configSchema.index({ type: 1 }, { name: 'configIndex' })

module.exports = mongoose.model(
  'Config',
  configSchema,
  dbConstants.COLLECTION_CONFIG
)
