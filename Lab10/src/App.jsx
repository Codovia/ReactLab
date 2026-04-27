import { useEffect, useMemo, useState } from "react";
import "./App.css";

const DataFetcher = () => {
  const [data, setData] = useState([]),
    [q, setQ] = useState(""),
    [err, setErr] = useState(""),
    [load, setLoad] = useState(true);

  const fetchData = async ({ fromRefresh = false } = {}) => {
    if (fromRefresh) setLoad(true);

    try {
      const res = await fetch("https://jsonplaceholder.typicode.com/users");
      if (!res.ok) throw new Error("Fetch failed");
      setData(await res.json());
      setErr("");
    } catch (e) {
      setErr(e.message);
    } finally {
      setLoad(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchData();
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  const filtered = useMemo(
    () =>
      q
        ? data.filter((d) => d.name.toLowerCase().includes(q.toLowerCase()))
        : data,
    [data, q],
  );

  return (
    <main className="data-fetcher">
      <section className="hero">
        <p className="eyebrow">Lab 10</p>
        <h1>User Directory</h1>
        <p className="subtitle">
          Search and explore user records with live fetch updates.
        </p>
      </section>

      <section className="toolbar">
        <input
          className="search-input"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search by name..."
          aria-label="Search users by name"
        />
        <button
          className="refresh-btn"
          onClick={() => fetchData({ fromRefresh: true })}
          disabled={load}
        >
          {load ? "Refreshing..." : "Refresh Data"}
        </button>
      </section>

      {err && <p className="error">Error: {err}</p>}

      {load ? (
        <p className="loading">Loading users...</p>
      ) : (
        <div className="table-shell">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>City</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length ? (
                filtered.map(({ id, name, email, address }) => (
                  <tr key={id}>
                    <td>{name}</td>
                    <td>{email}</td>
                    <td>{address.city}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="no-results">
                    No results found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </main>
  );
};
export default DataFetcher;
