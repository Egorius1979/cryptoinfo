import express from 'express'
import path from 'path'
import cors from 'cors'
import bodyParser from 'body-parser'
import sockjs from 'sockjs'
import { renderToStaticNodeStream } from 'react-dom/server'
import React from 'react'
import axios from 'axios'

import cookieParser from 'cookie-parser'
import config from './config'
import Html from '../client/html'

const Root = () => ''

try {
  // eslint-disable-next-line import/no-unresolved
  // ;(async () => {
  //   const items = await import('../dist/assets/js/root.bundle')
  //   console.log(JSON.stringify(items))

  //   Root = (props) => <items.Root {...props} />
  //   console.log(JSON.stringify(items.Root))
  // })()
  console.log(Root)
} catch (ex) {
  console.log(' run yarn build:prod to enable ssr')
}

let connections = []

const port = process.env.PORT || 8090
const server = express()

const middleware = [
  cors(),
  express.static(path.resolve(__dirname, '../dist/assets')),
  bodyParser.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }),
  bodyParser.json({ limit: '50mb', extended: true }),
  cookieParser()
]

middleware.forEach((it) => server.use(it))

server.get('/api/v1/currencies/:cryptoname', async (req, res) => {
  const { cryptoname } = req.params
  const { data: curr } = await axios({
    method: 'GET',
    url: 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/info',
    params: { symbol: cryptoname },
    json: true,
    gzip: true,
    headers: { 'X-CMC_PRO_API_KEY': process.env.KEY }
  }).catch(() => ({ data: 'err' }))
  res.json(curr)
})

server.get('/api/v1/currencies/price/:cryptoname', async (req, res) => {
  const { cryptoname } = req.params
  const { data: curr } = await axios({
    method: 'GET',
    url: 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest',
    params: { symbol: cryptoname },
    json: true,
    gzip: true,
    headers: { 'X-CMC_PRO_API_KEY': process.env.KEY }
  }).catch(() => ({ data: 'err' }))
  res.json(curr)
})

server.get('/api/v1/currencies/pricedata/:cryptoname', async (req, res) => {
  const { cryptoname: symbol } = req.params
  const { data: curr } = await axios(
    `https://api.twelvedata.com/time_series?symbol=${symbol}/BTC&interval=30min&outputsize=20&dp=8&apikey=${process.env.KEY_2}`
  )
  res.json(curr)
})

server.get('/api/v1/currencies/listing/:number', async (req, res) => {
  const { number } = req.params
  const { data: curr } = await axios({
    method: 'GET',
    url: 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest',
    params: { limit: number },
    json: true,
    gzip: true,
    headers: { 'X-CMC_PRO_API_KEY': process.env.KEY }
  })
  res.json(curr)
})

server.use('/api/', (req, res) => {
  res.status(404)
  res.end()
})

const [htmlStart, htmlEnd] = Html({
  body: 'separator',
  title: 'Skillcrucial - Become an IT HERO'
}).split('separator')

server.get('/', (req, res) => {
  const appStream = renderToStaticNodeStream(<Root location={req.url} context={{}} />)
  res.write(htmlStart)
  appStream.pipe(res, { end: false })
  appStream.on('end', () => {
    res.write(htmlEnd)
    res.end()
  })
})

server.get('/*', (req, res) => {
  const initialState = {
    location: req.url
  }

  return res.send(
    Html({
      body: '',
      initialState
    })
  )
})

const app = server.listen(port)

if (config.isSocketsEnabled) {
  const echo = sockjs.createServer()
  echo.on('connection', (conn) => {
    connections.push(conn)
    conn.on('data', async () => {})

    conn.on('close', () => {
      connections = connections.filter((c) => c.readyState !== 3)
    })
  })
  echo.installHandlers(app, { prefix: '/ws' })
}
console.log(`Serving at http://localhost:${port}`)
