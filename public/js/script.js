const form = document.querySelector('form')
const search = document.querySelector('input')

document.querySelector('#block').style.display = "none";
document.querySelector('#error').style.display = "none";


form.addEventListener('submit', (e)=>{
    e.preventDefault();
    document.querySelector('#error').innerHTML = '<div class="spinner-grow text-info"></div> Loading details...'
    document.querySelector('#error').style.display = "block";
    document.querySelector('#block').style.display = "none";

    const url = '/weather?address='+search.value;
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
            document.querySelector('#Location').innerHTML = `${responseJson.Location}`;
            document.querySelector('#Forecast').innerHTML = `${responseJson.Forecast}`;
            document.querySelector('#Temperature').innerHTML = `${responseJson.Temperature} `;
            document.querySelector('#Precip').innerHTML = `${responseJson.Chance_of_rain}`;
            let windspeed = Math.floor(responseJson.wind_speed * 1.852)
            document.querySelector('#wind_speed').innerHTML = `${windspeed} kmph`;
            document.querySelector('#wind_dir').innerHTML = `${responseJson.wind_dir}`;
            document.querySelector('#humidity').innerHTML = `${responseJson.humidity}`;
            //document.querySelector('#localtime').innerHTML = `${responseJson.localtime}`;

            document.querySelector('#block').style.display = "block";
    
        }
    }).catch( (error )=>{
        document.querySelector('#block').style.display = "none";
        document.querySelector('#error').innerHTML = error
        document.querySelector('#error').style.display = "block";
    })

})