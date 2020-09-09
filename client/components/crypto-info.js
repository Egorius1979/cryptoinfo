import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import { getCrypto, getPrice } from '../redux/reducers/cryptocurrencies'
import twitter from '../assets/static/images/twitter-4-32.png'
import reddit from '../assets/static/images/reddit-4-32.png'
import chrome from '../assets/static/images/chrome-1-32.png'

const Currency = () => {
  const { cryptoName } = useParams()
  const crypto = useSelector((store) => store.cryptos.crypto)
  const cryptoPrice = useSelector((store) => store.cryptos.crypto_price)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getCrypto(cryptoName))
    dispatch(getPrice(cryptoName))
  }, [cryptoName])

  return (
    <div id="#">
      {crypto.map((it) =>
        it === 'err' ? (
          <div className="flex text-xl items-center justify-center h-screen bg-gray-900 text-red-500 lg:text-4xl">
            <p>Ты облажался, нет такой крипты!!!</p>
          </div>
        ) : (
          <div key={it.name}>
            <div className="flex items-center p-2 space-x-3 back lg:space-x-4 lg:p-5 sticky_header">
              <img className="h-10 header_padding lg:h-full" src={it.logo} alt="logo" />
              <span className="text-2xl antialiased font-sans font-medium text-white lg:text-4xl">
                {it.name}
              </span>
              <div className="pt-1 pl-4 text-green-400 text-sm lg:pl-5 lg:pt-3 lg:text-base">
                <p>${cryptoPrice}</p>
              </div>
            </div>
            <div className="p-1 bg-gray-100 shadow-lg w-full lg:w-3/4 lg:mx-auto">
              <ReactMarkdown source={it.description} />
            </div>
            <ul className="flex links_padding space-x-4 justify-end m-3 lg:my-6">
              <li>
                <a href={it.urls.website}>
                  <img src={chrome} alt="web" />
                </a>
              </li>
              <li className={`${typeof it.urls.twitter[0] === 'undefined' ? 'hidden' : 'block'}`}>
                <a href={it.urls.twitter}>
                  <img src={twitter} alt="twitter" />
                </a>
              </li>
              <li className={`${typeof it.urls.reddit[0] === 'undefined' ? 'hidden' : 'block'}`}>
                <a href={it.urls.reddit}>
                  <img src={reddit} alt="reddit" />
                </a>
              </li>
            </ul>
          </div>
        )
      )}
    </div>
  )
}

export default Currency
