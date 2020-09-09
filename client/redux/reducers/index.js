import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import cryptos from './cryptocurrencies'

const createRootReducer = (history) =>
  combineReducers({
    router: connectRouter(history),
    cryptos
  })

export default createRootReducer
