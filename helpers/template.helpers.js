const { resolveValue } = require('path-value')

const validate = (doc) => {
  // check root structure
  const requiredFields = [
    'apiVersion',
    'kind',
    'metadata',
    'metadata.name',
    'metadata.annotations.title',
    'metadata.annotations.description',
    'metadata.annotations.owner',
    'metadata.labels.tags',
    'spec',
    'spec.widgets'
  ]
  requiredFields.forEach((p) => {
    if (!resolveValue(doc, p)) {
      throw new Error(`Missing field ${p}`)
    }
  })
  // check widgets
}

module.exports = {
  validate
}
