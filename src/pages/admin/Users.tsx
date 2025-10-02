import React, { useState, useEffect } from "react";

interface User {
  _id?: string;
  username: string;
  email: string;
  role: string;
  password?: string;
}

export default function Users() {
  const [users, setUsers] = useState<User[]>([]);
  const [newUser, setNewUser] = useState<User>({
    username: "",
    email: "",
    password: "",
    role: "user",
  });
  const [editingUserId, setEditingUserId] = useState<string | null>(null);
  const [editingUser, setEditingUser] = useState<User>({
    username: "",
    email: "",
    role: "user",
    password: "",
  });

  const API_URL = "http://localhost:7000/api/auth";

  // ✅ Fetch users with token
  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("token"); // get token
      if (!token) throw new Error("No token found. Please login.");

      const res = await fetch(`${API_URL}/users`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!res.ok) throw new Error("Failed to fetch users");
      const data = await res.json();
      setUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const targetUser = editingUserId ? editingUser : newUser;
    const setTarget = editingUserId ? setEditingUser : setNewUser;
    setTarget({ ...targetUser, [e.target.name]: e.target.value });
  };

  // Add new user
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token found. Please login.");

      const res = await fetch(`${API_URL}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newUser),
      });

      if (res.ok) {
        setNewUser({ username: "", email: "", password: "", role: "user" });
        fetchUsers();
      } else {
        const data = await res.json();
        throw new Error(data.message || "Failed to add user");
      }
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };

  
  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token found. Please login.");

      const res = await fetch(`${API_URL}/users/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.ok) fetchUsers();
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  
  const handleEdit = (user: User) => {
    setEditingUserId(user._id || null);
    setEditingUser({
      username: user.username,
      email: user.email,
      role: user.role,
      password: "",
    });
  };

  // Update user
  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingUserId) return;

    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token found. Please login.");

      const res = await fetch(`${API_URL}/users/${editingUserId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(editingUser),
      });

      if (res.ok) {
        setEditingUserId(null);
        setEditingUser({ username: "", email: "", password: "", role: "user" });
        fetchUsers();
      }
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Users Page</h1>

      {/* Users Table */}
      <div className="bg-white shadow rounded-lg p-4 mb-6 overflow-x-auto">
        <h2 className="text-xl font-semibold mb-4">Users List</h2>
        <table className="w-full table-auto border-collapse">
          <thead>
            <tr className="bg-yellow-400 text-white">
              <th className="border px-4 py-2">Username</th>
              <th className="border px-4 py-2">Email</th>
              <th className="border px-4 py-2">Role</th>
              <th className="border px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td className="border px-4 py-2">{user.username}</td>
                <td className="border px-4 py-2">{user.email}</td>
                <td className="border px-4 py-2 capitalize">{user.role}</td>
                <td className="border px-4 py-2 space-x-2">
                  <button
                    onClick={() => handleEdit(user)}
                    className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
                  >
                    Edit
                  </button>
                  {user._id && (
                    <button
                      onClick={() => handleDelete(user._id!)}
                      className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add/Edit User Form */}
      <div className="bg-white shadow rounded-lg p-4">
        <h2 className="text-xl font-semibold mb-4">
          {editingUserId ? "Edit User" : "Add New User"}
        </h2>
        <form onSubmit={editingUserId ? handleUpdate : handleSubmit} className="space-y-4">
          <div>
            <label className="block font-semibold mb-1">Username</label>
            <input
              type="text"
              name="username"
              value={editingUserId ? editingUser.username : newUser.username}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              required
            />
          </div>
          <div>
            <label className="block font-semibold mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={editingUserId ? editingUser.email : newUser.email}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              required
            />
          </div>
          <div>
            <label className="block font-semibold mb-1">Password</label>
            <input
              type="password"
              name="password"
              value={editingUserId ? editingUser.password : newUser.password}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              required={!editingUserId}
            />
          </div>
          <div>
            <label className="block font-semibold mb-1">Role</label>
            <select
              name="role"
              value={editingUserId ? editingUser.role : newUser.role}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <button
            type="submit"
            className="bg-yellow-400 text-white font-bold px-4 py-2 rounded hover:bg-yellow-500"
          >
            {editingUserId ? "Update User" : "Add User"}
          </button>
          {editingUserId && (
            <button
              type="button"
              onClick={() => setEditingUserId(null)}
              className="ml-2 bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
            >
              Cancel
            </button>
          )}
        </form>
      </div>
    </div>
  );
}
