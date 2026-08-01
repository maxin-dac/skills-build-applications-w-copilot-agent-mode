import { useEffect, useState } from 'react';

const getApiBaseUrl = () => {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME;
  const baseUrl = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev/api/leaderboard`
    : 'http://localhost:8000/api/leaderboard';
  return baseUrl;
};

export function Leaderboard() {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadLeaderboard = async () => {
      try {
        const response = await fetch(`${getApiBaseUrl()}`);
        if (!response.ok) {
          throw new Error('Unable to fetch leaderboard');
        }
        const payload = await response.json();
        setEntries(Array.isArray(payload) ? payload : payload.results || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadLeaderboard();
  }, []);

  return (
    <section>
      <h2 className="h4 mb-3">Leaderboard</h2>
      {loading && <p>Loading leaderboard…</p>}
      {error && <p className="text-danger">{error}</p>}
      {!loading && !error && (
        <div className="list-group">
          {entries.map((entry) => (
            <div className="list-group-item d-flex justify-content-between align-items-center" key={entry._id || entry.id}>
              <span>
                #{entry.rank} {entry.userId?.name || 'Unknown'}
              </span>
              <span className="badge bg-primary rounded-pill">{entry.points} pts</span>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
