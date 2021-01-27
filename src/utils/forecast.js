const request = require('request');

const forecast = ( latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=48ca50af1139ef1b3d9961e699c975d4&query='+ encodeURIComponent(latitude) + ',' + encodeURIComponent(longitude) 

    request({url, json:true}, (error, {body})=>{       
        if(error){
            callback( 'Unable to connect to weather service', undefined)
        }else if( body.error){
            callback('Invalid api parameters', undefined )
        }else{
            callback(undefined, {
               'Forecast': body.current.weather_descriptions[0]+` <img style='border-radius:50%' width="20" height="20" src='${body.current.weather_icons}'/>`,
               'Temperature': body.current.temperature,
               'Chance_of_rain':  body.current.precip + "% chance of rain",
               'localtime': body.location.localtime,
               'wind_speed': body.current.wind_speed,
               'wind_dir': body.current.wind_dir,
               'humidity': body.current.humidity    
            })
            
        }

    })
}
module.exports = forecast