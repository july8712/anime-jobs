const $ = (selector) => document.querySelector(selector)
const $$ = (selector) => document.querySelectorAll(selector)
const addClass = (selector, classname) => {
    selector.classList.add(classname)
} 
const removeClass = (selector, classname) => {
    selector.classList.remove(classname)
} 


// ***************************************** Variables ************************************************

const lastAdditions = $("#lastAdditions")
const mostRequested = $("#mostRequested")
const lessRequested = $("#lessRequested")

let dataJobs = []

// ***************************************** End Variables ************************************************

// ***************************************** Functions ************************************************

const showData = () => {
    fetch("https://6380fa6a8efcfcedac14a09f.mockapi.io/jobs")
        .then(response => response.json())
        .then(data => {
            dataJobs = data;
            listJobs(changeHighlights("recent", dataJobs))
    })
}

showData()

const changeHighlights = (searchBy, data ) => {
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
        case 'recent':
            order = data.sort((a,b) => {
                return new Date(a.publicationDate).getTime() < new Date(b.publicationDate).getTime()
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
                <div class="bg-[url('${image}')] bg-cover bg-center bg-no-repeat w-full h-52 mb-7"></div>
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


// *********************************** Events ***********************************

mostRequested.addEventListener('click', () => {
    listJobs(changeHighlights("most", dataJobs))
    removeClass(mostRequested, "bg-[#b7325e]")
    addClass(mostRequested, "bg-[#ce4164]")
    removeClass(lastAdditions, "bg-[#ce4164]")
    addClass(lastAdditions, "bg-[#b7325e]")
    removeClass(lessRequested, "bg-[#ce4164]")
    addClass(lessRequested, "bg-[#b7325e]")
})

lessRequested.addEventListener('click',() => {
    listJobs(changeHighlights("less", dataJobs))
    removeClass(mostRequested, "bg-[#ce4164]")
    addClass(mostRequested, "bg-[#b7325e]")
    removeClass(lastAdditions, "bg-[#ce4164]")
    addClass(lastAdditions, "bg-[#b7325e]")
    removeClass(lessRequested, "bg-[#b7325e]")
    addClass(lessRequested, "bg-[#ce4164]")
})

lastAdditions.addEventListener('click',() => {
    listJobs(changeHighlights("recent", dataJobs))
    removeClass(mostRequested, "bg-[#ce4164]")
    addClass(mostRequested, "bg-[#b7325e]")
    removeClass(lastAdditions, "bg-[#b7325e]")
    addClass(lastAdditions, "bg-[#ce4164]")
    removeClass(lessRequested, "bg-[#ce4164]")
    addClass(lessRequested, "bg-[#b7325e]")
})

// console.log(new Date(1669402798).toLocaleDateString());

