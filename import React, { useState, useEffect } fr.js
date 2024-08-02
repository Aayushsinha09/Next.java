import React, { useState, useEffect } from 'eact';
import axios from 'axios';

function App() {
  const [inputData, setInputData] = useState('');
  const [response, setResponse] = useState({});
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [filteredResponse, setFilteredResponse] = useState({});

  useEffect(() => {
    axios.get('https://your-heroku-app-url/bfhl')
     .then((response) => {
        console.log(response.data);
      })
     .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    try {
      const data = JSON.parse(inputData);
      axios.post('https://your-heroku-app-url/bfhl', { data })
       .then((response) => {
          setResponse(response.data);
        })
       .catch((error) => {
          console.error(error);
        });
    } catch (error) {
      console.error(error);
    }
  };

  const handleSelectChange = (event) => {
    const selectedOptions = event.target.value;
    setSelectedOptions(selectedOptions);
    const filteredResponse = {};
    selectedOptions.forEach((option) => {
      if (option === 'Alphabets') {
        filteredResponse.alphabets = response.alphabets;
      } else if (option === 'Numbers') {
        filteredResponse.numbers = response.numbers;
      } else if (option === 'Highest Alphabet') {
        filteredResponse.highest_alphabet = response.highest_alphabet;
      }
    });
    setFilteredResponse(filteredResponse);
  };

  return (
    <div>
      <h1>{rollNumber}</h1>
      <form onSubmit={handleSubmit}>
        <textarea value={inputData} onChange={(event) => setInputData(event.target.value)} />
        <button type="submit">Submit</button>
      </form>
      <select multiple value={selectedOptions} onChange={handleSelectChange}>
        <option value="Alphabets">Alphabets</option>
        <option value="Numbers">Numbers</option>
        <option value="Highest Alphabet">Highest Alphabet</option>
      </select>
      <div>
        {Object.keys(filteredResponse).map((key) => (
          <div key={key}>
            <h2>{key}</h2>
            <ul>
              {filteredResponse[key].map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;