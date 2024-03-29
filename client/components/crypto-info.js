import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import { getCrypto, getPrice, getPriceData } from '../redux/reducers/cryptocurrencies'
import Chart from './chart'
import twitter from '../assets/static/images/twitter-4-32.png'
import reddit from '../assets/static/images/reddit-4-32.png'
import site from '../assets/static/images/globe-6-32.png'

const Currency = () => {
  const { cryptoName } = useParams()
  const crypto = useSelector((store) => store.cryptos.crypto)
  const cryptoPrice = useSelector((store) => store.cryptos.crypto_price)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getCrypto(cryptoName))
    dispatch(getPrice(cryptoName))
    dispatch(getPriceData(cryptoName))
  }, [cryptoName, dispatch])

  if (crypto) {
    return (
      <div>
        {crypto === 'err' ? (
          <div className="flex text-xl items-center justify-center h-screen bg-gray-900 text-red-500 lg:text-4xl">
            <p>Вы ошиблись, нет такой крипты, увы!</p>
          </div>
        ) : (
          <div>
            <div className="flex items-center p-2 space-x-3 back lg:space-x-4 sticky_header">
              <img className="h-12 header_padding lg:h-16" src={crypto.logo} alt="logo" />
              <span className="text-2xl antialiased font-sans font-medium text-white lg:text-4xl">
                {crypto.name}
              </span>
              <div className="pt-1 pl-4 text-green-400 text-sm lg:pl-5 lg:pt-3 lg:text-base">
                <p>{cryptoPrice}</p>
              </div>
            </div>
            <div className="p-1 bg-gray-100 shadow-lg w-full xl:w-3/5 xl:mx-auto">
              <ReactMarkdown source={crypto.description} />
            </div>
            <ul className="flex links_padding space-x-4 justify-end m-3 lg:my-6">
              <li>
                <a href={crypto.urls.website}>
                  <img src={site} alt="web" />
                </a>
              </li>
              <li
                className={`${typeof crypto.urls.twitter[0] === 'undefined' ? 'hidden' : 'block'}`}
              >
                <a href={crypto.urls.twitter}>
                  <img src={twitter} alt="twitter" />
                </a>
              </li>
              <li
                className={`${typeof crypto.urls.reddit[0] === 'undefined' ? 'hidden' : 'block'}`}
              >
                <a href={crypto.urls.reddit}>
                  <img src={reddit} alt="reddit" />
                </a>
              </li>
            </ul>
            <div className="hidden sm:block">
              <Chart />
            </div>
          </div>
        )}
      </div>
    )
  }
  return <div />
}

export default Currency
