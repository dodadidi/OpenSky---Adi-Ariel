
const axios = require('axios');

exports.weatherController = {
    
    getWeather(req,res){
        const city = req.query.cityName;
        const apiKey = "ab40d21c403f520c2108d31fc017ab43";
        const unit = "metric";
        const url="https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid="+apiKey+"&units="+unit;
        console.log(url);
        axios.get(url).then(function(response){
          res.json(response.data);  
        });     
    }
}

