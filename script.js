// const search = document.querySelector('.search-input');
const search = document.getElementById('search');
const matchList = document.getElementById("match-list");

const searchStates = async searchText => {
    const res = await fetch('./patients.json');
    const states = await res.json();
    // console.log(states);

    // Get matches to current input
    let matches = states.filter(state => {
        const regex = new RegExp(`^${searchText}`, 'gi');
        return state.name.match(regex);
    });

    if (searchText.length === 0 ) {
        matches = [];
        matchList.innerHTML = '';
    }

    // console.log(matches);

    outputHtml(matches);
};

// Show results in HTML
const outputHtml = matches => {
    if (matches.length > 0) {
        const html = matches.map(match => `
        <div class="card-main">
        <img class="img-otr" src="./images/${match.img}.jpg" alt="">
        <div class="patient-content">
            <p class="patient-details">
              <span class="normal">${match.name}</span>
              <span>| ${match.age} | ${match.gender} | ${match.phone}</span>
              <span>| ${match.location}</span>
            </p>
          </div>
          <div class="content-right">
            <p>${match.status}</p>
          </div>
      </div>
        `).join('');
        // console.log(html);
        matchList.innerHTML = html;
    }
}

search.addEventListener('input', () => searchStates(search.value));