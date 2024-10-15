import React, { useState, useEffect } from 'react';

export default function VehicleData() {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Replace these variables with your actual state or props
  const [model, setModel] = useState(["camry","Ford","Chevrolet", "BMW"]);
  const [make, setMake] = useState([]);
  const [fuelType, setFuelType] = useState([]);
  const [drive, setDrive] = useState([]);
  const [cylinders, setCylinders] = useState([]);
  const [transmission, setTransmission] = useState([]);
  const [limit, setLimit] = useState(1); // Default limit set to 1

  useEffect(() => {
    const fetchCars = async () => {
      // Generate a random index
      const randomIndex = Math.floor(Math.random() * model.length); // Random index based on model array length
        
      let url = `https://api.api-ninjas.com/v1/cars?limit=${limit}`; // Start with the base URL
 
      // Only append parameters that have valid values using the same random index
      if (model.length > 0 && model[0]) {
        url += `&model=${encodeURIComponent(model[randomIndex])}`;
      }
      if (make.length > 0 && make[0]) {
        url += `&make=${encodeURIComponent(make[randomIndex])}`;
      }
      if (fuelType.length > 0 && fuelType[0]) {
        url += `&fuel_type=${encodeURIComponent(fuelType[randomIndex])}`;
      }
      if (drive.length > 0 && drive[0]) {
        url += `&drive=${encodeURIComponent(drive[randomIndex])}`;
      }
      if (cylinders.length > 0 && cylinders[0]) {
        url += `&cylinders=${encodeURIComponent(cylinders[randomIndex])}`;
      }
      if (transmission.length > 0 && transmission[0]) {
        url += `&transmission=${encodeURIComponent(transmission[randomIndex])}`;
      }

      console.log("Constructed URL:", url); // For debugging
      console.log(randomIndex)
      const options = {
        method: 'GET',
        headers: {
          'X-Api-Key': 'mPBqWTDflUcvtvGj5ZqkZw==1xZedm1FSkZRXwLg',
        },
      };

      try {
        const response = await fetch(url, options);
        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        setCars(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
    
  }, []); // Ensure model is in the dependency array if it changes

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h2>Car Results</h2>
      <ul>
        {cars.map((car, index) => (
          <li key={index}>
            <h3>{car.make} {car.model}</h3>
            <p>Fuel Type: {car.fuel_type}</p>
            <p>Drive: {car.drive}</p>
            <p>Cylinders: {car.cylinders}</p>
            <p>Transmission: {car.transmission}</p>
            <p>Year: {car.year}</p>
            {/* Add more properties as needed */}
          </li>
        ))}
      </ul>
    </div>
  );
};
