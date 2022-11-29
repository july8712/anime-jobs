const $ = (selector) => document.querySelector(selector)
const $$ = (selector) => document.querySelectorAll(selector)

// ***************************************** Variables ************************************************

const lastAdditions = $("#lastAdditions")
const mostRequested = $("#mostRequested")
const lessRequested = $("#lessRequested")

let dataJobs = []

// ***************************************** End Variables ************************************************

// ***************************************** Variables ************************************************

const showData = () => {
    fetch("https://6380fa6a8efcfcedac14a09f.mockapi.io/jobs")
        .then(response => response.json())
        .then(data => {
            dataJobs = data;
            listJobs(dataJobs)
    })
}

showData()

const mostOrLessRequested = (searchBy, data ) => {
    let order = []
    switch (searchBy){
        case 'most':
            order = data.sort((a,b) => {
                return a.applications < b.applications
            })
        break;
        case 'less':
            order = data.sort((a,b) => {
                return a.applications > b.applications
            })
        break;
    }
    return order
}

const listJobs = (jobs) => {
    let counter = 0;
    $("#containerHighlights").innerHTML = "";
    for (const { name, description, location, seniority, salary, publicationDate, image, anime, page, applications, id } of jobs){
        if (counter < 4) {
            $("#containerHighlights").innerHTML += `
            <div class="w-[250px] bg-white p-3">
                <div class="bg-[url('${image}')] bg-cover bg-center bg-no-repeat w-full h-[200px] mb-7"></div>
                <h2 class="mb-1 text-2xl">${name}</h2>
                <h3 class="mb-4">Publicado el: ${publicationDate}</h3>
                <p class="mb-4">${description.slice(0,70)}...<a href="" class="ml-4 text-[#ce4164]">Ver más</a></p>
                <span class="bg-[#ce4164] text-white px-3 py-1 mt-1 inline-block rounded-lg">${anime}</span>
                <span class="bg-[#ce4164] text-white px-3 py-1 mt-1 inline-block rounded-lg">${seniority}</span>
                <span class="bg-[#ce4164] text-white px-3 py-1 mt-1 inline-block rounded-lg">${location}</span>
                <span class="bg-[#ce4164] text-white px-3 py-1 mt-1 inline-block rounded-lg">Solicitudes: ${applications}</span>
            </div>
            `
            counter += 1
        }
    }
}

mostRequested.addEventListener('click', () => {
    listJobs(mostOrLessRequested("most", dataJobs))
})

lessRequested.addEventListener('click',() => {
    listJobs(mostOrLessRequested("less", dataJobs))
})


// console.log(new Date(1669402798).toLocaleDateString());

