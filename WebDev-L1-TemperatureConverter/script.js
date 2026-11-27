
const temperatureInput = document.getElementById("temperature");
const unitSelect = document.getElementById("unit");

const convertBtn = document.getElementById("convertBtn");
const clearBtn = document.getElementById("clearBtn");

const error = document.getElementById("error");

const celsiusResult = document.getElementById("celsius");
const fahrenheitResult = document.getElementById("fahrenheit");
const kelvinResult = document.getElementById("kelvin");

// Convert button
convertBtn.addEventListener("click", function () {

    const temperature = temperatureInput.value;
    const unit = unitSelect.value;

    error.textContent = "";

    // Check empty input
    if (temperature.trim() === "") {
        error.textContent = "Please enter a temperature.";
        clearResults();
        return;
    }

    const value = Number(temperature);

    // Check valid number
    if (!Number.isFinite(value)) {
        error.textContent = "Please enter a valid number.";
        clearResults();
        return;
    }

    let celsius;

    // Convert input into Celsius
    if (unit === "C") {
        celsius = value;
    } 
    else if (unit === "F") {
        celsius = (value - 32) * 5 / 9;
    } 
    else {
        celsius = value - 273.15;
    }

    // Check absolute zero
    if (celsius < -273.15) {
        error.textContent = "Temperature cannot be below absolute zero.";
        clearResults();
        return;
    }

    // Convert Celsius into all units
    const fahrenheit = (celsius * 9 / 5) + 32;
    const kelvin = celsius + 273.15;
saveHistory(
    value + " " + unit,
    celsius.toFixed(2) + " °C",
    fahrenheit.toFixed(2) + " °F",
    kelvin.toFixed(2) + " K"
);
    // Display results
    celsiusResult.textContent =
        "Celsius: " + celsius.toFixed(2) + " °C";

    fahrenheitResult.textContent =
        "Fahrenheit: " + fahrenheit.toFixed(2) + " °F";

    kelvinResult.textContent =
        "Kelvin: " + kelvin.toFixed(2) + " K";

});

// Clear function
clearBtn.addEventListener("click", function () {

    temperatureInput.value = "";
    unitSelect.value = "C";
    error.textContent = "";

    clearResults();

});

// Clear previous results
function clearResults() {

    celsiusResult.textContent = "Celsius: --";
    fahrenheitResult.textContent = "Fahrenheit: --";
    kelvinResult.textContent = "Kelvin: --";

}

// Get history elements
const historyList = document.getElementById("historyList");
const clearHistoryBtn = document.getElementById("clearHistoryBtn");

// Load saved history
let conversionHistory = JSON.parse(
    localStorage.getItem("temperatureHistory") || "[]"
);

// Display history
function displayHistory() {

    historyList.innerHTML = "";

    conversionHistory.forEach(function (record) {

        const li = document.createElement("li");

        li.textContent =
            record.input + " → " +
            record.celsius + " | " +
            record.fahrenheit + " | " +
            record.kelvin + " | " +
            record.date;

        historyList.appendChild(li);

    });

}

// Save conversion to history
function saveHistory(input, celsius, fahrenheit, kelvin) {

    const record = {
        input: input,
        celsius: celsius,
        fahrenheit: fahrenheit,
        kelvin: kelvin,
        date: new Date().toLocaleString()
    };

    conversionHistory.unshift(record);

    // Keep only the latest 10 records
    conversionHistory = conversionHistory.slice(0, 10);

    localStorage.setItem(
        "temperatureHistory",
        JSON.stringify(conversionHistory)
    );

    displayHistory();

}

// Clear saved history
clearHistoryBtn.addEventListener("click", function () {

    conversionHistory = [];

    localStorage.removeItem("temperatureHistory");

    displayHistory();

});

// Show history when page loads
displayHistory();
