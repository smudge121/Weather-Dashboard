var APIkey = '9d63bca39552839c3c79e05256a07216';
var getGeo = 'http://api.openweathermap.org/geo/1.0/direct?q=CITY&limit=5&appid=' + APIkey;
var getWeather = 'http://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&units=imperial&appid=' + APIkey;


var inputButton = document.querySelector('#inputButton');
var inputText = document.querySelector('input');
var searchHistory = document.querySelector('#searchHistory');
var mainContainer = document.querySelector('#main');

var cities = JSON.parse(localStorage.getItem('cities')) || [];

for (var i = 0; i < cities.length; i++)
{
    AddToHistory(cities[i]);
}

inputButton.addEventListener('click', function(event){
    event.target.blur();

    fetch(getGeo.replace('CITY', inputText.value)).then(function(response){
        return response.json();
    }).then(function(data){
        console.log(data);
        cities.push(data[0].name);
        AddToHistory(data[0].name);
        localStorage.setItem('cities',JSON.stringify(cities));

        var loc = getWeather.replace('{lat}', data[0].lat);
        GetWeather(loc.replace('{lon}', data[0].lon));
    });
})

function GetWeather(url)
{
    fetch(url).then(function(response){
        return response.json();
    }).then(function(data){
        console.log(data);
        
        GenerateToday(data.city.name, data.list);
    });
}

function AddToHistory(cityName){
    inputText.value = '';
    var hist = document.createElement('button');
    hist.setAttribute('class', 'btn btn-secondary col-12 mb-1');
    hist.textContent = cityName;

    hist.addEventListener('click', function(event){
        event.target.blur();
        fetch(getGeo.replace('CITY', cityName)).then(function(response){
            return response.json();
        }).then(function(data){

            var loc = getWeather.replace('{lat}', data[0].lat);
            GetWeather(loc.replace('{lon}', data[0].lon));
        });
    });

    searchHistory.appendChild(hist);
}

function GenerateToday(cityName, weather)
{
    mainContainer.innerHTML = '';

    var nameText = document.createElement('h2');
    nameText.textContent = cityName;
    mainContainer.appendChild(nameText);

    var tempText = document.createElement('p');
    tempText.textContent = 'Temperature: ' + weather[0].main.temp + ' °F';
    mainContainer.appendChild(tempText);

    var windText = document.createElement('p');
    windText.textContent = 'Wind: ' + weather[0].wind.speed + ' mph';
    mainContainer.appendChild(windText);

    var humText = document.createElement('p');
    humText.textContent = 'Humidity: ' + weather[0].main.humidity + '%';
    mainContainer.appendChild(humText);
}

