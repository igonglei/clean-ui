'use strict'

const Koa = require('koa')
const onerror = require('koa-onerror')
const logger = require('koa-logger')
const serve = require('koa-static')
const favicon = require('koa-favicon')
const path = require("path")
const opn = require('opn')
const build = require("./build.js")
const port = 3000

const resolve = (filePath = '') => path.join(__dirname, '..', 'dist', filePath)

const app = new Koa()

onerror(app)

app.use(logger())

app.use(serve(resolve()))

app.use(favicon(resolve('static/favicon.ico')))

build().then(() => {
  app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
    opn(`http://localhost:${port}`)
  })
})

module.exports = app
