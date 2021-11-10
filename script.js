const baseUrl = "https://ergast.com/api/f1";
let url = baseUrl;

const currentYear = new Date().getFullYear();
const years = document.querySelector('.years');
for (let i = 1950; i <= currentYear; i++) {
    let year = document.createElement('button')
    year.textContent = i
    years.appendChild(year)
}

const yearBtn = document.querySelectorAll('button').forEach(yearBtn => {
    yearBtn.addEventListener('click', fetchResults);
});

function fetchResults(e) {
    e.preventDefault();
    url = `${baseUrl}/${e.target.innerText}`

    fetch(url + ".json")
    .then(res => res.json())
    .then(json => displayResults(json))
    .catch(err => console.log(err))
}

const output = document.querySelector('.output')

function displayResults(json) {

    while (output.firstChild) {
        output.removeChild(output.firstChild);
    }

    let header = document.createElement('h3')
    header.innerText = `The ${json.MRData.RaceTable.season} Season`
    header.id = "output-header"
    output.appendChild(header)

    let races = json.MRData.RaceTable.Races

    let season = json.MRData.RaceTable.Ra

    for (let i = 0; i < races.length; i++) {

//        let para = document.createElement('p');
        let link = document.createElement('a');
        let lineBreak = document.createElement('br');

        let current = races[i];

        link.innerText = `${current.raceName}`
        link.href = current.url
        link.target = "_blank"

        output.appendChild(link);
        output.appendChild(lineBreak);
//        output.appendChild(para);
    }
};