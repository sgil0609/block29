import React, { useState } from 'react';

const API_URL = `https://fsa-puppy-bowl.herokuapp.com/api/2311-FSA-ET-WEB-PT-SF/players`;

function NewPlayerForm({ onAddPlayer }) {
  const [formData, setFormData] = useState({
    name: '',
    breed: '',
    status: 'field', // Default status
    imageUrl: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });
      if (!response.ok) {
        throw new Error('Failed to add new player');
      }
      const newPlayer = await response.json();
      onAddPlayer(newPlayer); // Callback to update player list in the parent component
      // Reset form
      setFormData({
        name: '',
        breed: '',
        status: 'field',
        imageUrl: ''
      });
    } catch (error) {
      console.error('Error adding new player:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} id="new-player-form">
      <div>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="breed">Breed:</label>
        <input
          type="text"
          id="breed"
          name="breed"
          value={formData.breed}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="status">Status:</label>
        <select
          id="status"
          name="status"
          value={formData.status}
          onChange={handleChange}
        >
          <option value="field">Field</option>
          <option value="bench">Bench</option>
        </select>
      </div>
      <div>
        <label htmlFor="imageUrl">Image URL:</label>
        <input
          type="text"
          id="imageUrl"
          name="imageUrl"
          value={formData.imageUrl}
          onChange={handleChange}
        />
      </div>
      <button type="submit">Add Player</button>
    </form>
  );
}

export default NewPlayerForm;
