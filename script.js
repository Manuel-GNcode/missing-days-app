"user stric";
const inputText = document.querySelector(".app__name");
const inputDate = document.querySelector(".app__date");
const btnCreateEvent = document.querySelector(".app__btn");
const resultEvents = document.querySelector(".app__events");
let btnDelete = document.querySelectorAll(".delete");

let groupEvents = [];

const resetInputs = ()=>{
    inputText.value = "";
    inputDate.value = "";
}

const untilDays = (arr)=>{
    const mls = 1000*60*60*24;
    let newArr = arr.split("-").map(i=>Number(i));
    const newDate = new Date();
    newDate.setFullYear(newArr[0]);
    newDate.setMonth(newArr[1]-1);
    newDate.setDate(newArr[2]);
    return (newDate.getTime() - (new Date().getTime()))/mls;
}

const renderData = (arrEvents)=>{
    resultEvents.innerHTML = "";
    for (let event of arrEvents) {
        resultEvents.innerHTML += `
        <div class="event" id="${event.id}">
            <span class="days">${event.days} D</span>
            <p class="name-event">${event.name}</p>
            <button class="delete"><svg pointer-events="none" width="30px" height="30px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#000" stroke-width="1.5"><path pointer-events="none" d="M20 9L18.005 20.3463C17.8369 21.3026 17.0062 22 16.0353 22H7.96474C6.99379 22 6.1631 21.3026 5.99496 20.3463L4 9" fill="#3d0000"></path><path pointer-events="none" d="M20 9L18.005 20.3463C17.8369 21.3026 17.0062 22 16.0353 22H7.96474C6.99379 22 6.1631 21.3026 5.99496 20.3463L4 9H20Z" stroke="#3d0000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M21 6H15.375M3 6H8.625M8.625 6V4C8.625 2.89543 9.52043 2 10.625 2H13.375C14.4796 2 15.375 2.89543 15.375 4V6M8.625 6H15.375" stroke="#3d0000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg></button>
        </div>
        `
    }
}

const addDeleteToEvent = ()=>{
    btnDelete = document.querySelectorAll(".delete");
    btnDelete.forEach(btn=>{
        btn.addEventListener("click", deleteEvent);
    });
}

const createEvent = (name, days)=>{
    const id = Math.floor(Math.random()*1000+100);
    const newEvent = {id, name,days};
    groupEvents.push(newEvent);
    localStorage.setItem(id,JSON.stringify(newEvent));
    renderData(groupEvents);
}

const deleteEvent = (e)=>{
    const currentEventId = e.target.parentElement.id;
    groupEvents = groupEvents.filter(event=>event.id != currentEventId);
    localStorage.removeItem(currentEventId);
    renderData(groupEvents);
    addDeleteToEvent();
}
window.addEventListener("load",e=>{
    if (localStorage.length > 0) {
        for (let i = 0; i<localStorage.length;i++) {
            const key = localStorage.key(i);
            const eventLs = localStorage.getItem(key);
            groupEvents.push(JSON.parse(eventLs));
            renderData(groupEvents);
            addDeleteToEvent();
        }
    } else {
        console.log("No hay datos para cargar")
    }
})
btnCreateEvent.addEventListener("click", e => {
    e.preventDefault();
    const eventName = inputText.value.trim();
    const eventDate = inputDate.value;
    resetInputs()
    const days = untilDays(eventDate);
    if (days < 1 || !eventDate) {
        alert("Put a valid Date");
    } else {
        createEvent(eventName, days)
        addDeleteToEvent();
    }
})


