const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const e = require('express')

const app = express()

//Define pathnames to serve
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsDirectory = path.join(__dirname, '../templates/views')
const partialsDirectory = path.join(__dirname, '../templates/partials')

//Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsDirectory)
hbs.registerPartials(partialsDirectory)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather app',
        name: 'Devon Roepke'
    })
})
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Devon Roepke'
    })
})
app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        message: 'This is a message for the help page',
        name: 'Devon Roepke'
    })
})
app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            error: 'Please provide an address'})
    }
    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if(error) {
            return res.send({ error })
        } else {
            forecast(latitude, longitude, (error, forecast) => {
                if(error) {
                    res.send({ error })
                } else {
                res.send({
                    forecast,
                    location,
                    address: req.query.address
                })
                }
            })
        }
    })

})
app.get('/products', (req, res) => {
    if(!req.query.search) {
       return res.send({
            error: 'You must provide a search term'
        })
    }
    console.log(req.query.search.length)
    res.send({
        products: []
    })
})
app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        error: 'Help article not found'
    })
})
app.get('*', (req, res) => {
    res.render('404',{
        error: '404 not found',
        title: '404'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000')
})