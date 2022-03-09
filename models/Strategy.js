const mongoose = require('mongoose')
const Schema = mongoose.Schema

const { dbConstants } = require('../constants')

const strategySchema = new Schema({
  type: {
    type: String,
    required: true,
    default: 'strategy'
  },
  provider: {
    type: String
  },
  config: {
    type: String
  },
  name: {
    type: String
  },
  enabled: {
    type: Boolean,

    default: true
  }
})

strategySchema.index({ provider: 1 }, { name: 'strategyIndex' })

module.exports = mongoose.model(
  'Strategy',
  strategySchema,
  dbConstants.COLLECTION_CONFIG
)
