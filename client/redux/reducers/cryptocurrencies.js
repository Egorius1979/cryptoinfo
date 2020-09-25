import axios from 'axios'

const SET_CRYPTONAME = 'SET_CRYPTONAME'
const GET_CRYPTO = 'GET_CRYPTO'
const GET_CRYPTO_PRICE = 'GET_CRYPTO_PRICE'
const GET_TOP = 'GET_TOP'
const GET_PRICE_DATA = 'GET_PRICE_DATA'

const initialState = {
  cryptoname: '',
  crypto: {},
  crypto_price: '',
  toplist: [],
  dataset: [],
  coinsOnPage: 50
}

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_CRYPTONAME:
      return { ...state, cryptoname: action.cryptoname }
    case GET_CRYPTO:
      return { ...state, crypto: action.crypto }
    case GET_CRYPTO_PRICE:
      return { ...state, crypto_price: action.price }
    case GET_PRICE_DATA:
      return { ...state, dataset: action.dataset }
    case GET_TOP: {
      let tempArray = []
      let newArray = []
      const listbyPages = action.list.reduce((acc, rec, index) => {
        tempArray = [...tempArray, rec]
        if ((index + 1) % state.coinsOnPage === 0 || index === action.list.length - 1) {
          newArray = [...newArray, tempArray]
          tempArray = []
          return newArray
        }
        return newArray
      }, [])
      return { ...state, toplist: listbyPages }
    }
    default:
      return state
  }
}

export function setName(cryptoname) {
  return { type: SET_CRYPTONAME, cryptoname }
}

export function getCrypto(cryptoname) {
  const coin = cryptoname.toUpperCase()
  return (dispatch) => {
    axios
      .get(`/api/v1/currencies/${cryptoname}`)
      .then((it) =>
        it.data === 'err'
          ? dispatch({ type: GET_CRYPTO, crypto: it.data })
          : dispatch({ type: GET_CRYPTO, crypto: it.data.data[coin] })
      )
  }
}

export function getPrice(cryptoname) {
  const coin = cryptoname.toUpperCase()
  return (dispatch) =>
    axios.get(`/api/v1/currencies/price/${cryptoname}`).then((it) =>
      it.data === 'err'
        ? dispatch({ type: GET_CRYPTO_PRICE, price: it.data })
        : dispatch({
            type: GET_CRYPTO_PRICE,
            price: it.data.data[coin].quote.USD.price.toFixed(2)
          })
    )
}

export function getPriceData(cryptoname) {
  return (dispatch) => {
    axios
      .get(`/api/v1/currencies/pricedata/${cryptoname}`)
      .then((it) => dispatch({ type: GET_PRICE_DATA, dataset: it.data }))
  }
}

export function getList(number) {
  return (dispatch) => {
    axios
      .get(`/api/v1/currencies/listing/${number}`)
      .then((it) => dispatch({ type: GET_TOP, list: it.data.data }))
  }
}
