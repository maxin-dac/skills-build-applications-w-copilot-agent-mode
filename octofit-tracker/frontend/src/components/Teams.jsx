import { useEffect, useState } from 'react';

const getApiBaseUrl = () => {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME;
  return codespaceName ? `https://${codespaceName}-8000.app.github.dev` : 'http://localhost:8000';
};

export function Teams() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadTeams = async () => {
      try {
        const response = await fetch(`${getApiBaseUrl()}/api/teams/`);
        if (!response.ok) {
          throw new Error('Unable to fetch teams');
        }
        const payload = await response.json();
        setTeams(Array.isArray(payload) ? payload : payload.results || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadTeams();
  }, []);

  return (
    <section>
      <h2 className="h4 mb-3">Teams</h2>
      {loading && <p>Loading teams…</p>}
      {error && <p className="text-danger">{error}</p>}
      {!loading && !error && (
        <div className="row row-cols-1 row-cols-md-2 g-3">
          {teams.map((team) => (
            <div className="col" key={team._id || team.id}>
              <div className="card h-100">
                <div className="card-body">
                  <h3 className="h6">{team.name}</h3>
                  <p className="mb-1">{team.description}</p>
                  <p className="mb-0">Points: {team.points}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
