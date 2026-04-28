import { useEffect, useState } from "react";
import api from "../api/axios";

export default function Profiles() {
  const [profiles, setProfiles] = useState([]);
  const [page, setPage] = useState(1);

  const fetchProfiles = async () => {
    const res = await api.get(`/api/profiles?page=${page}&limit=10`);
    setProfiles(res.data.data);
  };

  useEffect(() => {
    fetchProfiles();
  }, [page]);

  return (
    <div>
      <h2>Profiles</h2>

      <table border="1">
        <thead>
          <tr>
            <th>Name</th>
            <th>Age</th>
            <th>Country</th>
          </tr>
        </thead>
        <tbody>
          {profiles.map((p) => (
            <tr key={p.id}>
              <td>{p.name}</td>
              <td>{p.age}</td>
              <td>{p.country_name}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <button onClick={() => setPage(page - 1)}>Prev</button>
      <button onClick={() => setPage(page + 1)}>Next</button>
    </div>
  );
}