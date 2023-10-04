import axios from 'axios';
import React,{useState,useEffect} from 'react';
import './App.css';

function App() {
  const [city,setCity] = useState(null);
  const [temp,setTemp] = useState(null);
  const [country,setCountry] = useState(null);
  const [humidity,setHumidity] = useState(null);
  const [pressure,setPressure] = useState(null);
  const [description,setDescription] = useState(null);
  const [windDeg,setWindDeg] = useState(null);
  const [windSpd,setWindSpd] = useState(null);


  const [cityName,setCityName] = useState('Delhi');
  const [finalCity,setFinalCity] = useState('Delhi');
  const [click,setClick] = useState(0);
 
  useEffect(()=>{

    axios.get(`https://api.openweathermap.org/data/2.5/weather?q=`+finalCity+`&appid=6dc34bdc90e971cc74b68ed34f1bb9ec&units=metric`)
    .then(response=>{
      setCity(response.data.name);
      setCountry(response.data.sys.country);
      setTemp(response.data.main.temp);
      setHumidity(response.data.main.humidity);
      setPressure(response.data.main.pressure);
      setDescription(response.data.weather[0].description);
      setWindDeg(response.data.wind.deg);
      setWindSpd(response.data.wind.speed);
    })
    .catch(error => {
      alert('city not found!!')
    });
    setClick(0);
  },[click])

  function handleSubmit(e){
    e.preventDefault();
    e.target.reset();
    setClick(1);
    setFinalCity(cityName);
  }

  return (
    <div className="App">
      <div class="bg-text">
        <h1>Know About Your City !!</h1>
        <form onSubmit={handleSubmit}>
          <input 
            type='text' 
            className='searchBar' 
            onChange={e=>setCityName(e.target.value)}/>
          <button 
            className='searchBttn'  
            type='submit'
            >
              Search</button>
        </form>
        <div>
          <span>
          <p>Your City</p>
          <h1>{city}</h1>
          <h3>{country}</h3>
          </span>
          <div>
          <h2>{description}</h2>
          <h2>Temp: {temp} C</h2>
          <h2>Humidity: {humidity} %</h2>
          <h2>Pressure: {pressure} hPa</h2>
          <h2>Wind speed: {windSpd} m/s</h2>
          <h2>Wind deg: {windDeg}</h2>
          </div>
        </div>
      </div>  
    </div>
  );
}

export default App;
