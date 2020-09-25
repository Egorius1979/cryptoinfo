import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams, Link } from 'react-router-dom'
import * as d3 from 'd3'
import { getList } from '../redux/reducers/cryptocurrencies'
import Pagination from './pagination'

const Top = () => {
  const dispatch = useDispatch()
  const { cryptoNumber, page } = useParams()
  const toplist = useSelector((store) => store.cryptos.toplist[+page - 1])

  const width = 1200
  const height = 400
  const barpadding = 1
  const zero = height / 2
  const barWidth = (width / (toplist || []).length - barpadding).toFixed(0)
  const change = (toplist || []).map((it) => it.quote.USD.percent_change_24h * 5)
  const text = (toplist || []).map((it) => it.symbol)

  d3.selectAll('.svg svg').remove()

  const svg = d3
    .select('.svg')
    .append('svg')
    .attr('width', width)
    .attr('height', height)
    .attr('viewBox', '0 0 1200.0001 300.0001')

  svg
    .selectAll('rect')
    .data(change)
    .enter()
    .append('rect')
    .attr('x', (item, index) => ((index * width) / (toplist || []).length).toFixed(0))
    .attr('y', (item) => (item > 0 ? zero - item : zero))
    .attr('width', barWidth)
    .attr('height', (item) => (item > 0 ? item : -item))
    .attr('fill', (item) => (item > 0 ? `rgb(0,${item > 180 ? 180 : item},128)` : 'FireBrick'))

  svg
    .selectAll('text')
    .data(text)
    .enter()
    .append('text')
    .text((item) => item)
    .attr('x', (item, index) => index * (width / (toplist || []).length) + barWidth / 2)
    .attr('y', (item, index) => (change[index] > 0 ? zero + 10 : zero - 50))
    .style('writing-mode', 'tb')

  useEffect(() => {
    dispatch(getList(cryptoNumber))
  }, [cryptoNumber])

  return (
    <div id="top" className="bg-gray-400">
      <ul className="h-12 flex items-center justify-around text-white font-bold font-sans border border-black sticky_header back md:h-20 md:justify-start">
        <li className="md:w-1/3 md:pl-16 lg:w-1/5">Name</li>
        <li className="hidden lg:block lg:w-1/5">Market Cap</li>
        <li className="hidden lg:block lg:w-1/5">Circulating supply</li>
        <li className="md:w-1/3 lg:w-1/5">Price</li>
        <li className="hidden md:block md:w-1/3 lg:w-1/5">Change(24h)</li>
      </ul>
      <div className="bg-gray-800 text-white text-sm lg:text-base">
        {(toplist || []).map((it) => (
          <ul
            className="flex items-center text-orange-400 h-12 border border-black coin-hover"
            key={it.id}
          >
            <li className="w-1/2 flex items-center text-base md:w-1/3 lg:pl-5 lg:text-xl lg:w-1/5 ">
              <div className={`mr-3 ${it.cmc_rank < 10 ? 'pl-2' : 'pl-0'}`}>{it.cmc_rank}.</div>
              <img
                className="w-5 h-5 mr-2"
                src={`https://s2.coinmarketcap.com/static/img/coins/64x64/${it.id}.png`}
                alt="logo"
              />
              <Link to={`/${it.symbol}`}>
                <div className="text-gray-300 name-cover">{it.name}</div>
              </Link>
            </li>
            <li className="hidden lg:block lg:w-1/5 md:text-red-400">
              ${Math.round(it.quote.USD.market_cap)}
            </li>
            <li className="hidden lg:block lg:w-1/5 lg:text-blue-600">
              {Math.round(it.circulating_supply)} {it.symbol}
            </li>
            <li className="w-1/2 flex justify-center md:w-1/3 lg:w-1/5 md:block text-blue-300">
              ${it.quote.USD.price.toFixed(2)}
            </li>
            <li
              className={`hidden md:block md:w-1/3 lg:w-1/5 ${
                it.quote.USD.percent_change_24h < 0 ? 'text-red-600' : 'text-green-600'
              }
                ${
                  it.quote.USD.percent_change_24h < 0 || it.quote.USD.percent_change_24h > 10
                    ? 'pl-0'
                    : 'pl-1'
                }`}
            >
              {it.quote.USD.percent_change_24h.toFixed(2)}%
            </li>
          </ul>
        ))}
      </div>
      <div className="hidden text-center my-4 md:block">
        <span>Change 24h</span>
      </div>
      <div className="svg hidden justify-center m-2 md:flex" />
      <div>
        <Pagination />
      </div>
    </div>
  )
}

export default Top