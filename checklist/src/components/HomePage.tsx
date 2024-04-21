// HomePage.tsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ItemManager from './ItemManager';
import ItemCreate from './ItemCreate';
import WebSocketService from '../services/WebSocketService';

interface HomePageProps {
  ws: WebSocketService | null;
}

interface User {
  id: string;
  username: string;
}

interface Category {
  id: string;
  name: string;
}

const HomePage: React.FC<HomePageProps> = ({ ws }) => {
  const [items, setItems] = useState<any[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    axios.get('http://localhost:3000/items')
    .then(response => setItems(response.data))
    .catch(error => setError('Error fetching items: ' + error.message));

    axios.get('http://localhost:3000/users')
      .then(response => setUsers(response.data))
      .catch(error => setError('Error fetching users: ' + error.message));

    axios.get('http://localhost:3000/categories')
      .then(response => setCategories(response.data))
      .catch(error => setError('Error fetching categories ' + error.message));
  }, []);

  return (
    <div>
      {error ? <p>{error}</p> :
      <>
        <ItemCreate users={users} categories={categories} ws={ws} />
        <ItemManager ws={ws} />
      </>}
    </div>
  );
};

export default HomePage;
