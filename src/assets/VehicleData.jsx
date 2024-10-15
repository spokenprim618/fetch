import React, { useState } from 'react';

export default function VehicleData() {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [model, setModel] = useState([]);
  const [make, setMake] = useState(["Ford", "Chevrolet", "BMW"]);
  const [fuelType, setFuelType] = useState([]);
  const [drive, setDrive] = useState([]);
  const [cylinders, setCylinders] = useState([]);
  const [transmission, setTransmission] = useState([]);
  const [limit, setLimit] = useState(1);

  // State variables for banned parameters
  const [bannedMake, setBannedMake] = useState([]);
  const [bannedFuelType, setBannedFuelType] = useState([]);
  const [bannedDrive, setBannedDrive] = useState([]);
  const [bannedCylinders, setBannedCylinders] = useState([]);
  const [bannedTransmission, setBannedTransmission] = useState([]);
  const [bannedAll, setBannedAll] = useState([]);

  const fetchCars = async () => {
    setLoading(true); // Start loading
    const randomIndex = Math.floor(Math.random() * make.length);

    let url = `https://api.api-ninjas.com/v1/cars?limit=${limit}`;

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
    if ( transmission[0]) {
      url += `&transmission=${encodeURIComponent(transmission[randomIndex])}`;
    }
    console.log(cars)
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
      setCars(data); // Replace cars with new fetched data
      
     console.log(data)
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false); // End loading
    }
  };

  const handleShowData = () => {
    fetchCars(); // Fetch data on button click
    console.log(cars)
    
  };

  // Function to ban a parameter
  const handleBanParameter = (parameter, type) => {
    if (type === 'make') {
      setBannedMake([...bannedMake, parameter]);
      setMake(make.filter((item) => item !== parameter));
    } else if (type === 'fuelType') {
      setBannedFuelType([...bannedFuelType, parameter]);
      setFuelType(fuelType.filter((item) => item !== parameter));
    } else if (type === 'drive') {
      setBannedDrive([...bannedDrive, parameter]);
      setDrive(drive.filter((item) => item !== parameter));
    } else if (type === 'cylinders') {
      setBannedCylinders([...bannedCylinders, parameter]);
      setCylinders(cylinders.filter((item) => item !== parameter));
    } else if (type === 'transmission') {
      setBannedTransmission([...bannedTransmission, parameter]);
      setTransmission(transmission.filter((item) => item !== parameter));
    }
    setBannedAll([...bannedAll, parameter]); // Add to overall banned state
  };

  return (
    <div className="grid-container">
      <div className="grid1">
        <div className="container">
          <h2>Car Results</h2>

          {error && <div>Error: {error}</div>}
          {loading && <div>Loading...</div>}

          {!loading && !error && cars.length > 0 && (
            <ul>
              {cars.map((car, index) => (
                <li key={index} className="car-item">
                  <h3>{car.make} {car.model}</h3>
                  <p>Fuel Type: {car.fuel_type}</p>
                  <p>Drive: {car.drive}</p>
                  <p>Cylinders: {car.cylinders}</p>
                  <p>Transmission: {car.transmission}</p>
                  <p>Year: {car.year}</p>
                </li>
              ))}
            </ul>
          )}

          <button className="show-data-btn" onClick={handleShowData}>
            Show Car Information
          </button>

          {/* Parameter Buttons */}
          <div className="parameter-buttons">
            {make.map((item) => (
              <button key={item} onClick={() => handleBanParameter(item, 'make')}>{item}</button>
            ))}
            {fuelType.map((item) => (
              <button key={item} onClick={() => handleBanParameter(item, 'fuelType')}>{item}</button>
            ))}
            {drive.map((item) => (
              <button key={item} onClick={() => handleBanParameter(item, 'drive')}>{item}</button>
            ))}
            {cylinders.map((item) => (
              <button key={item} onClick={() => handleBanParameter(item, 'cylinders')}>{item}</button>
            ))}
            {transmission.map((item) => (
              <button key={item} onClick={() => handleBanParameter(item, 'transmission')}>{item}</button>
            ))}
          </div>
        </div>
      </div>
      

      <div className="grid2">
        <h1>Ban List</h1>
        <ul>
          {/* Display banned parameters */}
          {[...bannedMake, ...bannedFuelType, ...bannedDrive, ...bannedCylinders, ...bannedTransmission].map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
