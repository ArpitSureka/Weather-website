const request = require('request')

var weatherinfo = (latitude, longitude, callback) => {

    const weatherurl = 'http://api.weatherstack.com/current?access_key=67a76c9c66b86cd3e9433a411e3ea671&query='+ latitude + ',' + longitude 

    request({ url : weatherurl, json : true } ,(error, { body } )=>{
        if(error){
            callback('Unable to connect to Weather service',undefined)
        }else if(body.error){
            callback('Unable to find location',undefined)
        }else{
            callback( undefined, {
                temperature : body.current.temperature,
                feelslike : body.current.feelslike,
                observation_time : body.current.observation_time,
                weather_descriptions : body.current.weather_descriptions
            })
        }
    })
} 

module.exports = {
    weatherinfo,
}