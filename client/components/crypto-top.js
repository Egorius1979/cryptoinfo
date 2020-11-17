import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams, Link } from 'react-router-dom'
import { select, selectAll } from 'd3'
import { getList } from '../redux/reducers/cryptocurrencies'
import Pagination from './pagination'

const Top = () => {
  const [selected, setSelected] = useState('')
  const { cryptoNumber, page } = useParams()
  const toplist = useSelector((store) => store.cryptos.toplist[+page - 1])
  const dispatch = useDispatch()

  const width = 1200
  const height = 400
  const barpadding = 1
  const zero = height / 2
  const barWidth = (width / (toplist || []).length - barpadding).toFixed(0)
  const change = (toplist || []).map((it) => ({
    name: it.name,
    change: it.quote.USD.percent_change_24h * 5
  }))
  const text = (toplist || []).map((it) => it.symbol)

  useEffect(() => {
    dispatch(getList(cryptoNumber))
  }, [cryptoNumber, dispatch])

  selectAll('#chart svg').remove()

  const svg = select('#chart')
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
    .attr('y', (item) => (item.change > 0 ? zero - item.change : zero))
    .attr('width', barWidth)
    .attr('height', (item) => (item.change > 0 ? item.change : -item.change))
    .attr('id', (item, index) => index)
    .attr('fill', (item) =>
      item.change > 0 ? `rgb(0,${item.change > 180 ? 180 : item.change},128)` : 'FireBrick'
    )
    .on('mouseover', (d, item) => setSelected(toplist.find((it) => it.name === item.name)))

  svg
    .selectAll('text')
    .data(text)
    .enter()
    .append('text')
    .text((item) => item)
    .attr('x', (item, index) => index * (width / (toplist || []).length) + barWidth / 2)
    .attr('y', (item, index) => (change.map((it) => it.change)[index] > 0 ? zero + 10 : zero - 50))
    .style('writing-mode', 'tb')
    .style('font-size', '16px')
    .style('font-weight', 600)

  return (
    <div id="top" className="back-top">
      <ul className="h-12 grid-set items-center mx-auto font-bold font-sans bg-gray-900 text-white border border-black sticky_header md:h-16 xl:w-3/5">
        <li className="pl-10 md:pl-16">Name</li>
        <li className="hidden md:block">Market Cap</li>
        <li className="hidden md:block">Circulating supply</li>
        <li>Price</li>
        <li className="hidden md:block">Change(24h)</li>
      </ul>
      <div className="bg-gray-800 text-white text-sm lg:text-base xl:mx-auto xl:w-3/5">
        {(toplist || []).map((it) => (
          <ul
            className="grid-set items-center text-orange-400 h-12 border border-black coin-hover"
            key={it.id}
          >
            <li className="flex items-center text-base lg:pl-5 lg:text-xl">
              <div className={`mr-3 ${it.cmc_rank < 10 ? 'pl-2' : 'pl-0'}`}>{it.cmc_rank}.</div>
              <img
                className="w-5 h-5 mr-2"
                src={`https://s2.coinmarketcap.com/static/img/coins/64x64/${it.id}.png`}
                alt="logo"
              />
              <Link to={`/${it.symbol}`}>
                <div className="text-gray-300 name-cover items-center">{it.name}</div>
              </Link>
            </li>
            <li className="hidden md:block  md:text-red-400 items-center">
              ${Math.round(it.quote.USD.market_cap)}
            </li>
            <li className="hidden md:block  lg:text-blue-600 items-center">
              {Math.round(it.circulating_supply)} {it.symbol}
            </li>
            <li className="md:block text-blue-300">${it.quote.USD.price.toFixed(2)}</li>
            <li
              className={`hidden md:block  ${
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
      <div className="hidden text-center my-4 md:block text-xl font-black">
        <span>Change 24h</span>
      </div>
      <div id="chart" className="hidden justify-center p-2 md:flex" />
      <div className="flex flex-col justify-center items-center pb-10">
        <Link to={`/${selected.symbol}`}>
          <p className="text-green-800 text-3xl font-black">{selected.name}</p>
        </Link>
        <span
          className={`${
            !selected.cmc_rank ? 'hidden' : 'block text-orange-900 text-2xl font-black'
          }`}
        >
          top-list rank: {selected.cmc_rank}
        </span>
      </div>
      <div>
        <Pagination />
      </div>
    </div>
  )
}

export default Top
