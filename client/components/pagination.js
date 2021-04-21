import React from 'react'
import { useSelector } from 'react-redux'
import { useParams, Link } from 'react-router-dom'

const Pagination = () => {
  const { cryptoNumber, page } = useParams()
  const pagesAmount = useSelector((store) => store.cryptos.toplist.length)
  const coinsOnPage = useSelector((store) => store.cryptos.coinsOnPage)

  if (cryptoNumber > coinsOnPage) {
    return (
      <div className="flex justify-center items-center bg-gray-500 py-2 border-black border-t md:py-3">
        <Link to="1">
          <button
            type="button"
            disabled={+page === 1}
            className={`${
              +page === 1 ? 'cursor-not-allowed' : 'inline-block'
            } w-10 bg-transparent rounded-l-lg mr-3 hover:bg-green-800 hover:text-white md:w-14 outline`}
            onClick={() =>
              window.scroll({
                left: 0,
                top: 0,
                behavior: 'smooth'
              })
            }
          >
            {'<<'}
          </button>
        </Link>
        <Link to={`${+page > 1 ? +page - 1 : +page}`}>
          <button
            type="button"
            disabled={+page === 1}
            className={`${
              +page === 1 ? 'cursor-not-allowed' : 'inline-block'
            } w-12 bg-transparent text-black hover:bg-black hover:text-white tracking-wider md:w-16 outline`}
            onClick={() =>
              window.scroll({
                left: 0,
                top: 0,
                behavior: 'smooth'
              })
            }
          >
            Prev
          </button>
        </Link>
        <Link to={`${+page < pagesAmount ? +page + 1 : +page}`}>
          <button
            type="button"
            disabled={+page === pagesAmount}
            className={`${
              +page === pagesAmount ? 'cursor-not-allowed' : 'inline-block'
            } w-12 bg-transparent mr-3 text-black hover:bg-black hover:text-white tracking-wider md:w-16 outline`}
            onClick={() =>
              window.scroll({
                left: 0,
                top: 0,
                behavior: 'smooth'
              })
            }
          >
            Next
          </button>
        </Link>
        <Link to={`${pagesAmount}`}>
          <button
            type="button"
            disabled={+page === pagesAmount}
            className={`${
              +page === pagesAmount ? 'cursor-not-allowed' : 'inline-block'
            } w-10 bg-transparent rounded-r-lg hover:bg-green-800 hover:text-white md:w-14 outline`}
            onClick={() =>
              window.scroll({
                left: 0,
                top: 0,
                behavior: 'smooth'
              })
            }
          >
            {'>>'}
          </button>
        </Link>
      </div>
    )
  }
  return <div />
}

export default Pagination
