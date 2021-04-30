import * as React from "react"
import { Link } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"

import Layout from "../components/layout"
import Seo from "../components/seo"
import { useEffect, useState } from "react"

const IndexPage = () => {
  const [data, setData] = useState([]) // new

  useEffect(() => {
    fetch("https://casarosada.herokuapp.com/flights")
      .then(response => response.json())
      .then(data => {
        setData(data) // new
      })
  }, [])

  return (
    <Layout>
      <Seo title="Home" />
      <div>
        <h4>Departures</h4>
        <div className="wrapper2">
          <div className="box7">Airline</div>
          <div className="box7">Flight</div>
          <div className="box7">To</div>
          <div className="box7">Scheduled</div>
          <div className="box7">Gate</div>
        </div>
        {data.map(item => {
          if (item.id % 2 === 1) {
            return (
              <div className="wrapper" key={item.id}>
                <div class="box8">{item.airline}</div>
                <div className="box8">{item.fnumber}</div>
                <div className="box8">{item.ato}</div>
                <div className="box8">{item.scheduled}</div>
                <div className="box8">{item.gate}</div>
              </div>
            )
          } else {
            return (
              <div className="wrapper" key={item.id}>
                <div class="box9">{item.airline}</div>
                <div className="box9">{item.fnumber}</div>
                <div className="box9">{item.ato}</div>
                <div className="box9">{item.scheduled}</div>
                <div className="box9">{item.gate}</div>
              </div>
            )
          }
        })}
      </div>

      <p></p>
    </Layout>
  )
}

export default IndexPage
