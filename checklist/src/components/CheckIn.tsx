import React, { useState } from 'react';

const CheckIn: React.FC = () => {
  const [username, setUsername] = useState('');
  const handleCheckIn = () => {
    // Simulate setting the user in a global state or local storage
    localStorage.setItem('username', username);
    window.location.reload();  // Reload to update the navbar with the username
  };

  return (
    <div>
      <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Enter your username" />
      <button onClick={handleCheckIn}>Check In</button>
    </div>
  );
};

export default CheckIn;
