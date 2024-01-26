import React, { useState, useEffect } from 'react';

function PresentationForm() {
  const [presenterName, setPresenterName] = useState('');
  const [presenterEmail, setPresenterEmail] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [title, setTitle] = useState('');
  const [synopsis, setSynopsis] = useState('');
  const [conference, setConference] = useState('');

  const [conferences, setConferences] = useState([]);

  const getData = async ()=> {
    const response = await fetch('http://localhost:8000/api/conferences/');
    if (response.ok) {
      const { conferences } = await response.json();
      setConferences(conferences);
    } else {
      console.error('An error occurred fetching the data')
    }
  }

  useEffect(()=> {
    getData()
  }, []);

  async function handleSubmit(event) {
    event.preventDefault();
    const data = {
      presenter_name: presenterName,
      presenter_email: presenterEmail,
      company_name: companyName,
      title,
      synopsis,
      conference,
    };

    const conferenceId = data.conference;

    const locationUrl = `http://localhost:8000/api/conferences/${conferenceId}/presentations/`;
    const fetchConfig = {
      method: "post",
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const response = await fetch(locationUrl, fetchConfig);
    if (response.ok) {
      const newConference = await response.json();

      setPresenterName('');
      setPresenterEmail('');
      setCompanyName('');
      setTitle('');
      setSynopsis('');
      setConference('');
    }
  }

  function handlePresenterNameChange(event) {
    const { value } = event.target;
    setPresenterName(value);
  }

  function handlePresenterEmailChange(event) {
    const { value } = event.target;
    setPresenterEmail(value);
  }

  function handleCompanyNameChange(event) {
    const { value } = event.target;
    setCompanyName(value);
  }

  function handleTitleChange(event) {
    const { value } = event.target;
    setTitle(value);
  }

  function handleSynopsisChange(event) {
    const { value } = event.target;
    setSynopsis(value);
  }

  function handleConferenceChange(event) {
    const { value } = event.target;
    setConference(value);
  }

  return (
    <div className="row">
      <div className="offset-3 col-6">
        <div className="shadow p-4 mt-4">
          <h1>Create a new presentation</h1>
          <form onSubmit={handleSubmit} id="create-presentation-form">
            <div className="form-floating mb-3">
              <input onChange={handlePresenterNameChange} value={presenterName} placeholder="Presenter name" required type="text" id="presenter_name" className="form-control" />
              <label htmlFor="presenter_name">Presenter name</label>
            </div>
            <div className="form-floating mb-3">
              <input onChange={handlePresenterEmailChange} value={presenterEmail} placeholder="Presenter email" required type="email" id="presenter_email" className="form-control" />
              <label htmlFor="presenter_email">Presenter email</label>
            </div>
            <div className="form-floating mb-3">
              <input onChange={handleCompanyNameChange} value={companyName} placeholder="Company name" type="text" id="company_name" className="form-control" />
              <label htmlFor="company_name">Company name</label>
            </div>
            <div className="form-floating mb-3">
              <input onChange={handleTitleChange} value={title} placeholder="Title" required type="text" id="title" className="form-control" />
              <label htmlFor="title">Title</label>
            </div>
            <div className="mb-3">
              <label htmlFor="synopsis">Synopsis</label>
              <textarea onChange={handleSynopsisChange} value={synopsis} id="synopsis" className="form-control" rows="3" ></textarea>
            </div>
            <div className="mb-3">
              <select onChange={handleConferenceChange} value={conference} required className="form-select" id="conference">
                <option key="" value="">Choose a conference</option>
                {conferences.map(conference => {
                  return (
                    <option key={conference.id} value={conference.id}>{conference.name}</option>
                  )
                })}
              </select>
            </div>
            <button className="btn btn-primary">Create</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default PresentationForm;
