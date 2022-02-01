console.log('Hello world!')

// fetch('http://puzzle.mead.io/puzzle').then((res) => {
//     res.json().then((data) =>  {
//         console.log(data)
//     })
// })


const weatherData = document.querySelector('form')
const search = document.querySelector('input')
const message1 = document.querySelector('#message1')
const message2 = document.querySelector('#message2')

weatherData.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value

    message1.textContent = 'Loading...'
    message2.textContent = ''

    fetch('http://localhost:3000/weather?address=' + location).then((res) => {
    res.json().then((data) => {
        if(data.error) {
           return message1.textContent = data.error
        }
        message1.textContent = data.location
        message2.textContent = data.forecast
    })
})
})