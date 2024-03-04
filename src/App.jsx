import React, { useState, useEffect } from 'react';
import NewPlayerForm from './components/NewPlayerForm';
import PlayerList from './components/PlayerList';

const cohortName = "2311-FSA-ET-WEB-PT-SF";
const API_URL = `https://fsa-puppy-bowl.herokuapp.com/api/${cohortName}/players`;

function App() {
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    const fetchAllPlayers = async () => {
      try {
        const response = await fetch(API_URL);
        const json = await response.json();
        setPlayers(json.data.players);
      } catch (err) {
        console.error("Uh oh, trouble fetching players!", err);
      }
    };

    fetchAllPlayers();
  }, []);

  const handleAddPlayer = async (playerObj) => {
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(playerObj),
      });

      if (!response.ok) {
        throw new Error(`Failed to add a new player: ${response.status}`);
      }

      const addedPlayer = await response.json();
      setPlayers(prevPlayers => [...prevPlayers, addedPlayer.data.player]);
    } catch (err) {
      console.error("Oops, something went wrong with adding that player!", err);
    }
  };

  return (
    <div className="App">
      <h1>Puppy Bowl!</h1>
      <NewPlayerForm onAddPlayer={handleAddPlayer} />
      <PlayerList players={players} />
    </div>
  );
}

export default App;
