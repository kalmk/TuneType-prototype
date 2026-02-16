import { useEffect, useState } from "react";
import api from "../lib/axios"; // use your axios instance

export default function JoinedUsers() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    api
      .get("/users/all") // automatically uses baseURL from axios instance
      .then((res) => setUsers(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <ul>
        {users.map((user) => (
          <li key={user._id}>{user.userName}</li>
        ))}
      </ul>
    </div>
  );
}
