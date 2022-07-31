// Write your helper functions here!
require('isomorphic-fetch');


function addDestinationInfo(document, name, diameter, star, distance, moons, imageUrl) {
    // Here is the HTML formatting for our mission target div.
    //             <h2>Mission Destination</h2>
    //             <ol>
    //                 <li>Name: </li>
    //                 <li>Diameter: </li>
    //                 <li>Star: ${star}</li>
    //                 <li>Distance from Earth: </li>
    //                 <li>Number of Moons: </li>
    //    fetch("https://handlers.education.launchcode.org/static/planets.json").then(function (response) {
    //    response.json().then(function (json) {
         const missionTarget = document.getElementById("missionTarget");
    
                     missionTarget.innerHTML += `
                         <div>
                             <ol>        
                                 <li>Name: ${name}</li>
                                 <li>Diameter: ${diameter}</li>
                                 <li>Star: ${star}</li>
                                 <li>Distance: ${distance}</li>
                                 <li>Moons: ${moons}</li>
                             </ol>
                             <img src=${imageUrl}></img>
                         </div>
                                 `;
    
    };



function validateInput() {
document.addEventListener("submit", function (event) {
    //prevent the page from reloading when the submit button is pressed.
    event.preventDefault();

            const pilotName = document.querySelector("[name=pilotName]").value;
            const copilotName = document.querySelector("[name=copilotName]").value;
            const fuelLevel = document.querySelector("[name=fuelLevel]").value;
            const cargoMass = document.querySelector("[name=cargoMass]").value;
            //initializing variable to be used later to check if any alerts need to be made.
                    let emptyFields = "";
                        let nonAlpha = "";
                            let nonNumeric = "";

                            //checks that all four fields are not empty. if any one of them are empty user will be alerted using the variable emptyFields.
                    if (!pilotName || !copilotName || !fuelLevel || !cargoMass) {
                    emptyFields = "All fields must be filled in.\n";
                    }
//match() method checks if any of the following are found in the given variable
//more clear and direct than using  'isNaN() === false'
// /[0-9]/g searches for any number 0 to 9 within pilotName globally
                    if (pilotName.match(/[0-9]/g) != null || copilotName.match(/[0-9]/g) != null) {
                    nonAlpha = "Pilots names must be alpha characters.\n";
                    }
            //checks that both fuelLevel and cargoMass are numbers. If not, user will be alerted using the variable nonNumeric.
                    if (isNaN(fuelLevel) || isNaN(cargoMass)) {
                    nonNumeric = "Fuel levels and Cargo mass must be numeric.\n";
                    }
            //checks if the initialized variables have been filled by the prior if-statements. Alerts the user, presenting all variables that were filled.
                    if (emptyFields || nonAlpha || nonNumeric) {
                    let errorMessage = `${emptyFields}${nonAlpha}${nonNumeric}`;
                    alert(errorMessage);
                    }
//if all inputs are valid, run formSubmission().
                    else { formSubmission(event, pilotName, copilotName, fuelLevel, cargoMass); }

 });
};



function formSubmission (document, pilot, copilot, fuelLevel, cargoMass) {

    launchStatus.innerHTML += `
        <div>
            <ol>
            `
            //takes in the pilot and Copilot input and updates the html as pilot and copilot ready.
                pilotStatus.innerHTML = `Pilot ${pilot} Ready`
                copilotStatus.innerHTML = `CoPilot ${copilot} Ready`;
//updates the html of fuelLevel, CargoMass, and launchStatus as ready IF they're inputted values are above or equal to 1000.
//updates the css to show the list of pilot, copilot, fuelLevel, and cargoMass.
//updates the css to change lauchStatus color to green if inputted values are above or equal to 1000.
                if (fuelLevel >= 10000) {
                    faultyItems.style.visibility = 'visible';
                    launchStatus.innerHTML = `Shuttle is ready for launch`;
                    launchStatus.style.color = `green`;
                     fuelStatus.innerHTML = `Fuel level high enough for launch`;
       
                }
                if (cargoMass <= 10000) {
                    faultyItems.style.visibility = 'visible';
                        launchStatus.innerHTML = `Shuttle is ready for launch`;
                        launchStatus.style.color = `green`;
                        cargoStatus.innerHTML = `Cargo mass low enough for launch`;
       
                }    
//upates the html of fuelLevel, cargoMass, and launchStatus as not ready IF the inputted values are below 1000.
//updates the css to change launchStatus color to red if inputted values are below 1000.
                if (fuelLevel <= 10000){
                    faultyItems.style.visibility = 'visible';
                    launchStatus.innerHTML = `Shuttle not ready for launch`;
                    launchStatus.style.color = `red`;
                    fuelStatus.innerHTML = `Fuel level too low for launch`;
                }
                if (cargoMass >= 10000) {
                    faultyItems.style.visibility = 'visible';
                    launchStatus.innerHTML = `Shuttle not ready for launch`;
                    launchStatus.style.color = `red`;
                    cargoStatus.innerHTML = `Cargo mass over capacity for launch`;
                }                                                     
                `
                </ol>
            </div>
        `; 
                        
};



async function myFetch() {
let planetsReturned;

await fetch("https://handlers.education.launchcode.org/static/planets.json").then( function(response) {response.json().then(function (planetsReturned) {

    return planetsReturned;
    });

});


};

function pickPlanet () {
    window.addEventListener("load", () => {
        fetch("https://handlers.education.launchcode.org/static/planets.json").then(function (response) {
            response.json().then(function (planetaryData) {
                const missionTarget = document.getElementById("missionTarget");
                    let index = Math.floor(Math.random() * (planetaryData.length));
                        missionTarget.innerHTML += `
                            <div>                            
                                <h2>Mission Destination</h2>   
                                    <ol>        
                                        <li>Name:       ${planetaryData[index].name}</li>
                                        <li>Diameter:   ${planetaryData[index].diameter}</li>
                                        <li>Star:       ${planetaryData[index].star}</li>
                                        <li>Distance:   ${planetaryData[index].distance}</li>
                                        <li>Moons:      ${planetaryData[index].moons}</li>
                                    </ol>
                                    <img id="missionTarget img" src=${planetaryData[index].image}></img>
                                </div>
                            `;
            });
        });
    });
};




module.exports.addDestinationInfo = addDestinationInfo;
module.exports.validateInput = validateInput;
module.exports.formSubmission = formSubmission;
module.exports.pickPlanet = pickPlanet; 
module.exports.myFetch = myFetch;