const path = require('path');
const express = require('express')
const hbs = require('hbs')
const geocode = require('./Utils/geocode.js').geocode
const weatherinfo = require('./Utils/weatherinfo.js').weatherinfo

const app = express()
const PORT = process.env.PORT || 3000

const publicDirectortPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

app.set('views', viewsPath)
app.set('view engine','hbs')
hbs.registerPartials(partialsPath)

app.use(express.static(publicDirectortPath))

app.get('',(req, res) => {
    res.render('index',{
        title : 'Weather Page',
        name : 'Arpit Sureka'
    })
})

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error : 'Error Provide Address'})
    }
    const location = req.query.address
    geocode(location,(error,{latitude,longitude,location} = {})=>{
        if(error){
            return res.send({
                error : error})
        }
        weatherinfo(latitude, longitude,(error, forecast) =>{
            if(error){
                return res.send({
                    error : error
                })
            }
            return res.send({
                forecast,
                location
            })
        })

    })

})

app.get('/about',(req, res) => {
    res.render('about',{
        title : 'About Page',
        name : 'Arpit Sureka'
    })
})

app.get('/help',(req, res) => {
    res.render('help',{
        title : 'Help Page',
        name : 'Arpit Sureka'
    })
})

app.get('/help/*',(req,res)=>{
    res.render('404',{
        title : '404 Page',
        name : 'Arpit Sureka',
        ErrorMessage : 'Help article not found'
    })
})


app.get('*',(req,res)=>{
    res.render('404',{
        title : '404 Page',
        name : 'Arpit Sureka',
        ErrorMessage : 'Page not found'
    })
})

app.listen(PORT,()=>{
    console.log('Server running on' + PORT)
})