import Search from '../assets/search.png'
import clearicon from '../assets/clear.png'
import wind from '../assets/wind.png'
import humidity from '../assets/humidity.png'
import cloud from '../assets/cloud.png'
import rain from '../assets/rain.png'
import drizzle from '../assets/drizzle.png'
import snow from '../assets/snow.png'
import { useEffect, useRef, useState } from 'react'
function Weather() {
    const inputRef = useRef();
    const [weatherdata, setWeatherData] = useState(false);
    const allIcons = {
        "01d" : clearicon,
        "01n" : clearicon,
        "02d" : cloud,
        "02n" : cloud,
        "03n" : cloud,
        "03d" : cloud,
        "04d" : drizzle,
        "04n" : drizzle,
        "09d" : rain,
        "09n" : rain,
        "13d" : snow,
        "13n" : snow,
    }
    const search = async (city)=>{
        if(city === ""){
            alert("Enter city name");
            return;
        } 
        try {
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`
            const response = await fetch(url);
            const data = await response.json();
            console.log(data);
            const icon = allIcons[data.weather[0].icon] || clearicon;
            setWeatherData({
                humidity: data.main.humidity,
                windSpeed: data.wind.speed,
                temperature: Math.floor(data.main.temp),
                location: data.name,
                icon: icon,
            })
        } catch (error) {
            throw error;
        }
    }

    useEffect(()=>{
        search("london")
    }, [])

  return (
    <div className="flex items-center justify-center h-screen">
        <div className="w-auto bg-gradient-to-bl from-violet-700 to-sky-900  rounded-xl p-10">
            {/* Search bar*/}
            <div className="w-auto h-10 flex flex-wrap gap-5">
                <input ref={inputRef} type="text" className=" w-3xs bg-white rounded-4xl p-4 outline-none" placeholder="Search" />
                <img src={Search} className='bg-white p-4 rounded-[50%]' onClick={()=>search(inputRef.current.value)} />
            </div>
            {/* image section */}
            <div className='flex flex-col gap-1.5 items-center p-4'>
               <img src={weatherdata.icon} className='w-1/2'/>
               <p className='text-7xl text-white'>{weatherdata.temperature}°C</p>
               <p className='text-4xl text-white mt-0.5'>{weatherdata.location}</p>
            </div>
            {/* foot section */}
            <div className='flex flex-wrap justify-between gap-5 mt-5 py-4'>
                <div className='flex flex-row gap-1'>
                    <img src={humidity} className='w-1/4 h-1/2 m-2'/>
                    <div className='flex flex-col gap-1'>
                        <p className='text-white text-xl'>{weatherdata.humidity}%</p>
                        <p className='text-white '>Humidity</p>
                    </div>
                </div>
                <div className='flex flex-row gap-1 '>
                    <img src={wind} className='w-1/4 h-1/2 m-2'/>
                    <div className='flex flex-col gap-1'>
                        <p className='text-white text-xl'>{weatherdata.windSpeed}km/h</p>
                        <p className='text-white '>Wind Speed</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Weather
