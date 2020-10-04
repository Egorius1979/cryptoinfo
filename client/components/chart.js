import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import * as d3 from 'd3'

const width = 720
const height = 350
const x_margin = 5
const y_margin = 10

const Chart = () => {
  const crypto = useSelector((store) => store.cryptos.crypto)
  const priceDataSet = useSelector((store) => store.cryptos.dataset)

  useEffect(() => {
    if (priceDataSet.status === 'ok') {
      const chartData = priceDataSet.values.sort(
        (a, b) => new Date(a.datetime) - new Date(b.datetime)
      )

      d3.selectAll('#chart svg').remove()

      const svg = d3
        .select('#chart')
        .append('svg')
        .attr('width', width)
        .attr('height', height)
        .attr('viewBox', '0 0 720.0001 350.0001')

      const yScale = d3
        .scaleLinear()
        .domain([d3.min(chartData, (it) => it.low), d3.max(chartData, (it) => it.high)])
        .range([height - y_margin * 2, 0])

      const chartline = d3
        .line()
        .curve(d3.curveBasis)
        .x((item, index) => (index * width) / (chartData.length + 2) + x_margin)
        .y((item) => yScale(item.close))

      svg
        .append('path')
        .datum(chartData)
        .attr(
          'stroke',
          chartData[0].close > chartData[chartData.length - 1].close ? 'red' : 'green'
        )
        .attr('stroke-width', '2.5')
        .attr('fill', 'none')
        .attr('d', chartline)

      const y_axis = d3.axisRight().scale(yScale)

      svg
        .append('g')
        .attr('transform', `translate(${width - 70}, 10)`)
        .call(y_axis.ticks(5))
    } else {
      d3.selectAll('#chart svg').remove()
    }
  }, [priceDataSet])

  return (
    <div className="flex flex-col justify-center items-center">
      <div id="chart" className="shadow-xl mb-5">
        <div className="flex justify-center text-green-800">
          {priceDataSet.status === 'error'
            ? `Простите, друзья, но в настоящий момент отсутствуют котировки по паре ${crypto.symbol}/BTC`
            : ''}
        </div>
      </div>
      <p className="font-semibold">
        {priceDataSet.status !== 'error'
          ? `Изменение цены за последние сутки по паре ${
              crypto.symbol === 'BTC' ? 'BTC/USDT' : `${crypto.symbol}/BTC`
            }`
          : ''}
      </p>
    </div>
  )
}

export default Chart
