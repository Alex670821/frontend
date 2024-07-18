import React, { useState, useEffect } from 'react';
import '../styles/Users.css'; // Importar el archivo CSS

const Users = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [following, setFollowing] = useState({});

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/search/?q=${searchTerm}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log('Data fetched:', data);
        setUsers(data);
      })
      .catch(error => console.error('Error fetching users:', error));
  }, [searchTerm]);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleFollow = (userId) => {
    const token = localStorage.getItem('token');
    fetch(`http://127.0.0.1:8000/api/accounts/follow/${userId}/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${token}`,
      },
    })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        setFollowing(prevState => ({
          ...prevState,
          [userId]: !prevState[userId],
        }));
      }
    })
    .catch(error => console.error('Error following/unfollowing user:', error));
  };

  return (
    <div className="users-container">
      <h1>Lista de Usuarios</h1>
      <input 
        type="text" 
        placeholder="Buscar usuarios" 
        value={searchTerm} 
        onChange={handleSearch} 
        className="search-input"
      />
      <ul className="user-list">
        {users.length > 0 ? (
          users.map((user, index) => (
            <li key={index}>
              <strong>{user.first_name} {user.last_name}</strong> <span>{user.email}</span>
              <button onClick={() => handleFollow(user.id)}>
                {following[user.id] ? 'Unfollow' : 'Follow'}
              </button>
            </li>
          ))
        ) : (
          <li>No users found</li>
        )}
      </ul>
    </div>
  );
};

export default Users;
