import React, { useState } from 'react';
import axios from 'axios';

interface User {
  id: string;
  username: string;
}

interface Category {
  id: string;
  name: string;
}

const ItemCreate: React.FC<{ users: User[], categories: Category[] }> = ({ users, categories }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [completed, setCompleted] = useState(false);
  const [dueDate, setDueDate] = useState('');
  const [categoryName, setCategoryName] = useState('');
  const [username, setUsername] = useState('');
  const [items, setItems] = useState<any[]>([]); 

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const fetchItems = async () => {
        const response = await axios.get('http://localhost:3001/items?include=user,category');
        setItems(response.data);
    };

    let finalCategoryId = '';
    const category = categories.find(cat => cat.name === categoryName);
    if (category) {
      finalCategoryId = category.id;
    } else {
      const newCategory = await axios.post('http://localhost:3001/categories', { name: categoryName });
      finalCategoryId = newCategory.data.id;
    }

    let finalUserId = '';
    const user = users.find(usr => usr.username === username);
    if (user) {
      finalUserId = user.id;
    } else {
      const newUser = await axios.post('http://localhost:3001/users', { username });
      finalUserId = newUser.data.id;
    }



    await axios.post('http://localhost:3001/items', {
      title,
      description,
      completed,
      due_date: dueDate,
      category_id: finalCategoryId,
      user_id: finalUserId,
    });

    setTitle('');
    setDescription('');
    setCompleted(false);
    setDueDate('');
    setCategoryName('');
    setUsername('');
    fetchItems();  // Refresh the items list
  };

  return (
    <div className="item-create-row">
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input type="text" placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} required />
        </label>
        <label>
          Description:
          <input type="text" placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} required />
        </label>
        <label>
          Completed:
          <input type="checkbox" checked={completed} onChange={() => setCompleted(!completed)} />
        </label>
        <label>
          Due Date:
          <input type="date" value={dueDate} onChange={e => setDueDate(e.target.value)} />
        </label>
        <label>
          Category:
          <input type="text" placeholder="New or Existing Category" value={categoryName} onChange={e => setCategoryName(e.target.value)} required />
        </label>
        <label>
          User:
          <input type="text" placeholder="New or Existing User" value={username} onChange={e => setUsername(e.target.value)} required />
        </label>
        <button type="submit">Create Item</button>
      </form>
    </div>
  );
};

export default ItemCreate;
