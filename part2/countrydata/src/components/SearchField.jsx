import React from "react"

const SearchField = ({ searchValue, setSearchValue }) => {
  const handleOnChange = (event) => {
    const value = event.target.value
    setSearchValue(value)
  }

  return (
    <div>
      find countries
      <input
        autoComplete="new-password"
        value={searchValue}
        onChange={handleOnChange}
      ></input>
    </div>
  )
}

export default SearchField
