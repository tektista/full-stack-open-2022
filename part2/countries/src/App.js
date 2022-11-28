import { useEffect, useState } from "react";
import axios from "axios";

// - Your API key is 044166a82531a2aade90c91a59fb074b

const Filter = ({ onChange }) => (
  <>
    <div>
      find countries <input onChange={onChange} />
    </div>
  </>
);

const Countries = ({ updatedCountries, showClickHandler }) => {
  //if list of updated countries is one, show the view for that remaining country
  if (updatedCountries.length === 1) {
    const country = updatedCountries[0];
    return <CountryData c={country} />;
  }

  //if list is greater than 10, too many
  if (updatedCountries.length > 10) {
    return <div>Too many matches, specify another filter.</div>;
  }

  //otherwise return each country, with a show button
  return updatedCountries.map((country) => (
    <div key={country.name.official}>
      {country.name.common}{" "}
      {/* when clicked, pass the common name of the clicked country to showClickHandler */}
      <button onClick={() => showClickHandler(country.name.common)}>
        show
      </button>
    </div>
  ));
};

const CountryData = ({ c }) => {
  const languageList = [];

  for (const [key, value] of Object.entries(c.languages)) {
    languageList.push(value);
  }

  return (
    <>
      <h1> {c.name.common}</h1>
      <div>
        {"capital"}
        {c.capital.map((name) => (
          <li key={name}> {name}</li>
        ))}
      </div>

      <h2>{"languages: "}</h2>
      <div>
        {" "}
        {languageList.map((language) => (
          <li>{language}</li>
        ))}
      </div>

      <div>
        <img src={c.flag} alt="Country Flag" width="8%"></img>
      </div>
    </>
  );
};
const App = () => {
  const [countries, setCountries] = useState([]);
  const [countryName, setCountryName] = useState("");
  const [updatedCountries, setUpdatedCountries] = useState([]);

  // const [showResult, setShowResult] = useState(false);

  //pull data
  useEffect(() => {
    console.log("effect");
    axios.get("https://restcountries.com/v3.1/all").then((response) => {
      console.log("promise fulfilled");
      setCountries(response.data);
    });
  }, []);

  console.log("render", countries.length, "countries");

  //handler for input change in input field
  const handleNameChange = (event) => {
    //set CountryName to the value of the input field every time it is pressed
    setCountryName(event.target.value);

    //filter countries based on updated country name in input field
    setUpdatedCountries(
      countries.filter((country) =>
        country.name.common.toLowerCase().includes(countryName.toLowerCase())
      )
    );
  };

  //handler for showing the view of each country
  const handleShowClick = (countryName) => {
    //update the filter to
    setCountryName(countryName);

    //filter countries based on updated country name in input field
    setUpdatedCountries(
      countries.filter((country) =>
        country.name.common.toLowerCase().includes(countryName.toLowerCase())
      )
    );
  };

  return (
    <>
      <Filter onChange={handleNameChange} />
      <Countries
        updatedCountries={updatedCountries}
        showClickHandler={handleShowClick}
      />

      
    </>
  );
};

export default App;
