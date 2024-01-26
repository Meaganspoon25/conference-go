import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Conference(props) {
  const { conference } = props;

  return (
    <div className="g-col-3">
        <div key="{conference.href}" className="card mb-3 shadow">
          <img src={conference.location.picture_url} className="card-img-top" alt={conference.location.picture_url}/>

          <div className="card-body">
            <h5 className="card-title">{conference.name}</h5>
            <h6 className="card-subtitle mb-2 text-muted">
              {conference.location.name}
            </h6>
            <p className="card-text">
              {conference.description}
            </p>
          </div>

          <div className="card-footer">
            {new Date(conference.starts).toLocaleDateString()}
            -
            {new Date(conference.ends).toLocaleDateString()}
          </div>
        </div>
    </div>
  );
}

function MainPage() {
  const [conferences, setConferences] = useState([]);

  async function getConferences() {
    const url = 'http://localhost:8000/api/conferences/';
    const response = await fetch(url);

    if (response.ok) {
      const data = await response.json();

      const detailResponses = data.conferences.map(async conference => {
        const response = await fetch(`http://localhost:8000/${conference.href}`);
        return await response.json();
      })

      const conferenceDetails = await Promise.all(detailResponses)
      setConferences(conferenceDetails);
    }
  }

  useEffect(() => {
    getConferences();
  }, [])

  return (
    <>
      <div className="px-4 py-5 my-5 mt-0 text-center bg-info">
        <img className="bg-white rounded shadow d-block mx-auto mb-4" src="/logo.svg" alt="" width="600" />
        <h1 className="display-5 fw-bold">Conference GO!</h1>
        <div className="col-lg-6 mx-auto">
          <p className="lead mb-4">
            The only resource you'll ever need to plan an run your in-person or
            virtual conference for thousands of attendees and presenters.
          </p>
          <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
            <Link to="/attendees/new" className="btn btn-primary btn-lg px-4 gap-3">Attend a conference</Link>
          </div>
        </div>
      </div>
      <div className="container">
        <h2>Upcoming conferences</h2>
        <div className="conferenceList">
          {conferences.map(({conference}) => {
            return (
              <Conference key={conference.href} conference={conference} />
            );
          })}
        </div>
      </div>
    </>
  );
}

export default MainPage;
