const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

const app = express()
const port = process.env.PORT || 3000

app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)
app.use(express.static(publicDirectoryPath))

app.get('', ( req, res)=>{
   res.render('index', {title:'Weather Forecaster'})
})


app.get('/weather', ( req, res)=>{
    if(!req.query.address){
        return res.send({
            error:'Please provide the Location to be forecasted'
        })
    }
    geocode( req.query.address , (error, {Latitude, Longitude, Location} = {}) => {
        if( error){         return res.send({ error})     }
        forecast( Latitude, Longitude, (error, {Forecast, Temperature, Chance_of_rain, wind_speed, wind_dir, humidity, localtime } = {})=>{
            if( error ){        return res.send({ error})         }
            res.send({
                Forecast,
                Temperature,
                Chance_of_rain,
                Location,
                wind_speed, wind_dir, humidity, localtime,
                address:req.query.address
                
            })
        })
    })
})

app.get('*', ( req, res)=> {
    res.render('404',{
        errorMessage:"Page not found"
    })
})

app.listen( port, ()=>{
    console.log('Server is on port ' + port)
})