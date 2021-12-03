console.log('Client side javascript file is loaded!')

const form = document.querySelector('form')

form.addEventListener('submit', (e)=>{
    e.preventDefault();

    const messageOne = document.querySelector('#message-1')
    const messageTwo = document.querySelector('#message-2')

    messageOne.textContent = 'Loading ...'
    messageTwo.textContent = ''

    const address = '/weather?address=' + document.querySelector('input').value
    
    fetch(address).then((response)=>{
        response.json().then((data)=>{
            if(data.error){
                messageOne.textContent = data.error
                messageTwo.textContent = ''
            }else{
                // console.log(data)
                messageOne.textContent = 'Location : ' + data.location
                messageTwo.textContent = 'Temperature : ' + data.forecast.temperature + '°C'
            }
        })
    })
})