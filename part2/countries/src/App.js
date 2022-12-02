import { useEffect, useState } from "react";
import axios from "axios";

// const Weather = ({ weather }) => {
//   return <div>{!weather ? <p>...</p> : <>Weather: {weather.main.temp}</>}</div>;
// };

const Filter = ({ onChange }) => (
  <>
    <div>
      find countries <input onChange={onChange} />
    </div>
  </>
);

const Countries = ({ countriesToDisplay, showClickHandler }) => {
  //if list of updated countries is one, show the view for that remaining country
  if (countriesToDisplay.length === 1) {
    const country = countriesToDisplay[0];
    return (
      <>
        <CountryData c={country} />;
      </>
    );
  }

  //if list is greater than 10, too many
  if (countriesToDisplay.length > 10) {
    return <div>Too many matches, specify another filter.</div>;
  }

  //otherwise return each country, with a show button
  return countriesToDisplay.map((country) => (
    <div key={country.name.official}>
      {country.name.common}
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

  const WEATHER_API_KEY = process.env.REACT_APP_API_KEY;

  const [weather, setWeather] = useState(0);
  const [wind, setWind] = useState(0);
  const capital = c.capital.map((element) => element);
  const capitals = c.capital[0];

  useEffect(() => {
    console.log("hello");

    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${capitals}&appid=${WEATHER_API_KEY}&units=${"metric"}`
      )
      .then((response) => {
        console.log(response.data);
        setWeather(response.data.main.temp);
        setWind(response.data.wind.speed);
      });
  }, [capitals]);

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
        {languageList.map((language) => (
          <ul key={language}>{language}</ul>
        ))}
      </div>
      <div>
        <img src={c.flags.png} alt="Country Flag" width="8%"></img>
      </div>

      <h2>
        Weather in{" "}
        {c.capital.map((name) => (
          <li key={name}> {name}</li>
        ))}
      </h2>

      <div>Weather: {weather} celsius</div>
      <div>Wind: {wind} m/s</div>
    </>
  );
};

const App = () => {
  //country list
  const [countries, setCountries] = useState([]);

  //search
  const [countryName, setCountryName] = useState("");

  //weather
  // const [weather, setWeather] = useState([]);

  // const [updatedCountries, setUpdatedCountries] = useState([]);

  //array of countries to display based on filter
  const countriesToDisplay = countries.filter((country) =>
    country.name.common.toLowerCase().includes(countryName.toLowerCase())
  );

  //pull data
  useEffect(() => {
    console.log("effect");
    axios.get("https://restcountries.com/v3.1/all").then((response) => {
      console.log("promise fulfilled");
      setCountries(response.data);
      console.log(response.data);
    });
  }, []);

  // useEffect(() => {
  //   const WEATHER_API_KEY = process.env.REACT_APP_API_KEY;

  //   const countriesToDisplay = countries.filter((country) =>
  //     country.name.common.toLowerCase().includes(countryName.toLowerCase())
  //   );

  //   if (countriesToDisplay.length === 1) {
  //     console.log("HELLo");

  //     const country = countriesToDisplay[0];
  //     axios
  //       .get(
  //         `https://api.openweathermap.org/data/2.5/weather?q=${
  //           country.capital[0]
  //         }&appid=${WEATHER_API_KEY}&units=${"metric"}`
  //       )
  //       .then((response) => {
  //         setWeather(response.data);
  //       });
  //   }
  // }, [countries, countryName]);

  console.log("render", countries.length, "countries");

  //handler for input change in input field
  const handleNameChange = (event) => {
    //set CountryName to the value of the input field every time it is pressed
    setCountryName(event.target.value);
    console.log(countriesToDisplay);

    //filter countries based on updated country name in input field
    // setUpdatedCountries(
    //   countries.filter((country) =>
    //     country.name.common.toLowerCase().includes(countryName.toLowerCase())
    //   )
    // );
  };

  //handler for showing the view of each country
  const handleShowClick = (countryName) => {
    //update the filter to
    setCountryName(countryName);
  };

  //filter countries based on updated country name in input field
  // setUpdatedCountries(
  //   countries.filter((country) =>
  //     country.name.common.toLowerCase().includes(countryName.toLowerCase())
  //   )
  // );

  return (
    <>
      <Filter onChange={handleNameChange} />
      <Countries
        countriesToDisplay={countriesToDisplay}
        showClickHandler={handleShowClick}
      />
    </>
  );
};

export default App;
