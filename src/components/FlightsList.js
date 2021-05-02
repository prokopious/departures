import React, { useState, useEffect } from "react";
import FlightDataService from "../services/FlightService.js";



const FlightsList = () => {


  const [flights, setFlights] = useState([]);


  useEffect(() => {
    retrieveFlights();
  }, []);

  const retrieveFlights = () => {
    FlightDataService.getAll()
      .then(response => {
        setFlights(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };



  









  return (
<>

<div>
{flights.map(item =>
  
  <div>{item.id}</div>
  
  )}

</div>

</>
  );
};

export default FlightsList;