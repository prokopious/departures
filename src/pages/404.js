import * as React from "react"

import Layout from "../components/layout"
import Seo from "../components/seo"
import FlightsList from '../components/FlightsList'

const NotFoundPage = () => (
  <Layout>
    <Seo title="404: Not found" />
    <h1>404: Not Found</h1>
    <FlightsList />
  
  </Layout>
)

export default NotFoundPage
