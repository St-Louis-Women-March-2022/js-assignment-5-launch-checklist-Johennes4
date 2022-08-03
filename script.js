



            window.addEventListener("load", function () {
                let listedPlanets;
                //calls myFetch() to fetch/retrieve all of the planet data
                let listedPlanetsResponse = myFetch();
              
                listedPlanetsResponse
                  .then(function (result) {
                    listedPlanets = result;
                  })
                  .then(function () {
                    //calls pickPlanet() to select a planet at random from the myFetch() call. selected planet stored at a variable
                    let chosenPlanet = pickPlanet(listedPlanets);

                    //calls addDestinationInfo() using information from the pickPlanet() call to populate the Mission Destination HTML
                    addDestinationInfo(
                      document,
                      chosenPlanet.name,
                      chosenPlanet.diameter,
                      chosenPlanet.star,
                      chosenPlanet.distance,
                      chosenPlanet.moons,
                      chosenPlanet.image
                    );
                  });
              
                let form = document.querySelector("form");
                form.addEventListener("submit", function (event) {
                  event.preventDefault();
                  pilotInput = document.querySelector("input[name=pilotName]");
                  pilotValue = pilotInput.value;
                  copilotInput = document.querySelector("input[name=copilotName]");
                  copilotValue = copilotInput.value;
                  fuelLevelInput = document.querySelector("input[name=fuelLevel]");
                  fuelLevelValue = fuelLevelInput.value;
                  cargoLevelInput = document.querySelector("input[name=cargoMass]");
                  cargoLevelValue = cargoLevelInput.value;
              
                  let list = document.getElementById("faultyItems");
                  formSubmission(
                    document,
                    list,
                    pilotValue,
                    copilotValue,
                    fuelLevelValue,
                    cargoLevelValue
                  );
                });
              });