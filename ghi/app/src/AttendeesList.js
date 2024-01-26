import { useState, useEffect} from 'react';

function AttendeesList() {
  const [attendees, setAttendees] = useState([])

  const getData = async ()=> {
    const response = await fetch('http://localhost:8001/api/attendees/');
    if (response.ok) {
      const { attendees } = await response.json();
      setAttendees(attendees);
    } else {
      console.error('An error occurred fetching the data')
    }
  }

  useEffect(()=> {
    getData()
  }, []);

  return (
    <div className="my-5 container">
      <div className="row">
        <h1>Current Attendees</h1>

        <table className="table table-striped m-3">
          <thead>
            <tr>
              <th>Name</th>
              <th>Conference</th>
            </tr>
          </thead>
          <tbody>
            {attendees.map(attendee => {
              return (
                <tr key={attendee.href}>
                  <td>{ attendee.name }</td>
                  <td>{ attendee.conference }</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AttendeesList;
