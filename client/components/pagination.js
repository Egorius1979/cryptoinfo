import React from 'react'
import { useSelector } from 'react-redux'
import { useParams, Link } from 'react-router-dom'
import Scrollchor from 'react-scrollchor'

const Pagination = () => {
  const { cryptoNumber, page } = useParams()
  const pagesAmount = useSelector((store) => store.cryptos.toplist.length)
  const coinsOnPage = useSelector((store) => store.cryptos.coinsOnPage)

  if (cryptoNumber > coinsOnPage) {
    return (
      <div className="flex justify-center items-center bg-gray-500 py-2 border-black border md:py-3">
        <Scrollchor to="#top">
          <Link to="1">
            <button
              type="button"
              className={`${
                +page === 1 ? 'cursor-not-allowed' : 'inline-block'
              } w-10 bg-transparent rounded-l-lg mr-3 hover:bg-green-800 hover:text-white md:w-14 outline`}
            >
              {'<<'}
            </button>
          </Link>
          <Link to={`${+page > 1 ? +page - 1 : +page}`}>
            <button
              type="button"
              className={`${
                +page === 1 ? 'cursor-not-allowed' : 'inline-block'
              } w-12 bg-transparent text-black hover:bg-black hover:text-white tracking-wider md:w-16 outline`}
            >
              Prev
            </button>
          </Link>
          <Link to={`${+page < pagesAmount ? +page + 1 : +page}`}>
            <button
              type="button"
              className={`${
                +page === pagesAmount ? 'cursor-not-allowed' : 'inline-block'
              } w-12 bg-transparent mr-3 text-black hover:bg-black hover:text-white tracking-wider md:w-16 outline`}
            >
              Next
            </button>
          </Link>
          <Link to={`${pagesAmount}`}>
            <button
              type="button"
              className={`${
                +page === pagesAmount ? 'cursor-not-allowed' : 'inline-block'
              } w-10 bg-transparent rounded-r-lg hover:bg-green-800 hover:text-white md:w-14 outline`}
            >
              {'>>'}
            </button>
          </Link>
        </Scrollchor>
      </div>
    )
  }
  return <div />
}

export default Pagination
