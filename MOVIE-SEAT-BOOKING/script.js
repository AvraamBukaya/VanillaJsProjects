const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)'); 
const count = document.getElementById('count'); 
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');

populateUI();

let ticketPrice = +movieSelect.value; 
//save selected movie index & price
function setMovieData(movieIndex, moviePrice){
    localStorage.setItem('selectedMovieIndex', movieIndex);
    localStorage.setItem('selectedMoviePrice',moviePrice);
}


/*
How to press seat on the screen and the color is changed
There are two ways for doin this:

1.To loop through all the seats and add to each one a event listener (seats.forEach())
2.To add event listener to the roo element 
*/

//Update total and count
function updatedSelectedCount(){
    const selectedSeats = document.querySelectorAll('.row .seat.selected');
    const selectedSeatsCount = selectedSeats.length;
    
    //Copy selected seats into arr
    //Map through array 
    //return a new array indexes 
    const seatsIndex =[...selectedSeats].map(seat => [...seats].indexOf(seat));

    console.log(seatsIndex);

    localStorage.setItem('selectedSeats',JSON.stringify(seatsIndex));
    console.log(localStorage,location.pathname);

    count.innerHTML = selectedSeatsCount;
    total.innerHTML = selectedSeatsCount * ticketPrice;

}


//Get data from localStorage and populate it to UI

function populateUI(){
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));

    if(selectedSeats !== null && selectedSeats.length>0){
        seats.forEach((seat, index) => {
            if(selectedSeats.indexOf(index) > -1){
                seat.classList.add('selected');
            }
        });
    }

    const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');
    
    if(selectedMovieIndex !== null ){
        movieSelect.selectedIndex = selectedMovieIndex;
    }


}


//Movie select event
movieSelect.addEventListener('change',e=>{
    ticketPrice = + e.target.value;
    //e.target.selectedIndex- give us the index og the movie we choose
    //e.target.value- give us the value of the element 
    setMovieData(e.target.selectedIndex, e.target.value);
    updatedSelectedCount();
});

//Seat click event 
container.addEventListener('click', e=>{
    //e.target let us to get info about the elemnt we press - we press on the title and then <title></title>
    if (e.target.classList.contains('seat') && !e.target.classList.contains('occupied')){
        e.target.classList.toggle('selected');
    
        updatedSelectedCount();
    }
});

//Initial count and total set 
updatedSelectedCount();


