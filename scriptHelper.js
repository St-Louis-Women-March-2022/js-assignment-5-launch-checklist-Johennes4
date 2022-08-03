// Write your helper functions here!
require("isomorphic-fetch");

//updates html of the missionTarget div with the given arguments
function addDestinationInfo(
  document,
  name,
  diameter,
  star,
  distance,
  moons,
  imageUrl
) {
  const missionTarget = document.getElementById("missionTarget");
  missionTarget.innerHTML = `
  <h2>Mission Destination</h2>
  <ol>
   <li>Name: ${name}</li>
   <li>Diameter: ${diameter}</li>
   <li>Star: ${star}</li>
   <li>Distance from Earth: ${distance}</li>
   <li>Number of Moons: ${moons}</li>
   </ol>
  <img src="${imageUrl}"/>
  `;
}

function validateInput(testInput) {
  if (testInput === "") {
    return "Empty";
  } else if (isNaN(testInput)) {
    return "Not a number";
  } else if (testInput.type === Number) {
    return "Is a number";
  }
}


//using the validataInput() fundtion, checks that values of pilot, copilot, fuelLevel, and CargoLevel are not empty, the appropriate data type
function formSubmission(
  document,
  list,
  pilotValue,
  copilotValue,
  fuelLevelValue,
  cargoLevelValue
) {
    //define variables to their values for easier use in the following if/elseif statements
  pilotInput = document.querySelector("input[name=pilotName]");
  pilotValue = pilotInput.value;
  copilotInput = document.querySelector("input[name=copilotName]");
  copilotValue = copilotInput.value;
  fuelLevelInput = document.querySelector("input[name=fuelLevel]");
  fuelLevelValue = fuelLevelInput.value;
  cargoLevelInput = document.querySelector("input[name=cargoMass]");
  cargoLevelValue = cargoLevelInput.value;
  list = document.getElementById("faultyItems");

  //if any of the 4 input-boxes are empty, alerts the user to fill all fields
  if (
    validateInput(pilotValue) === "Empty" ||
    validateInput(copilotValue) === "Empty" ||
    validateInput(fuelLevelValue) === "Empty" ||
    validateInput(cargoLevelValue) === "Empty"
  ) {
    alert("All fields are required!");

    //if the two values that are supposed to be numbers, are not only numbers, alerts the user to input numbers for these fields.
  } else if (
    validateInput(cargoLevelValue) === "Not a number" ||
    validateInput(fuelLevelValue) === "Not a number"
  ) {
    alert("You must enter a valid numerical input for these fields.");

    //if all values are of the correct data type, updates html with pilot and copilot values.
  } else {
    list.style.visibility = "visible";
    pilotStatus.innerHTML = `Pilot ${pilotValue} is ready for launch.`;
    copilotStatus.innerHTML = `Copilot ${copilotValue} is ready for launch`;
  }

  //if fuelLevels or cargolevels are below
  if (fuelLevelValue < 10000) {
    launchStatus.innerText = "Shuttle not ready for launch.";
    launchStatus.style.color = "red";
    fuelStatus.innerText = "Fuel status not high enough to launch.";
  } else if (cargoLevelValue > 10000) {
    launchStatus.innerText = "Shuttle not ready for launch.";
    launchStatus.style.color = "red";
    cargoStatus.innerText = "Cargo weight too much to launch.";
  } else {
    launchStatus.innerText = "Good to go!";
    launchStatus.style.color = "green";
  }
}

//fetches planetary data from the url, and returns that data as a variable
async function myFetch() {
  const planetsReturned = await fetch(
    "https://handlers.education.launchcode.org/static/planets.json"
  ).then(function (response) {
    return response.json();
  });
  return planetsReturned;
}

//chooses a random index number from the length of the given argument
function pickPlanet(planets) {
  let randomIndex = (Math.floor(Math.random()*planets.length));
  return planets[randomIndex];
}

module.exports.addDestinationInfo = addDestinationInfo;
module.exports.validateInput = validateInput;
module.exports.formSubmission = formSubmission;
module.exports.pickPlanet = pickPlanet;
module.exports.myFetch = myFetch;