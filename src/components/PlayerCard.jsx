import React from 'react';

function PlayerCard({ player }) {
  return (
    <div>
      <p>Name: {player.name}</p>
      <p>ID: {player.id}</p>
      <button onclick="renderSinglePlayer(${player.id})">See details</button>
      <button onclick="removePlayer(${player.id})">Remove from roster</button>
    </div>
  );
}

export default PlayerCard;
