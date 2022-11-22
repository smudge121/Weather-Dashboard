var APIkey = '9d63bca39552839c3c79e05256a07216';
var getGeo = 'http://api.openweathermap.org/geo/1.0/direct?q=CITY&limit=5&appid=' + APIkey;
var getWeather = 'http://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&units=imperial&appid=' + APIkey;


var inputButton = document.querySelector('#inputButton');
var inputText = document.querySelector('input');
var searchHistory = document.querySelector('#searchHistory');

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
            console.log(data);
    
            var loc = getWeather.replace('{lat}', data[0].lat);
            GetWeather(loc.replace('{lon}', data[0].lon));
        });
    });

    searchHistory.appendChild(hist);

}

