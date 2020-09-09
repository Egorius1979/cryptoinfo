import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { setPage } from '../redux/reducers/cryptocurrencies'

const Pagination = () => {
  const { cryptoNumber } = useParams()
  const pagesAmount = useSelector((store) => store.cryptos.toplist.length - 1)
  const currentPage = useSelector((store) => store.cryptos.currentPage)
  const coinsOnPage = useSelector((store) => store.cryptos.coinsOnPage)
  const dispatch = useDispatch()

  if (cryptoNumber > coinsOnPage) {
    return (
      <div className="flex justify-center items-center bg-gray-500 py-2 border-black border md:py-3">
        <a href="#">
          <button
            type="button"
            className="w-10 bg-transparent rounded-l-lg mr-3 hover:bg-green-800 hover:text-white md:w-14 outline"
            onClick={() => dispatch(setPage(0))}
          >
            {'<<'}
          </button>
        </a>
        <a href="#">
          <button
            type="button"
            className="w-12 bg-transparent text-black hover:bg-black hover:text-white tracking-wider md:w-16 outline"
            onClick={() =>
              currentPage === 0
                ? dispatch(setPage(currentPage))
                : dispatch(setPage(currentPage - 1))
            }
          >
            Prev
          </button>
        </a>
        <a href="#">
          <button
            type="button"
            className="w-12 bg-transparent mr-3 text-black hover:bg-black hover:text-white tracking-wider md:w-16 outline"
            onClick={() =>
              currentPage === pagesAmount
                ? dispatch(setPage(currentPage))
                : dispatch(setPage(currentPage + 1))
            }
          >
            Next
          </button>
        </a>
        <a href="#">
          <button
            type="button"
            className="w-10 bg-transparent rounded-r-lg hover:bg-green-800 hover:text-white md:w-14 outline"
            onClick={() => dispatch(setPage(pagesAmount))}
          >
            {'>>'}
          </button>
        </a>
      </div>
    )
  }
  return <div />
}

export default Pagination
