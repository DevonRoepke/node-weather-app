const request = require('request');

const forecast = (lat, long, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=0d725a640641af83b00b4345035919d9&query=' + encodeURIComponent(lat) + ',' + encodeURIComponent(long) + '&units=f'
    request({ url, json: true }, (error, { body } = {}) => {
        if(error) {
            callback('Unable to connect to weather service.', undefined)
        } else if(body.error) {
            callback('Unable to find location.', undefined)
        } else {
            const current = body.current
            callback(undefined, `${current.weather_descriptions[0]}. It is currently ${current.temperature} degrees out. It feels like ${current.feelslike} degrees. Humidity is currently ${current.humidity}%`)
        }
    })
}

module.exports = forecast