import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [allCountries, setAllCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all countries on component mount
  useEffect(() => {
    async function fetchAllCountries() {
      try {
        const res = await fetch('https://restcountries.com/v3.1/independent?status=true');
        const data = await res.json();
        console.log("Fetched countries:", data);

        if (!Array.isArray(data)) {
          console.error("API did not return an array:", data);
          setAllCountries([]);
          setFilteredCountries([]);
          setLoading(false);
          return;
        }

        setAllCountries(data);
        setFilteredCountries(data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching countries:', err);
        setAllCountries([]);
        setFilteredCountries([]);
        setLoading(false);
      }
    }

    fetchAllCountries();
  }, []);

  // Filter countries based on search term
  useEffect(() => {
    const filtered = allCountries.filter((country) =>
      country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCountries(filtered);
  }, [searchTerm, allCountries]);

  return (
    <div className="app-container">
      <h1>🌍 Country Search</h1>

      <input
        type="text"
        placeholder="Search by country name..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
      />

      {searchTerm && (
        <p style={{ color: '#4a63f8', marginBottom: '20px', fontWeight: '600' }}>
          {searchTerm}
        </p>
      )}

      {loading && <p className="status-message">Loading countries...</p>}
      {!loading && filteredCountries.length === 0 && searchTerm && (
        <p className="status-message">No country found matching "{searchTerm}"</p>
      )}

      <div className="country-list">
        {Array.isArray(filteredCountries) &&
          filteredCountries.map((country) => (
            <div key={country.name.common} className="country-card">
              <img
                src={country.flags?.png}
                alt={country.name.common}
                className="country-flag"
              />
              <h2 className="country-name">{country.name.common}</h2>
            </div>
          ))}
      </div>
    </div>
  );
}

export default App;
