import React, { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [newFilter, setNewFilter] = useState("");

  useEffect(() => {
    console.log("effect");
    axios.get("https://restcountries.eu/rest/v2/all").then(response => {
      console.log("promise fulfilled");
      setCountries(response.data);
    });
  }, []);

  const handleFilter = event => {
    setNewFilter(event.target.value);
  };

  const Countries = props => {
    const findCountries = props.countries.filter(country =>
      country.name.toLowerCase().includes(props.value.toLowerCase())
    );

    if (findCountries.length > 10) {
      return <p>Too many matches, specify another filter</p>;
    }

    if (findCountries.length === 1) {
      return <Infobox country={findCountries[0]} />;
    }
    return (
      <div>
        {findCountries.map(country => (
          <li>
            {country.name}
            <button onClick={() => setNewFilter(country.name)}>show</button>
          </li>
        ))}
      </div>
    );
  };

  const Infobox = ({ country }) => {
    const [weather, setWeather] = useState("");

    useEffect(() => {
      console.log("effect");
      axios
        .get(
          `http://api.weatherstack.com/current?access_key=5fdcce199b9ce101d5c1006de2484b25&query=${country.name}`
        )
        .then(response => {
          console.log("promise fulfilled");
          setWeather(response.data);
        });
    }, [country.name]);
    return (
      <div>
        <h1>{country.name}</h1>
        <div>
          <p>capital {country.capital}</p>
          <p>population {country.population}</p>
          <h2>languages</h2>
          <div>
            {country.languages.map(languages => (
              <li>{languages.name}</li>
            ))}
          </div>
        </div>
        <br></br>
        <img src={country.flag} alt={country.name} width="200" />
        <h2>Weather in {weather.location ? weather.location.name : null}</h2>
        <div>
          <b>temperature:</b> {weather.current ? weather.current.temperature : null}{" "}
          Celsius
          <br></br>
          <img
            src={weather.current ? weather.current.weather_icons : null}
            alt="Current weather"
          />
          <br></br>
          <b>wind:</b> {weather.current ? weather.current.wind_speed : null} kph
          direction {weather.current ? weather.current.wind_dir : null}
        </div>
      </div>
    );
  };

  return (
    <div>
      <p>find countries</p>
      <input value={newFilter} onChange={handleFilter} />
      <Countries countries={countries} value={newFilter} />
    </div>
  );
};

export default App;
