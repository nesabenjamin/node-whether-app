const form = document.querySelector('form')
const search = document.querySelector('input')

document.querySelector('#block').style.display = "none";
document.querySelector('#error').style.display = "none";


form.addEventListener('submit', (e)=>{
    e.preventDefault();
    document.querySelector('#error').innerHTML = '<div class="spinner-grow text-info"></div> Loading details...'
    document.querySelector('#error').style.display = "block";
    document.querySelector('#block').style.display = "none";

    const url = 'http://127.0.0.1:3000/weather?address='+search.value;
    fetch(url).then( (response)=>{
        if(response.ok){
            return response.json();
        }
    }).then( (responseJson)=>{
        if(responseJson.error){
            document.querySelector('#block').style.display = "none";
            document.querySelector('#error').innerHTML = responseJson.error
            document.querySelector('#error').style.display = "block";        
        }else{
            document.querySelector('#error').style.display = "none";
            document.querySelector('#Location').innerHTML = `<strong>${responseJson.Location}</strong>`;
            document.querySelector('#Forecast').innerHTML = `<strong>${responseJson.Forecast}</strong>`;
            document.querySelector('#Temperature').innerHTML = `<strong>${responseJson.Temperature} </strong>`;
            document.querySelector('#Precip').innerHTML = `<strong>${responseJson.Chance_of_rain}</strong>`;
            let windspeed = Math.floor(responseJson.wind_speed * 1.852)
            document.querySelector('#wind_speed').innerHTML = `<strong>${windspeed} kmph</strong>`;
            document.querySelector('#wind_dir').innerHTML = `<strong>${responseJson.wind_dir}</strong>`;
            document.querySelector('#humidity').innerHTML = `<strong>${responseJson.humidity}</strong>`;
            //document.querySelector('#localtime').innerHTML = `<strong>${responseJson.localtime}</strong>`;

            document.querySelector('#block').style.display = "block";
    
        }
    }).catch( (error )=>{
        document.querySelector('#block').style.display = "none";
        document.querySelector('#error').innerHTML = error
        document.querySelector('#error').style.display = "block";
    })

})