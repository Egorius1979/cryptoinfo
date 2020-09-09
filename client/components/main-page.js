import React from 'react'
import Info from './search-info'
import List from './search-topcurrencies'

const Main = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-900">
      <div className="text-4xl text-green-600 italic font-bold mb-24">Crypto Info</div>
      <div>
        <Info />
      </div>
      <div>
        <List />
      </div>
    </div>
  )
}

export default Main
