const express = require('express')
const router = express.Router()
const { envConstants } = require('../../constants')
const { logger } = require('../../helpers/logger.helpers')
const axiosInstance = require('../../axios-conf')
const timeHelpers = require('../../helpers/time.helpers')

router.get('/', async (req, res, next) => {
  try {
    const response = {
      events: []
    }
    const logs = (await axiosInstance.get(envConstants.LOG_URI)).data
    const events = logs.reduce((res, l) => {
      const key = timeHelpers.startOfDay(l.time)

      if (!res[key]) {
        res[key] = []
      }
      if (!res[key][l.level]) {
        res[key][l.level] = 0
      }
      res[key][l.level]++

      return res
    }, {})

    const levels = ['error', 'warning', 'info', 'debug']

    response.events = {
      labels: Object.keys(events),
      datasets: levels.map((l) => {
        return {
          label: l,
          data: Object.keys(events).map((k) => {
            return events[k][l] || 0
          })
        }
      })
    }

    logger.debug(JSON.stringify(response))

    res.status(200).json(response)
  } catch (error) {
    next(error)
  }
})

module.exports = router
