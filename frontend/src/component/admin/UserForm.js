import React, { useState, useEffect } from "react";
import axios from "axios";
import { fetchOrganizations } from "../../data/organizationService"; // Import fetchOrganizations function
import { useUserInfo } from "../../utils/authUtils"; // Import useUserInfo hook

const UserForm = () => {
  const userInfo = useUserInfo(); // Get user information
  const [formData, setFormData] = useState({
    organization: "",
    full_name: "",
    email: "",
    password: "",
    phone: "",
    role: "",
    created_by: userInfo ? userInfo.userId : "", // Set created_by to logged-in user's ID
  });

  const [organizations, setOrganizations] = useState([]);

  useEffect(() => {
    const loadOrganizations = async () => {
      try {
        const orgs = await fetchOrganizations();
        setOrganizations(orgs);
      } catch (error) {
        console.error("Error loading organizations:", error);
      }
    };

    loadOrganizations();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/users/add",
        formData
      );
      if (response.data.success) {
        alert("User added successfully");
        setFormData({
          organization: "",
          full_name: "",
          email: "",
          password: "",
          phone: "",
          role: "",
          created_by: userInfo ? userInfo.userId : "", // Reset created_by to logged-in user's ID
        });
      }
    } catch (error) {
      alert(`Error: ${error.response.data.error}`);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Organization</label>
        <select
          name="organization"
          value={formData.organization}
          onChange={handleChange}
          required
        >
          <option value="">Select Organization</option>
          {organizations.map((org) => (
            <option key={org._id} value={org._id}>
              {org.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>Full Name</label>
        <input
          type="text"
          name="full_name"
          value={formData.full_name}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Password</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Phone</label>
        <input
          type="text"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Role</label>
        <select
          name="role"
          value={formData.role}
          onChange={handleChange}
          required
        >
          <option value="">Select Role</option>
          <option value="super-admin">Super Admin</option>
          <option value="AACEB-staff">AACEB Staff</option>
          <option value="admin">Admin</option>
          <option value="sub-city-staff">Sub City Staff</option>
          <option value="school-admin">School Admin</option>
        </select>
      </div>
      <button type="submit">Add User</button>
    </form>
  );
};

export default UserForm;
