const express = require('express')
const errorHandler = require('errorhandler')

// Import settings
const { port } = require('./config/settings.json')

//Configure isProduction variable
const isProduction = process.env.NODE_ENV === 'production'

//Initiate our app
const app = express()
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

if (!isProduction) {
  console.log('I am in dev mode :)')
  app.use(errorHandler())
}

//Models & routes
app.use(require('./routes'))

//Error handlers & middlewares
if (!isProduction) {
  app.use((err, req, res, next) => {
    res.status(err.status || 500)

    res.json({
      errors: {
        message: err.message,
        error: err
      }
    })
  })
}

app.use((err, req, res, next) => {
  res.status(err.status || 500)

  res.json({
    errors: {
      message: err.message,
      error: {}
    }
  })
})

app.listen(port, () =>
  console.log(`Mail API running on http://localhost:${port}/`)
)
