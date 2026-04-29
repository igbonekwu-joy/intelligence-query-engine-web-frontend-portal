import { useState } from "react";
import api from "../api/axios";

export default function Search() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    const res = await api.get(`/api/profiles/search?q=${query}`);
    setResults(res.data.data);
  };

  return (
    <div>
      <h2>Search</h2>
 
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>

      {results.map((r) => (
        <div key={r.id}>{r.name}</div>
      ))}
    </div>
  );
}