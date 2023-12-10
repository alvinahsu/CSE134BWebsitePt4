window.onload = () => {
    class WeatherWidget extends HTMLElement {
        constructor(){
            super();
            this.attachShadow( {mode: 'open'} );
            this.shadowRoot.innerHTML = `
            <style>
                span{
                    display: flex;
                    gap: 10px;
                    align-items: center;
                    font-size: 1.5em;
                    padding: 10px;
                }
                img {
                    border-radius: 10em;
                    object-fit: cover;
                    width: 100px;
                    height: 100px;
                }
            </style>
            `
        }

        connectedCallback(){
            // UCSD Weather
            fetch('https://api.weather.gov/gridpoints/SGX/55,22/forecast', {
                method: 'GET',
            }).then(response => response.json()).then(data => {
                this.currentWeather = data.properties.periods[0];
                this.location = data.geometry.coordinates[0][0]
                this.handleUpdateWeather(this.currentWeather,this.location)
            })
        }
        handleUpdateWeather(data,location){
            this.addLocation(location)
            this.addForecast(data);
            this.addTemperature(data);
            this.addWind(data);
            this.addHumidity(data);
            this.addPrecipitation(data);
            this.addDew(data);
        }
    
        addForecast(data){
            let sp = document.createElement('span');
            sp.id = "forecast"
            const icon = document.createElement('img');
            icon.src = data.icon;
            let p = document.createElement('p');
            p.innerText = data.shortForecast;
            sp.appendChild(icon);
            sp.appendChild(p);
            this.shadowRoot.appendChild(sp);
        }

        addTemperature(data){
            let sp = document.createElement('span');
            const icon = document.createElement('img');
            icon.src = "images/temperature.png"
            sp.id = "temperature"
            let p = document.createElement('p');
            p.innerText = data.temperature + "°" + data.temperatureUnit;
            sp.appendChild(icon);
            sp.appendChild(p);
            this.shadowRoot.appendChild(sp);
        }

        addWind(data){
            let sp = document.createElement('span');
            const icon = document.createElement('img');
            icon.src = "images/wind.png"
            sp.id = "wind"
            let p = document.createElement('p');
            p.innerText = data.windSpeed + " " + data.windDirection;
            sp.appendChild(icon);
            sp.appendChild(p);
            this.shadowRoot.appendChild(sp);
        }

        addHumidity(data){
            let sp = document.createElement('span');
            const icon = document.createElement('img');
            icon.src = "images/humidity.png"
            sp.id = "humidity"
            let p = document.createElement('p');
            p.innerText = (data.relativeHumidity.value == null ? 0 : data.relativeHumidity.value) + " " + data.relativeHumidity.unitCode;
            sp.appendChild(icon);
            sp.appendChild(p);
            this.shadowRoot.appendChild(sp);
        }

        addPrecipitation(data){
            let sp = document.createElement('span');
            const icon = document.createElement('img');
            icon.src = "images/precipitation.png"
            sp.id = "humidity"
            let p = document.createElement('p');
            p.innerText = (data.probabilityOfPrecipitation.value == null ? 0 : data.probabilityOfPrecipitation.value)+ " " + data.probabilityOfPrecipitation.unitCode;
            sp.appendChild(icon);
            sp.appendChild(p);
            this.shadowRoot.appendChild(sp);
        }

        addDew(data){
            let sp = document.createElement('span');
            const icon = document.createElement('img');
            icon.src = "images/dew.png"
            sp.id = "humidity"
            let p = document.createElement('p');
            p.innerText = (data.dewpoint.value == null ? 0 : data.dewpoint.value.toFixed(3))+ " " + data.dewpoint.unitCode;
            sp.appendChild(icon);
            sp.appendChild(p);
            this.shadowRoot.appendChild(sp);
        }

        addLocation(data){
            let sp = document.createElement('span');
            let p = document.createElement('p');
            p.innerText = `Weather for coodinates: ${data[1]}° N, ${data[0]}° W`;
            sp.appendChild(p);
            this.shadowRoot.appendChild(sp);
        }
    }
    customElements.define('weather-widget', WeatherWidget);
}