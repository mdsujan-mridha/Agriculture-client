import React, { Fragment, useEffect, useState } from 'react';
import wind_icon from "../images/weather/wind.png";
import humidity_icon from "../images/weather/humidity.png";
import clear_icon from "../images/weather/clear.png";
import snow_icon from "../images/weather/snow.png";
import rain_icon from "../images/weather/rain.png";
import drizzle_icon from "../images/weather/drizzle.png";
import cloud_icon from "../images/weather/cloud.png";

const Weather = () => {

    const [location, setLocation] = useState("Dhaka");
    const [weatherData, setWeatherData] = useState({});
    const [winIcon, setWinIcon] = useState(clear_icon);
    // this is openweathermap.org api key
    const apiKeys = "20668a37dc642789a04208543e097d3e"

    const handleLocation = (e) => {
        e.preventDefault();
        setLocation(e.target.value);

    }

    useEffect(() => {

        if (location) {
            fetch(
                `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=Metric&appid=${apiKeys}`
            )
                .then((res) => res.json())
                .then((data) => {
                    setWeatherData(data);
                })
                .catch((err) => console.log(err));
        }

        if (weatherData.weather && (weatherData.weather[0].icon === "01d" || weatherData.weather[0].icon === "01n")) {
            setWinIcon(clear_icon);
        }
        else if (weatherData.weather && (weatherData.weather[0].icon === "02d" || weatherData.weather[0].icon === "02n")) {
            setWinIcon(cloud_icon);
        }
        else if (weatherData.weather && (weatherData.weather[0].icon === "03d" || weatherData.weather[0].icon === "03n")) {
            setWinIcon(cloud_icon);
        }
        else if (weatherData.weather && (weatherData.weather[0].icon === "04d" || weatherData.weather[0].icon === "04n")) {
            setWinIcon(cloud_icon);
        }
        else if (weatherData.weather && (weatherData.weather[0].icon === "09d" || weatherData.weather[0].icon === "09n")) {
            setWinIcon(rain_icon);
        }
        else if (weatherData.weather && (weatherData.weather[0].icon === "10d" || weatherData.weather[0].icon === "10n")) {
            setWinIcon(rain_icon);
        }
        else if (weatherData.weather && (weatherData.weather[0].icon === "11d" || weatherData.weather[0].icon === "11n")) {
            setWinIcon(snow_icon);
        }
        else if (weatherData.weather && (weatherData.weather[0].icon === "13d" || weatherData.weather[0].icon === "13n")) {
            setWinIcon(snow_icon);
        }
        else if (weatherData.weather && (weatherData.weather[0].icon === "50d" || weatherData.weather[0].icon === "50n")) {
            setWinIcon(drizzle_icon);
        }

    }, [location, weatherData.weather])

    // console.log(weatherData);


    return (
        <Fragment>
            <div className='bg-violet-900 w-full min-h-screen flex justify-center items-center'>
                <div className='w-full lg:w-1/2 relative'>
                    <div className='px-12 pt-12'>
                        <input type="text"
                            placeholder='Enter your location'
                            onChange={(e) => handleLocation(e)}
                            className='w-full h-14 rounded-full px-10 outline-none'
                        />
                    </div>
                    <div className='flex justify-center items-center'>
                        <img src={winIcon} alt="weather" className='w-72 h-72' />
                    </div>
                    <div className='flex justify-center items-center flex-col p-10 gap-5'>
                        <h1 className='text-5xl text-white font-bold'> {weatherData?.name} </h1>
                        <h1 className='text-5xl text-white font-bold'> {weatherData?.main?.temp} <sup>o</sup>C </h1>
                    </div>
                    <div className='absolute right-0 left-auto top-auto bottom-[300px]'>
                        <p className='rotate-90 text-white font-bold text-3xl '>  </p>
                    </div>
                    <div className='flex justify-between items-center  p-10 gap-5'>

                        <div className='flex gap-3'>
                            <img src={humidity_icon} alt="Weather" />
                            <div>
                                <p className='text-2xl text-white font-semibold'> {weatherData?.main?.humidity} % </p>
                                <p className='text-2xl text-white font-semibold'> Humidity </p>
                            </div>
                        </div>
                        <div className='flex gap-3'>
                            <img src={wind_icon} alt="Weather" />
                            <div>
                                <p className='text-2xl text-white font-semibold'> {weatherData?.wind?.speed} kmh<sup>-1</sup> </p>
                                <p className='text-2xl text-white font-semibold'> Wind Speed </p>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </Fragment>
    );
};



export default Weather;