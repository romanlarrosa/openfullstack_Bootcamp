import React from "react"
import Country from "./Country"

const CountriesList = ({ countries, searchValue, setSearchValue }) => {
  const filtered = countries.filter((country) =>
    country.name.toLowerCase().includes(searchValue.toLowerCase())
  )

  const countryClick = (country) => () => {
    setSearchValue(country)
  }

  if (filtered.length === 1) {
    return <Country country={filtered[0]} />
  }

  return (
    <div>
      {filtered.length <= 10 ? (
        filtered.map((country) => {
          return (
            <p key={country.numericCode}>
              {country.name}
              <button onClick={countryClick(country.name)}>show</button>
            </p>
          )
        })
      ) : (
        <p>Too many matches, specify another filter</p>
      )}
    </div>
  )
}

export default CountriesList
