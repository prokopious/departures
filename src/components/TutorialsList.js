import React, { useState, useEffect } from "react";
import TutorialDataService from "../services/TutorialService";
import { Link } from "gatsby"

const FlightsList = () => {
  const [flights, setFlights] = useState([]);
  const [currentFlight, setCurrentFlight] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [searchTitle, setSearchTitle] = useState("");

  useEffect(() => {
    retrieveFlights();
  }, []);

  const onChangeSearchTitle = e => {
    const searchTitle = e.target.value;
    setSearchTitle(searchTitle);
  };

  const retrieveFlights = () => {
    TutorialDataService.getAll()
      .then(response => {
        setFlights(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const refreshList = () => {
    retrieveFlights();
    setCurrentFlight(null);
    setCurrentIndex(-1);
  };

  const setActiveFlight = (flight, index) => {
    setCurrentFlight(flight);
    setCurrentIndex(index);
  };

  const removeOneFlight = id => {
    TutorialDataService.remove(id)
      .then(response => {
        console.log(response.data);
        refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  };


  const removeAllFlights = () => {
    TutorialDataService.removeAll()
      .then(response => {
        console.log(response.data);
        refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  };

  const findByTitle = () => {
    TutorialDataService.findByTitle(searchTitle)
      .then(response => {
        setFlights(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <div className="list row">
      <div className="col-md-8">
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search by title"
            value={searchTitle}
            onChange={onChangeSearchTitle}
          />
          <div className="input-group-append">
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={findByTitle}
            >
              Search
            </button>
          </div>
        </div>
      </div>
      <div className="col-md-6">
        <h4>Flights List</h4>

        <ul className="list-group">
          {flights &&
            flights.map((flight, index) => (
             <> <li
                className={
                  "list-group-item " + (index === currentIndex ? "active" : "")
                }
                onClick={() => setActiveFlight(flight, index)}
                key={index}
              >
                {flight.title} ~ {flight.description}
              </li>      <button
          className="m-3 btn btn-sm btn-danger"
          onClick={removeOneFlight(flight.id)}
        >
          Remove
        </button></>
            ))}
        </ul>

        <button
          className="m-3 btn btn-sm btn-danger"
          onClick={removeAllFlights}
        >
          Remove All
        </button>
      </div>
      <div className="col-md-6">
        {currentFlight ? (
          <div>
            <h4>Flight</h4>
            <div>
              <label>
                <strong>Title:</strong>
              </label>{" "}
              {currentFlight.title}
            </div>
            <div>
              <label>
                <strong>Description:</strong>
              </label>{" "}
              {currentFlight.description}
            </div>
            <button
          className="m-3 btn btn-sm btn-danger"
          onClick={removeOneFlight(currentFlight.id)}
        >
          Remove
        </button>
            <div>
              <label>
                <strong>Status:</strong>
              </label>{" "}
              {currentFlight.published ? "Published" : "Pending"}
            </div>

            <Link
              to={"/tutorials/" + currentFlight.id}
              className="badge badge-warning"
            >
              Edit
            </Link>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a flight...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FlightsList;
