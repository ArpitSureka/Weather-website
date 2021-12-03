const request = require('request')

var geocode = (address,callback) => {

    const geocodeURL = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiYXJwaXRzdXJla2EiLCJhIjoiY2t3b3lvM2llMDdwazJ1bzIxNXQ2eDVueiJ9.vHyGEhFKd6TnxgZ6rnRgZA&limit=1'

    request({ url : geocodeURL, json : true } ,(error,{body})=>{
        if(error){
            callback('Unable to connect to Location service',undefined)
        }else if(body.features.length==0){
            callback('Unable to find location',undefined)
        }else{
            callback( undefined, {
                longitude : body.features[0].center[0],
                latitude : body.features[0].center[1],
                location : body.features[0].place_name,
            })
        }
    })

}

module.exports = {
    geocode,
}