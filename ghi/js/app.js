function createCard(name, description, pictureUrl, startDate, endDate, location) {
  return `
      <div class="card">
        <img src="${pictureUrl}" class="card-img-top">
        <div class="card-body">
          <h5 class="card-title">${name}</h5>
          <h6 class="card-subtitle mb-2 text-muted">${location}</h6>
          <p class="card-text">${description}</p>
        </div>
        <div class="card-footer">
        <small class="text-muted">Starts: ${startDate} | Ends: ${endDate}</small>
        </div>
      </div>
  `;
}

window.addEventListener('DOMContentLoaded', async () => {

    const url = 'http://localhost:8000/api/conferences/';

    try {
      const response = await fetch(url);

      if (!response.ok) {
        // Figure out what to do when the response is bad
      } else {
        const data = await response.json();
        let count = 0;

        for (let conference of data.conferences) {
          const detailUrl = `http://localhost:8000${conference.href}`;
          const detailResponse = await fetch(detailUrl);
          if (detailResponse.ok) {
            const details = await detailResponse.json();
            const title = details.conference.name;
            const description = details.conference.description;
            const pictureUrl = details.conference.location.picture_url;
            const startDate = new Date(details.conference.starts).toLocaleDateString();
            const endDate = new Date(details.conference.ends).toLocaleDateString();
            const location = details.conference.location.name;

            const html = createCard(title, description, pictureUrl, startDate, endDate, location);
            const column1 = document.querySelector('.col1');
            const column2 = document.querySelector('.col2');
            const column3 = document.querySelector('.col3');
            let columnNumber = count % 3 + 1;
            let column = document.querySelector(`.col${columnNumber}`);
            console.log(column);
            column.innerHTML += html;
            count++;

          }
        }

      }
    } catch (e) {
      // Figure out what to do if an error is raised
      console.log('Error fetching data:', e.message);
    }

  });
