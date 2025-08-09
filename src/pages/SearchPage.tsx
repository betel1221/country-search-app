import React, { useEffect, useState } from "react";
import type { Country } from "@/types";
import { useNavigate } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faHouse } from "@fortawesome/free-solid-svg-icons";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const SearchPage: React.FC = () => {
  const navigate = useNavigate();

  const [countries, setCountries] = useState<Country[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);

  useEffect(() => {
    async function fetchCountries() {
      try {
        const res = await fetch(
          "https://restcountries.com/v3.1/independent?status=true"
        );
        const data: Country[] = await res.json();
        setCountries(data);
      } catch (error) {
        console.error("Error fetching countries:", error);
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
      <div className="max-w-xl mx-auto p-4">
        <div className="flex gap-2 mb-4">
          <Button variant="outline" onClick={() => setSelectedCountry(null)}>
            <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
            Back
          </Button>
          <Button variant="secondary" onClick={() => navigate("/")}>
            <FontAwesomeIcon icon={faHouse} className="mr-2" />
            Home
          </Button>
        </div>

        <h2 className="text-2xl font-bold mt-4">
          {selectedCountry.name.official}
        </h2>
        <img
          src={selectedCountry.flags?.png}
          alt={`Flag of ${selectedCountry.name.common}`}
          className="w-40 h-auto mt-2 rounded shadow"
        />
        <p className="mt-2">
          <strong>Region:</strong> {selectedCountry.region}
        </p>
        <p>
          <strong>Population:</strong>{" "}
          {selectedCountry.population.toLocaleString()}
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold">Country Search</h1>
        <Button variant="secondary" onClick={() => navigate("/")}>
          <FontAwesomeIcon icon={faHouse} className="mr-2" />
          Home
        </Button>
      </div>

      <Input
        type="text"
        placeholder="Search countries..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-4"
      />

      {loading ? (
        <p>Loading countries...</p>
      ) : searchTerm === "" ? (
        <p className="text-gray-500 italic">Start typing to search countries...</p>
      ) : filtered.length === 0 ? (
        <p>No country found for "{searchTerm}"</p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
          {filtered.map((country) => (
            <Card
              key={country.name.common}
              className="cursor-pointer hover:shadow-lg transition"
              onClick={() => setSelectedCountry(country)}
            >
              <CardContent className="flex flex-col items-center p-4">
                <img
                  src={country.flags?.png}
                  alt={country.name.common}
                  className="w-20 h-auto mb-2 rounded shadow"
                />
                <h2 className="font-semibold">{country.name.common}</h2>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchPage;
