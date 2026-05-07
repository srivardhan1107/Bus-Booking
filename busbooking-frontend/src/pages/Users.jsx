import { useEffect, useState } from "react";

import {
  getAllUsers,
  createUser,
  updateUser,
  deleteUser
} from "../services/userService";

const Users = () => {

  const [users, setUsers] = useState([]);

  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "USER"
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {

    try {

      const response = await getAllUsers();

      setUsers(response.data);

    } catch (error) {

      console.log(error);
    }
  };

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      if (editingId) {

        await updateUser(editingId, formData);

        setEditingId(null);

      } else {

        await createUser(formData);
      }

      fetchUsers();

      setFormData({
        name: "",
        email: "",
        password: "",
        role: "USER"
      });

    } catch (error) {

      console.log(error);
    }
  };

  const handleEdit = (user) => {

    setEditingId(user.id);

    setFormData({
      name: user.name,
      email: user.email,
      password: user.password,
      role: user.role
    });
  };

  const handleDelete = async (id) => {

    try {

      await deleteUser(id);

      fetchUsers();

    } catch (error) {

      console.log(error);
    }
  };

  return (

    <div className="page">

      <h1>User Management</h1>

      <form onSubmit={handleSubmit} className="form">

        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <select
          name="role"
          value={formData.role}
          onChange={handleChange}
        >
          <option value="USER">USER</option>

          <option value="ADMIN">ADMIN</option>
        </select>

        <button type="submit">

          {editingId ? "Update User" : "Add User"}

        </button>

      </form>

      <div className="card-container">

        {
          users.map((user) => (

            <div key={user.id} className="card">

              <h3>{user.name}</h3>

              <p>{user.email}</p>

              <p>{user.role}</p>

              <div className="btn-group">

                <button
                  onClick={() => handleEdit(user)}
                >
                  Edit
                </button>

                <button
                  onClick={() => handleDelete(user.id)}
                >
                  Delete
                </button>

              </div>

            </div>
          ))
        }

      </div>

    </div>
  );
};

export default Users;