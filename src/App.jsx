import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [countries, setCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [selectedCountry, setSelectedCountry] = useState(null);

  useEffect(() => {
    async function fetchCountries() {
      try {
        const res = await fetch('https://restcountries.com/v3.1/independent?status=true');
        const data = await res.json();
        setCountries(data);
      } catch (error) {
        console.error('Error fetching countries:', error);
        setCountries([]);
      } finally {
        setLoading(false);
      }
    }
    fetchCountries();
  }, []);

  const filtered = countries.filter((country) =>
    country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (selectedCountry) {
    
    return (
      <div className="app-container">
        <button onClick={() => setSelectedCountry(null)} className="back-button">
          ← Back
        </button>
        <h2>{selectedCountry.name.official}</h2>
        <img
          src={selectedCountry.flags?.png}
          alt={`Flag of ${selectedCountry.name.common}`}
          className="country-flag"
        />
        <p><strong>Region:</strong> {selectedCountry.region}</p>
        <p><strong>Population:</strong> {selectedCountry.population.toLocaleString()}</p>
      </div>
    );
  }

 
  return (
    <div className="app-container">
      <h1>Country Search</h1>

      <input
        type="text"
        placeholder="Search countries..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
      />

      {loading ? (
        <p className="status-message">Loading countries...</p>
      ) : filtered.length === 0 ? (
        <p className="status-message">No country found for "{searchTerm}"</p>
      ) : (
        <div className="country-list">
          {filtered.map((country) => (
            <div
              key={country.name.common}
              className="country-card"
              onClick={() => setSelectedCountry(country)}
              style={{ cursor: 'pointer' }}
            >
              <img
                src={country.flags?.png}
                alt={country.name.common}
                className="country-flag"
              />
              <h2 className="country-name">{country.name.common}</h2>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
