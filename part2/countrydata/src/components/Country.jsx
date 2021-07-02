import React, { useEffect, useState } from "react"
import axios from "axios"

const api_key = process.env.REACT_APP_API_KEY

const Country = ({ country }) => {
  const [weather, setWeather] = useState({})
  const [loadingWeather, setLoadingWeather] = useState(true)

  useEffect(() => {
    setLoadingWeather(true)
    axios
      .get(
        `http://api.weatherstack.com/current?access_key=${api_key}&query=${country.name}`
      )
      .then((response) => {
        setWeather({ ...response.data })
        setLoadingWeather(false)
      })
  }, [country.name])

  console.log({ weather })

  return (
    <div>
      <h1>{country.name}</h1>
      <div>capital {country.capital}</div>
      <div>population {country.population}</div>

      <h2>Languages</h2>
      <ul>
        {country.languages.map((lan) => (
          <li key={lan.iso639_1}>{lan.name}</li>
        ))}
      </ul>
      <h2>Flag</h2>
      <img src={country.flag} width="100" alt={country.name + "'s flag"} />

      <h2>Weather</h2>
      {!loadingWeather ? (
        <>
          <p>
            <strong>temperature: </strong> {weather.current.temperature}{" "}
          </p>
          <img
            src={weather.current.weather_icons[0]}
            width="50"
            alt={weather.current.weather_descriptions[0]}
          />
          <p>
            <strong>wind: </strong>{" "}
            {weather.current.wind_speed +
              " mph direction " +
              weather.current.wind_dir}{" "}
          </p>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  )
}

export default Country
