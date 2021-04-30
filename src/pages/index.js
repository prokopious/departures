import * as React from "react"
import { Link } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"

import Layout from "../components/layout"
import Seo from "../components/seo"
import { useEffect, useState } from "react"

const IndexPage = () => {

  const [data, setData] = useState([]); // new

	useEffect(() => {
		fetch("https://casarosada.herokuapp.com/flights")
		.then((response) => response.json())
		.then((data) => {
			setData(data) // new
		})
}, [])

return (
  <Layout>
    <Seo title="Home" />
    <div>
       <h4>Departures</h4>     
       <div className="wrapper2">
			       <div className="box2 box1">Airline</div>
  <div className="box2 box2">Flight</div>
  <div className="box2">To</div>
  <div className="box2">Scheduled</div>
  <div className="box2">Gate</div>
         
        </div>
        {data.map(item => (
        <div className="wrapper" key={item.id}>
			       <div class="box box3">{item.airline}</div>
  <div className="box box4">{item.fnumber}</div>
  <div className="box">{item.ato}</div>
  <div className="box">{item.scheduled}</div>
  <div className="box">{item.gate}</div>
         
        </div>
      ))}



</div>
   


    <p>
   
    </p>
  </Layout>
)}

export default IndexPage
