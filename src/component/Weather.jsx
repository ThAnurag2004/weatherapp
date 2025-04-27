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
    <div className="flex items-center justify-center min-h-screen p-4">
        <div className="w-full max-w-md bg-gradient-to-bl from-violet-700 to-sky-900 rounded-xl p-6 md:p-10">
            {/* Search bar*/}
            <div className="w-full flex flex-wrap gap-3 md:gap-5">
                <input 
                    ref={inputRef} 
                    type="text" 
                    className="flex-1 min-w-[200px] bg-white rounded-lg p-3 outline-none" 
                    placeholder="Search" 
                />
                <img 
                    src={Search} 
                    className='w-12 h-12 bg-white p-3 rounded-full cursor-pointer hover:bg-gray-100' 
                    onClick={()=>search(inputRef.current.value)}
                />
            </div>
            {/* image section */}
            <div className='flex flex-col gap-1.5 items-center p-4'>
               <img src={weatherdata.icon} className='w-32 md:w-40 lg:w-48'/>
               <p className='text-5xl md:text-7xl text-white'>{weatherdata.temperature}°C</p>
               <p className='text-2xl md:text-4xl text-white mt-0.5'>{weatherdata.location}</p>
            </div>
            {/* foot section */}
            <div className='flex flex-wrap justify-between gap-4 mt-5 py-4'>
                <div className='flex flex-row items-center gap-2 flex-1 min-w-[140px]'>
                    <img src={humidity} className='w-10 h-10 md:w-12 md:h-12'/>
                    <div className='flex flex-col gap-0.5'>
                        <p className='text-white text-lg md:text-xl'>{weatherdata.humidity}%</p>
                        <p className='text-white text-sm md:text-base'>Humidity</p>
                    </div>
                </div>
                <div className='flex flex-row items-center gap-2 flex-1 min-w-[140px]'>
                    <img src={wind} className='w-10 h-10 md:w-12 md:h-12'/>
                    <div className='flex flex-col gap-0.5'>
                        <p className='text-white text-lg md:text-xl'>{weatherdata.windSpeed}km/h</p>
                        <p className='text-white text-sm md:text-base'>Wind Speed</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Weather
