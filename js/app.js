const $ = (selector) => document.querySelector(selector)
const $$ = (selector) => document.querySelectorAll(selector)
const addClass = (selector, classname) => {
    selector.classList.add(classname)
} 
const removeClass = (selector, classname) => {
    selector.classList.remove(classname)
}
const URL_BASE =  "https://6380fa6a8efcfcedac14a09f.mockapi.io/jobs/"
const addValue = (selector, contValue) => {
    console.log(contValue)
    selector.value = contValue
}


// ***************************************** Variables ************************************************

const lastAdditions = $("#lastAdditions")
const mostRequested = $("#mostRequested")
const lessRequested = $("#lessRequested")
const generalContainer = $("#generalContainer")

let day = new Date().getDate();
let month = new Date().getMonth() +1;
let year = new Date().getFullYear();

let dataJobs = []
let animeNameSelect = []
let genreSelect = []
let localionSelect = []

// ***************************************** End Variables ************************************************

// ***************************************** Functions ************************************************

const showData = () => {
    removeClass($("#contSpinner"), "hidden")
    fetch(`${URL_BASE}`)
        .then(response => response.json())
        .then(data => {
            setTimeout(() => {
                dataJobs = data;
                printJobs(data)
                animeList(data)
                genreList(data)
                locationList(data)
                listJobs(changeHighlights("recent", [...dataJobs]))
                addClass($("#contSpinner"), "hidden")
            },2000)
        })
        .catch(err => console.log(err))
}
console.log(dataJobs);
showData()

const filterFor = (endpoint, type) => {
    removeClass($("#contSpinner"), "hidden")
    fetch(`${URL_BASE}?${endpoint}=${type}`)
        .then(response => response.json())
        .then(data => {
            setTimeout(() => {
                printJobs(data)
                addClass($("#contSpinner"), "hidden")
            },2000)
        })
        .catch(err => console.log(err))
}




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
    for (const { name, description, location, experience, salary, publicationDate, image, anime, page, applications, id } of jobs){
        let animeName = ""
        if(anime.length > 15){
            animeName = `${anime.slice(0,15)}...`
        }else{
            animeName = anime
        }
        
        if (counter < 4) {
            $("#containerHighlights").innerHTML += `
            <div class="w-[250px] bg-white p-3">
                <div class="bg-[url('${image}')] bg-cover bg-center bg-no-repeat w-full h-52 mb-7"></div>
                <h2 class="mb-1 text-2xl">${name}</h2>
                <h3 class="mb-4">Publicado el: ${publicationDate}</h3>
                <p class="mb-4">${description.slice(0,70)}...<a href="" class="ml-4 text-[#ce4164]">Ver más</a></p>
                <span class="bg-[#ce4164] text-white px-3 py-1 mt-1 inline-block rounded-lg">${animeName}</span>
                <span class="bg-[#ce4164] text-white px-3 py-1 mt-1 inline-block rounded-lg">${experience == "Sin experiencia" ? "Sin experiencia" : (experience.slice(1,2) +"+ años")}</span>
                <span class="bg-[#ce4164] text-white px-3 py-1 mt-1 inline-block rounded-lg">${location}</span>
                <span class="bg-[#ce4164] text-white px-3 py-1 mt-1 inline-block rounded-lg">Solicitudes: ${applications}</span>
                <button class="bg-[#b7325e] text-white font-semibold w-full mt-3 py-3 rounded-lg" data-id="${id}" onclick="seeMore('${id}')">Ver más</button>
            </div>
            `
            counter += 1
        }
    }
}

// function for show general jobs

const printJobs = (jobs) => {
        generalContainer.innerHTML = ""
        let counter = 0;
        for (const { name, description, location, experience, salary, publicationDate, image, anime, page, applications, id } of jobs){
            if (counter < 8) {
                if(anime.length > 20){
                    animeName = `${anime.slice(0,20)}...`
                }else{
                    animeName = anime
                }
    
                generalContainer.innerHTML += `
                <div class="w-[350px] bg-white p-3">
                    <div class="bg-[url('${image}')] bg-cover bg-center bg-no-repeat w-full h-52 mb-7"></div>
                    <h2 class="mb-1 text-2xl">${name}</h2>
                    <h3 class="mb-4">Publicado el: ${publicationDate}</h3>
                    <p class="mb-4">${description.slice(0,150)}...<a href="" class="ml-4 text-[#ce4164]">Ver más</a></p>
                    <span class="bg-[#ce4164] text-white px-3 py-1 mt-1 inline-block rounded-lg">${animeName}</span>
                    <span class="bg-[#ce4164] text-white px-3 py-1 mt-1 inline-block rounded-lg">${experience}</span>
                    <span class="bg-[#ce4164] text-white px-3 py-1 mt-1 inline-block rounded-lg">${location}</span>
                    <span class="bg-[#ce4164] text-white px-3 py-1 mt-1 inline-block rounded-lg">Solicitudes: ${applications}</span>
                    <button class="bg-[#b7325e] text-white font-semibold w-full mt-3 py-3 rounded-lg" data-id="${id}" onclick="seeMore('${id}')">Ver más</button>
                </div>
                `
                counter += 1
            }
        }
    
}

// function to generate select with anime name 

const animeList = (array) => {
    for (const serie of array) {
        if(animeNameSelect.indexOf(serie.anime) == -1) {
            animeNameSelect.push(serie.anime);
        }
    }
    for (const anime of animeNameSelect) {
        if(anime.length > 20) {
            $("#serie").innerHTML += `<option value="${anime.slice(0,15)}">${anime.slice(0,15)}...</option>`
        }else{
            $("#serie").innerHTML += `<option value="${anime}">${anime}</option>`
        }
    }
}

// function to generate select with genre

const genreList = (array) => {
    for (const serie of array) {
        if(genreSelect.indexOf(serie.genre) == -1) {
            genreSelect.push(serie.genre);
        }
    }
    for (const genre of genreSelect) {
        $("#genre").innerHTML += `<option value="${genre}">${genre}</option>`
    }
}

// function to generate select with location

const locationList = (array) => {
    for (const serie of array) {
        if(localionSelect.indexOf(serie.location) == -1) {
            localionSelect.push(serie.location);
        }
    }
    for (const location of localionSelect) {
        $("#location").innerHTML += `<option value="${location}">${location}</option>`
    }
}

// function for see more

let isEdit = false

const seeMore = (numId) => {
    fetch(`${URL_BASE}${numId}`)
        .then(response => response.json())
        .then(data => {
            if(isEdit){
                editButton(data)
                isEdit = false
            }else{
                removeClass($("#contSpinner"), "hidden")
                setTimeout(() => {
                    printDetails(data)
                    addClass($("#contSpinner"), "hidden")
                },2000)
                
            }
        })
        .catch(err => console.log(err))
}

const printDetails = (jobs) => {
    isEdit = true;
    addClass($("#highlights"), "hidden")
    addClass($("#billboard"), "hidden")
    addClass($("#jobs"), "hidden")
    addClass($("#editJob"), "hidden")
    removeClass($("#details"), "hidden")
    const { name, description, location, experience, salary, publicationDate, image, anime, page, applications, id } = jobs

    $("#details").innerHTML = `
        <div class="w-3/5 bg-white p-10 flex border-2">
                <div class="bg-[url('${image}')] bg-cover bg-center bg-no-repeat w-3/5 h-96 mb-7 rounded-lg mr-5"></div>
                <div class="w-2/5 text-[#3a020d]">
                    <h2 class="mb-1 text-3xl font-bold">${name}</h2>
                    <h3 class="mb-4 text-xl">Publicado el: ${publicationDate}</h3>
                    <p>Serie: ${anime}</p>
                    <p class="mb-4 text-2xl">${description}</p>
                    <h4 class="mb-4 text-xl">Requisitos:</h4>
                    <p>Años de experiencia requeridos: ${experience}</p>
                    <p>Ubicación: ${location}</p>
                    <p>Solicitudes: ${applications}</p>
                    <div class="flex justify-end mt-5">
                        <button class="bg-[#ffe4ed] py-2 px-3 mr-3 text-xl rounded-lg font-semibold" onclick="edit('${id}')">Editar</button>
                        <button class="bg-[#ce4164] py-2 px-3 text-xl text-white rounded-lg font-semibold" onclick="btnDelete('${id}')">Eliminar</button>
                    </div>
                </div>
            </div>
`
}

const edit = (id) => {
    isEdit = true
    
    seeMore(id)
}

// Edit functionality

const editButton = (data) => {
    
    addClass($("#details"), "hidden")
    removeClass($("#editJob"), "hidden")
    console.log(data, "data" );
    addValue($("#nameJobEdit"), data.name)
    addValue($("#serieEdit"), data.anime)
    addValue($("#salaryEdit"), data.salary)
    addValue($("#locationJobEdit"), data.location)
    addValue($("#imageJobEdit"), data.image)
    addValue($("#experienceJobEdit"), data.experience)
    addValue($("#descriptionJobEdit"), data.description)
    
    $("#btnSaveEdit").addEventListener("submit", (e) => {
        e.preventDefault()
        editJob(data.id, getNewValues())
        return
    })
}

const editJob = (id, data) => {

    fetch(`${URL_BASE}${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'Application/json'
        },
        body: JSON.stringify(data)
    })
    .finally(() => window.location.href = "index.html")
}

const getNewValues = () => {
    return {
        name: $("#nameJobEdit").value,
        anime: $("#serieEdit").value,
        salary: $("#salaryEdit").value,
        location:$("#locationJobEdit").value,
        image: $("#imageJobEdit").value,
        experience: $("#experienceJobEdit").value,
        description: $("#descriptionJobEdit").value
    }
}

// Delete functionality

const btnDelete = (id) => {
    removeClass($("#cancel"), "hidden")
    $("#btnConfirmDelete").addEventListener("click", () => {
        fetch(`${URL_BASE}${id}`, {
        method: 'DELETE'
        })
        .finally(() => window.location.href = "index.html")
        addClass($("#cancel"), "hidden")
    })
    $("#btnCancel").addEventListener("click", () => {
        window.location.href = "index.html"
        addClass($("#cancel"), "hidden")
    })
    
}

// Add new job

const addJob = () => {
        fetch(`${URL_BASE}`, {
        method: "POST",
        headers:{
            'Content-Type': 'Application/json'
        },
        body: JSON.stringify(addNewJob())
        })
        .finally(() => window.location.href = "index.html")
    $("#formNewJob").reset()
}

const addNewJob = () => {
    return {
        name: $("#nameJob").value,
        anime: $("#newSerie").value,
        salary: $("#salary").value,
        publicationDate: `${month}/${day}/${year}`,
        location:$("#locationJob").value,
        image: $("#imageJob").value,
        experience: $("#experienceJob").value,
        description: $("#descriptionJob").value
    }
}


// *********************************** Events ***********************************

$("#btnHome").addEventListener("click", () => {
    window.location.href = "index.html"
})

$("#logo").addEventListener("click", () => {
    window.location.href = "index.html"
})

$("#btnNewJob").addEventListener("click", () => {
    addClass($("#highlights"), "hidden")
    addClass($("#billboard"), "hidden")
    addClass($("#jobs"), "hidden")
    removeClass($("#newJob"), "hidden")
    $("#formNewJob").reset()
})

mostRequested.addEventListener('click', () => {
    listJobs(changeHighlights("most", [...dataJobs]))
    removeClass(mostRequested, "bg-[#b7325e]")
    addClass(mostRequested, "bg-[#ce4164]")
    removeClass(lastAdditions, "bg-[#ce4164]")
    addClass(lastAdditions, "bg-[#b7325e]")
    removeClass(lessRequested, "bg-[#ce4164]")
    addClass(lessRequested, "bg-[#b7325e]")
})

lessRequested.addEventListener('click',() => {
    listJobs(changeHighlights("less", [...dataJobs]))
    removeClass(mostRequested, "bg-[#ce4164]")
    addClass(mostRequested, "bg-[#b7325e]")
    removeClass(lastAdditions, "bg-[#ce4164]")
    addClass(lastAdditions, "bg-[#b7325e]")
    removeClass(lessRequested, "bg-[#b7325e]")
    addClass(lessRequested, "bg-[#ce4164]")
})

lastAdditions.addEventListener('click',() => {
    listJobs(changeHighlights("recent", [...dataJobs]))
    removeClass(mostRequested, "bg-[#ce4164]")
    addClass(mostRequested, "bg-[#b7325e]")
    removeClass(lastAdditions, "bg-[#b7325e]")
    addClass(lastAdditions, "bg-[#ce4164]")
    removeClass(lessRequested, "bg-[#ce4164]")
    addClass(lessRequested, "bg-[#b7325e]")
})

// filter events

$("#location").addEventListener("change", (e) => {
    filterFor("location", e.target.value)
    $("#experience").value = ""
    $("#serie").value = ""
    $("#genre").value = ""
})
$("#experience").addEventListener("change", (e) => {
    filterFor("experience", e.target.value)
    $("#location").value = ""
    $("#serie").value = ""
    $("#genre").value = ""
})
$("#serie").addEventListener("change", (e) => {
    filterFor("anime", e.target.value)
    $("#location").value = ""
    $("#experience").value = ""
    $("#genre").value = ""
})
$("#genre").addEventListener("change", (e) => {
    filterFor("genre", e.target.value)
    $("#location").value = ""
    $("#experience").value = ""
    $("#serie").value = ""
})

$("#reset").addEventListener("click", (e) => {
    removeClass($("#contSpinner"), "hidden")
    setTimeout(() => {
        printJobs(dataJobs)
        addClass($("#contSpinner"), "hidden")
    },2000)
})

$("#submitJob").addEventListener("click",(e) =>{
    e.preventDefault()
    addJob()
})

// console.log(new Date(1669402798).toLocaleDateString());
