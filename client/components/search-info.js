import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { setName } from '../redux/reducers/cryptocurrencies'

const Info = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const cryptoname = useSelector((store) => store.cryptos.cryptoname)

  return (
    <div className="flex mb-20">
      <div>
        <input
          className="bg-white focus:outline-none border border-gray-300 py-2 px-4 block appearance-none leading-normal
          placeholder-gray-700 placeholder-opacity-75 rounded-l-lg w-56"
          placeholder="Enter symbol"
          id="input-field"
          type="text"
          value={cryptoname}
          tabIndex="0"
          onChange={(e) => dispatch(setName(e.target.value))}
          onKeyDown={({ key }) => {
            if (key === 'Enter') {
              history.push(cryptoname)
            }
          }}
        />
      </div>
      <div>
        <Link to={cryptoname}>
          <button
            className="bg-gray-700 hover:bg-gray-900 text-white font-bold py-2 px-4 border border-blue-700 ml-2 rounded-r-lg"
            id="search-button"
            type="button"
          >
            get info!
          </button>
        </Link>
      </div>
    </div>
  )
}

export default Info
