const router = require('express').Router()

router.post('/command', (req, res, next) => {
  const {
    body: { data }
  } = req

  const { first, second } = data

  if (!first) {
    return res.status(422).json({
      errors: {
        first: 'is required'
      }
    })
  }

  if (!second) {
    return res.status(422).json({
      errors: {
        second: 'is required'
      }
    })
  }

  res.status(201)

  res.json({
    data: {
      ok: 1,
      message: 'Success',
      data
    }
  })
})

module.exports = router
