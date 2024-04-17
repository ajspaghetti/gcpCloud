import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Item {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  due_date: string;
  category_id: string;
  user_id: string;
  category?: Category;
  user?: User;
}

interface User {
  id: string;
  username: string;
}

interface Category {
  id: string;
  name: string;
}

const ItemManager: React.FC = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [completed, setCompleted] = useState(false);
  const [dueDate, setDueDate] = useState('');
  const [categoryName, setCategoryName] = useState('');
  const [username, setUsername] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [userId, setUserId] = useState('');

  useEffect(() => {
    fetchItems();
    fetchUsers();
    fetchCategories();
  }, []);

  useEffect(() => {
    if (selectedItem) {
      setTitle(selectedItem.title);
      setDescription(selectedItem.description);
      setCompleted(selectedItem.completed);
      setDueDate(selectedItem.due_date);
      setCategoryName(categories.find(cat => cat.id === selectedItem.category_id)?.name || '');
      setUsername(users.find(usr => usr.id === selectedItem.user_id)?.username || '');
    }
  }, [selectedItem, categories, users]);

  const fetchItems = async () => {
    const response = await axios.get('http://localhost:3001/items?include=user,category');
    setItems(response.data);
  };

  const fetchUsers = async () => {
    const response = await axios.get('http://localhost:3001/users');
    setUsers(response.data);
  };

  const fetchCategories = async () => {
    const response = await axios.get('http://localhost:3001/categories');
    setCategories(response.data);
  };

  const handleSelectItem = (id: string) => {
    const item = items.find(item => item.id === id);
    setSelectedItem(item ?? null);
  };

  const handleUpdateItem = async () => {
    if (!selectedItem) return;

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

    const updatedItem = await axios.put(`http://localhost:3001/items/${selectedItem.id}`, {
      title,
      description,
      completed,
      due_date: dueDate,
      category_id: finalCategoryId,
      user_id: finalUserId,
    });

    fetchItems();  // Refresh the items list
    setSelectedItem(null);  // Clear selection
  };

  const handleDeleteItem = async () => {
    if (!selectedItem) return;

    await axios.delete(`http://localhost:3001/items/${selectedItem.id}`);
    fetchItems();  // Refresh the items list
    setSelectedItem(null);  // Clear selection
  };

  return (
    <div className="item-manager-row">
      <h1>Item Manager</h1>
      <ul className="item-list">
        {items.map(item => (
          <li key={item.id} onClick={() => handleSelectItem(item.id)}>
            <span className="item-property">Title: {item.title}</span>
            <span className="item-property">Desc: {item.description}</span>
            <span className="item-property">Completed: {item.completed ? 'Yes' : 'No'}</span>
            <span className="item-property">Due: {item.due_date ? new Date(item.due_date).toLocaleDateString() : 'N/A'}</span>
            <span className="item-property">Category: {item.category ? item.category.name : 'No Category'}</span>
            <span className="item-property">User: {item.user ? item.user.username : 'No User'}</span>
          </li>
        ))}
      </ul>
      {selectedItem && (
        <div>
          <h2>Edit Item</h2>
          <form className="form-row" onSubmit={(e) => { e.preventDefault(); handleUpdateItem(); }}>
            <label>Title: <input type="text" value={title} onChange={e => setTitle(e.target.value)} /></label>
            <label>Description: <input type="text" value={description} onChange={e => setDescription(e.target.value)} /></label>
            <label>Completed: <input type="checkbox" checked={completed} onChange={() => setCompleted(!completed)} /></label>
            <label>Due Date: <input type="date" value={dueDate} onChange={e => setDueDate(e.target.value)} /></label>
            <label>Category: <input type="text" value={categoryName} onChange={e => setCategoryName(e.target.value)} /></label>
            <label>User: <input type="text" value={username} onChange={e => setUsername(e.target.value)} /></label>
            <button type="submit">Update Item</button>
            <button type="button" onClick={handleDeleteItem}>Delete Item</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default ItemManager;
