module.exports = {
  COLLECTION_CONFIG: process.env.MONGO_CONFIG_COLLECTION_NAME || 'config',
  COLLECTION_STRATEGY: process.env.MONGO_CONFIG_COLLECTION_NAME || 'strategy',
  THEMES: ['light', 'dark']
}
