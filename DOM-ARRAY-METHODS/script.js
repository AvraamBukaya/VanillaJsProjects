
//Grad all the necessary elemetns via DOM -document object model

const main = document.getElementById('main');
const addUserBtn = document.getElementById('add-user');
const doubleBtn = document.getElementById('double');
const showMillionairesBtn = document.getElementById('show-millionaires');
const sortBtn = document.getElementById('sort');
const calculateWelthBtn = document.getElementById('calculate-wealth');

// initialize Array of objects which conatin all the people

let data = []; 

getRandomUser();
getRandomUser();
getRandomUser();



// Fetch random user and add money

async function getRandomUser(){
    const res= await fetch('https://randomuser.me/api');

    const data = await res.json();

    const user = await data.results[0];

    const newUser = {
        name:`${user.name.first} ${user.name.last}`,
        money:Math.floor(Math.random()* 1000000)
    };

    addData(newUser);
}

//Double everyones money

function doubleMoney(){
    data = data.map( user => {
        return {...user, money: user.money *2};
    }) ;       
    
    updateDOM();
}

//Sort By Money 

function sortByRichest(){

    data = data.sort((a, b)=> b.money-a.money);

    updateDOM();
}
//Filter only millionaires 

function showMillionaires(){
    data = data.filter( item => {return item.money >=1000000 } );

    updateDOM();
}

//Calculate The total wealth 

function calculateWealth(){

    const wealth = data.reduce((acc, user)=> (acc+=user.money), 0);

    const wealthEl = document.createElement('div');
    wealthEl.innerHTML =`<h3> Total Wealth: <strong>${formatMoney(wealth)}</strong>`;
    main.appendChild(wealthEl);


}

//Add new user object to data arr
function addData(user){
    data.push(user);

    updateDOM();

}


//Update DOM

function updateDOM(providedData = data){
    //Clear The main div

    main.innerHTML = '<h2><strong>Person</strong>Wealth</h2>';


    providedData.forEach(item =>{
        const element = document.createElement('div');
        element.classList.add('person');
        element.innerHTML = `<strong>${item.name}</strong> ${formatMoney(item.money)}`;
        main.appendChild(element);

    });

}

//Format number as money 

function formatMoney(number){

        return '$'+number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');

}

//Event listeners

//AddUser Event

addUserBtn.addEventListener('click', getRandomUser);

//Double Money Event

doubleBtn.addEventListener('click', doubleMoney);


//Sort Event

sortBtn.addEventListener('click', sortByRichest);

//Show Millionaires Event

showMillionairesBtn.addEventListener('click', showMillionaires);

//Calculate Wealth 

calculateWelthBtn.addEventListener('click', calculateWealth);