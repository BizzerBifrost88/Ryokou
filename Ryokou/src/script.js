// JavaScript for Weather Forecast Form

const fs = require('fs');
const path = require('path');

async function getWeather() {
    const city = document.getElementById('city').value;
    if (!city) {
        alert('Please enter a city name');
        return;
    }
    const apiKey = '32804b24a847407391c53709241010';
    const url = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('City not found');
        }
        const data = await response.json();
        const region = data.location.region;
        const country = data.location.country;
        const localTime = data.location.localtime;
        const temperature = data.current.temp_c;
        const feelsLike = data.current.feelslike_c;
        const condition = data.current.condition.text;
        const icon = data.current.condition.icon.startsWith('//') ? 'https:' + data.current.condition.icon : data.current.condition.icon;
        const windSpeed = data.current.wind_kph;
        const humidity = data.current.humidity;
        const sunrise = data.forecast.forecastday[0].astro.sunrise;
        const sunset = data.forecast.forecastday[0].astro.sunset;
        const maxTemp = data.forecast.forecastday[0].day.maxtemp_c;
        const minTemp = data.forecast.forecastday[0].day.mintemp_c;
        let outfitSuggestion = '';

        if (condition.toLowerCase().includes('rain')) {
            outfitSuggestion = 'Bring an umbrella and wear a raincoat.';
            otherSuggestion = "Make sure you don't stay outside for a long time to avoid cold";
            itenary = "Today's activities: Morning = Shopping in Mall, Afternoon = Trampoline Park, Evening = Cinema, Night = Indoor Restourant Dinner";
        } else if (temperature > 30) {
            outfitSuggestion = 'Wear light and comfortable clothes.';
            otherSuggestion = "Make sure you don't stay outside for a long time to avoid fever or heat stroke";
            itenary = "Today's activities: Morning = Hiking, Afternoon = Botanical Garden, Evening = Waterpark, Night = River cruise"
        } else if (temperature < 15) {
            outfitSuggestion = 'Wear warm clothes to stay comfortable.';
            otherSuggestion = "Make sure you don't stay outside for a long time to avoid hypothermia";
            itenary = "Today's activities: Morning = Brisk walk, Afternoon = Photograph at park, Evening = Ice skating, Night = Hot spring"
        } else {
            outfitSuggestion = 'A casual outfit should be fine.';
            otherSuggestion = "Enjoy your day while it lasts";
            itenary = "Today's activities: Morning = Jogging, Afternoon = Park, Evening = Nippon Sushi, Night = Night market"
        }

        document.getElementById('weatherResult').innerHTML = `
            <h3>Weather in ${city}, ${region}, ${country}</h3>
            <p>Local Time: ${localTime}</p>
            <p>Temperature: ${temperature}&deg;C</p>
            <p>Feels Like Temperature: ${feelsLike}&deg;C</p>
            <p>Condition: ${condition} <img src="${icon}" alt="Weather Icon"></p>
            <p>Maximum Temperature: ${maxTemp}&deg;C</p>
            <p>Mininimum Temperature: ${minTemp}&deg;C</p>
            <p>Sunrise: ${sunrise}</p>
            <p>Sunset: ${sunset}</p>
            <p>Wind Speed: ${windSpeed} kph</p>
            <p>Humidity: ${humidity}%</p>
            <p>Outfit Suggestion: ${outfitSuggestion}</p>
            <p>Other Suggestion: ${otherSuggestion}</p>
            <p>Itenary Suggestion: ${itenary}</p>
        `;

        document.getElementById('saveBox').style.display = 'block';
    } catch (error) {
        document.getElementById('weatherResult').innerHTML = `<p style="color: red;">Error: ${error.message}</p>`;
        document.getElementById('saveBox').style.display = 'none';
    }
}

function saveWeatherData() {
    const city = document.getElementById('city').value;
    const region = document.getElementById('weatherResult').querySelector('h3').innerText.split(', ')[1];
    const country = document.getElementById('weatherResult').querySelector('h3').innerText.split(', ')[2];
    const weatherData = document.getElementById('weatherResult').innerText;

    // Define the path to save the file
    const pathName = path.join(__dirname, 'files');
    if (!fs.existsSync(pathName)) {
        fs.mkdirSync(pathName);
    }

    const filePath = path.join(pathName, `${city} ${country}.txt`);

    fs.writeFile(filePath, weatherData, function (err) {
        if (err) {
            alert('Error: ' + err.message);
            return;
        }
        alert('Weather information saved successfully');
    });
}

function readWeatherData() {
    const fileName = document.getElementById('fileName').value;
    if (!fileName) {
        alert('Please enter a file name');
        return;
    }

    const pathName = path.join(__dirname, 'files');
    const filePath = path.join(pathName, `${fileName}.txt`);

    fs.readFile(filePath, 'utf-8', function (err, data) {
        if (err) {
            alert('Error: ' + err.message);
            return;
        }
        document.getElementById('readResult').innerHTML = `
            <textarea id="fileContent">${data}</textarea>
            <button onclick="saveEditedData('${fileName}')">Save</button>
            <button onclick="deleteWeatherData('${fileName}')">Delete</button>
        `;
    });
}

function saveEditedData(fileName) {
    const newData = document.getElementById('fileContent').value;
    const pathName = path.join(__dirname, 'files');
    const filePath = path.join(pathName, `${fileName}.txt`);

    fs.writeFile(filePath, newData, function (err) {
        if (err) {
            alert('Error: ' + err.message);
            return;
        }
        alert('File saved successfully');
    });
}

function deleteWeatherData(fileName) {
    const pathName = path.join(__dirname, 'files');
    const filePath = path.join(pathName, `${fileName}.txt`);

    fs.unlink(filePath, function (err) {
        if (err) {
            alert('Error: ' + err.message);
            return;
        }
        alert('File deleted successfully');
        document.getElementById('readResult').innerHTML = '';
    });
}





