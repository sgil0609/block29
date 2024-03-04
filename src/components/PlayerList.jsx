import React from 'react';
import PlayerCard from './PlayerCard';

function PlayerList({ players }) {
  return (
    <div>
      {players.map(player => <PlayerCard key={player.id} player={player} />)}
    </div>
  );
}

export default PlayerList;
