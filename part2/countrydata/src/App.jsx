import { useState, useEffect } from "react"
import "./App.css"
import axios from "axios"

import SearchField from "./components/SearchField"
import CountriesList from "./components/CountriesList"

function App() {
  const [searchValue, setSearchValue] = useState("")
  const [countries, setCountries] = useState([])

  useEffect(() => {
    axios.get("https://restcountries.eu/rest/v2/all").then((response) => {
      setCountries(response.data)
    })
  }, [])

  return (
    <div className="App">
      <SearchField searchValue={searchValue} setSearchValue={setSearchValue} />
      <CountriesList
        countries={countries}
        searchValue={searchValue}
        setSearchValue={setSearchValue}
      />
    </div>
  )
}

export default App
