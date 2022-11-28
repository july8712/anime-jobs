const $ = (selector) => document.querySelector(selector)
const $$ = (selector) => document.querySelectorAll(selector)

let counter = 0

const showData = () => {
    fetch("https://6380fa6a8efcfcedac14a09f.mockapi.io/jobs")
        .then(response => response.json())
        .then(data => listJobs(data))
}

showData()

const listJobs = (jobs) => {
    for (const { name, description, location, seniority, salary, publicationDate, image, anime, page, applications, id } of jobs){
        if (counter < 4) {
            $("#containerHighlights").innerHTML += `
            <div class="w-[250px] bg-white p-3">
                <div class="bg-[url('${image}')] bg-cover bg-center bg-no-repeat w-full h-[200px] mb-7"></div>
                <h2 class="mb-1 text-2xl">${name}</h2>
                <h3 class="mb-4">Publicado el: ${publicationDate}</h3>
                <p class="mb-4">${description}</p>
                <span class="bg-[#ce4164] text-white px-3 py-1 mt-1 inline-block rounded-lg">${anime}</span>
                <span class="bg-[#ce4164] text-white px-3 py-1 mt-1 inline-block rounded-lg">${seniority}</span>
                <span class="bg-[#ce4164] text-white px-3 py-1 mt-1 inline-block rounded-lg">${location}</span>
                <span class="bg-[#ce4164] text-white px-3 py-1 mt-1 inline-block rounded-lg">Solicitudes: ${applications}</span>
            </div>
            `
            counter += 1
        }
        console.log(image);
    }
}

console.log(new Date(1669402798).toLocaleDateString());

// const listUsers = (users) => {
//     for (const { id, name, age, email } of users) {
//         $("#container-cards").innerHTML += `
//             <div class="card ${age > 25 ? "bg-secondary" : "bg-warning"}" style="width: 18rem;">
//                 <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUrwXhr_qsBUVpDOaVcmfwmY94l8UYSCnEdOmS3HwzPz7igarTyNZFC0MC0ccWQXtVqMw&usqp=CAU" class="card-img-top">
//                 <div class="card-body">
//                     <h5 class="card-title">${name}</h5>
//                     <p class="card-text">Age: ${age}.</p>
//                     <p class="card-text">Email: ${email}.</p>
//                     <a href="#" class="btn btn-primary btn-detail" data-id="${id}">Details</a>
//                     <a href="#" class="btn btn-success btn-edit" data-id="${id}">Edit</a>
//                     <a href="#" class="btn btn-danger btn-delete" data-id="${id}">Delete</a>
//                 </div>
//             </div>
//         `
//     }