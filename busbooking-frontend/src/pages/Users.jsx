import { useEffect, useState } from "react";
import { getAllUsers } from "../services/userService";

const Users = () => {

  const [users, setUsers] = useState([]);

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

  return (
    <div>

      <h1>Users</h1>

      {
        users.map((user) => (
          <div key={user.id}>
            <h3>{user.name}</h3>
            <p>{user.email}</p>
          </div>
        ))
      }

    </div>
  );
};

export default Users;