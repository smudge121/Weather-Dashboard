var APIkey = '9d63bca39552839c3c79e05256a07216';
var getWeather = "https://api.openweathermap.org/data/2.5/forecast?q=CITY&limit=32&units=imperial&appid=" + APIkey;
var getGeo = 'http://api.openweathermap.org/geo/1.0/direct?q=CITY&limit=5&appid=' + APIkey;
var getWLat = 'http://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&units=imperial&appid=' + APIkey;


var inputButton = document.querySelector('button')
var inputText = document.querySelector('input')

inputButton.addEventListener('click', function(event){
    //console.log(getGeo.replace('CITY', inputText.value));

    fetch(getGeo.replace('CITY', inputText.value)).then(function(response){
        return response.json();
    }).then(function(data){
        console.log(data);

        var loc = getWLat.replace('{lat}', data[0].lat);
        console.log(loc);
        GetWeather(loc.replace('{lon}', data[0].lon));
    });
})

function GetWeather(url)
{
    console.log(url);
    fetch(url).then(function(response){
        return response.json();
    }).then(function(data){
        console.log(data);
    });
}
