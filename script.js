
    let formInput = document.querySelector('#formInput')
    let input = document.querySelector('#city')
    let submit = document.querySelector('#submit')

    const API = process.env.API_KEY||'2a7fd29bded014af441ef6253c79fe2c'; // please don't miss use this key
    const w = document.querySelector('.weather'); 
    let latitude, longitude;
    let weather;

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
        console.log("Geolocation is not supported by this browser.");
    }

    // if u get the location access
    function showPosition(position) {
        latitude = position.coords.latitude;
        longitude = position.coords.longitude;
        console.log(`Latitude: ${latitude}`);
        console.log(`Longitude: ${longitude}`);
        makeApiCall()
        
    }
    // on Error
    function showError(error) {
        console.error("Error getting location:", error.message);
        w.innerHTML = "<p class='text-white'>Failed to get location. Please allow location access. or <p class='text-green-500'>search</p> for a place</p>";
    }

    // Get the weather Data
   async function makeApiCall(location){
    let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?${location ?`q=${location}` : `lat=${latitude}&lon=${longitude}`}&appid=${API}&units=metric`)
    weather = await response.json()
    if(weather.cod!==200){
        alert(weather.message)
    }
    console.log('called')
    console.log(weather)
    RenderData()
   }
    function RenderData(){
        if(!weather) return
        w.innerHTML = ` <div class=" text-white p-4 mt-4 rounded-lg shadow-md">
                    <h2 class="text-xl font-bold">Weather in ${weather.name}</h2>
                    <p><strong>Temperature:</strong> ${weather.main.temp}°C</p>
                    <p><strong>Feels Like:</strong> ${weather.main.feels_like}°C</p>
                    <p><strong>Humidity:</strong> ${weather.main.humidity}%</p>
                    <p><strong>Pressure:</strong> ${weather.main.pressure} hPa</p>
                    <p><strong>Wind Speed:</strong> ${weather.wind.speed} m/s</p>
                    <p><strong>Wind Direction:</strong> ${weather.wind.deg}°</p>
                    <p><strong>Cloudiness:</strong> Few Clouds (${weather.clouds.all}%)</p>
                    <img class="mx-auto mt-2" src="https://openweathermap.org/img/wn/${weather.weather[0].icon}.png" alt="Weather Icon">
                    <p><strong>Visibility:</strong> ${weather.visibility}m</p>
                    <p><strong>Sunrise:</strong> ${new Date(weather.sys.sunrise * 1000).toLocaleTimeString()}</p>
                    <p><strong>Sunset:</strong> ${new Date(weather.sys.sunset * 1000).toLocaleTimeString()}</p>
                </div>`
    }

    
    formInput.addEventListener('submit',(e)=>{
        e.preventDefault()
        let city = input.value
        if(!city) return
        makeApiCall(city)
    })

