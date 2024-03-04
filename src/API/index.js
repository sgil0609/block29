const cohortName = "2311-FSA-ET-WEB-PT-SF";
const API_URL = `https://fsa-puppy-bowl.herokuapp.com/api/${cohortName}/players`;

export const fetchAllPlayers = async () => {
  const response = await fetch(API_URL);
  const data = await response.json();
  return data.players;
};

export const addNewPlayer = async (player) => {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(player),
  });
  const data = await response.json();
  return data.player;
};

export const removePlayer = async (playerId) => {
  await fetch(`${API_URL}/${playerId}`, { method: 'DELETE' });
};
