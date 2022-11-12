import { useEffect, useState } from "react";
import axios from "axios";

const Filter = ({ onChange }) => (
  <>
    <div>
      find countries <input onChange={onChange} />
    </div>
  </>
);

const Countries = ({ updatedCountries }) => {
  if (updatedCountries.length === 1) {
    const country = updatedCountries[0];
    return <CountryData c={country} />;
  }

  if (updatedCountries.length > 10) {
    return <div>Too many matches, specify another filter.</div>;
  }

  return updatedCountries.map((country) => (
    <div key={country.name.official}>{country.name.common}</div>
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

  const handleNameChange = (event) => {
    console.log(event.target.value);
    setCountryName(event.target.value);

    setUpdatedCountries(
      countries.filter((country) =>
        country.name.common.toLowerCase().includes(countryName.toLowerCase())
      )
    );
  };

  return (
    <>
      <Filter onChange={handleNameChange} />
      <Countries updatedCountries={updatedCountries} />
    </>
  );
};

export default App;
