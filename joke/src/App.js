import React, { useState, useEffect } from 'react';
import './App.css';
import axios from "axios";

const validJoke = (joke, badWords) => {
  
  const lower = joke.toLowerCase();
  const jokeArray = lower.split(" ");

  return !badWords.find(word => jokeArray.includes(word));
}

function App() {

  const [joke, setJoke] = useState(0);
  const badWords = ["the", "or", "and"];

  const generateJoke = (countBadJokes = 0) => {

    axios.get("http://localhost:3001/joke")
    .then((response) => {

      const isValidJoke = validJoke(response.data, badWords);

      if(isValidJoke) {
        return setJoke( response.data )
      } 

      countBadJokes++;
      if(countBadJokes <= 10) {
        generateJoke(countBadJokes)
        
      }
    })
  }

  useEffect(() => {
    generateJoke();
  }, []);


  return (
    <div className="App">
      <header className="App-header">
        <button onClick={() => generateJoke()}>Joke</button>
        <p>{joke}</p>
      </header>
    </div>
  );
}


/* Step 3:
    * The free public API is too slow!
    * Create a caching layer between your app and the public API:
        * It should cache 10 random jokes;
        * It should serve a joke from this cache.
        * */

export default App;
