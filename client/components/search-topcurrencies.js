import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const List = () => {
  const [valueNmb, setValueNmb] = useState('')

  const topList = (e) => {
    if (!Number.isNaN(+e.target.value)) {
      if (e.target.value < 0) {
        setValueNmb(0)
      }
      if (e.target.value > 1000) {
        setValueNmb(1000)
      } else {
        setValueNmb(+e.target.value)
      }
    }
  }

  return (
    <form action={`list/${valueNmb}/1`} method="get" className="flex">
      <div>
        <input
          className="bg-white focus:outline-none border border-gray-300 py-2 px-4 block appearance-none leading-normal
          placeholder-gray-700 placeholder-opacity-75 rounded-l-lg w-56"
          placeholder="Top list (1-1000)"
          id="input-field1"
          type="text"
          value={valueNmb}
          onChange={topList}
        />
      </div>
      <div>
        <Link to={`list/${valueNmb}/1`}>
          <button
            className="bg-gray-700 hover:bg-gray-900 text-white font-bold py-2 px-4 border border-blue-700 ml-2 rounded-r-lg"
            id="search-button"
            type="submit"
          >
            get info!
          </button>
        </Link>
      </div>
    </form>
  )
}

export default List
