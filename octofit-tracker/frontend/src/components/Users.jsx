import { useEffect, useState } from 'react';

const getApiBaseUrl = () => {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME;
  return codespaceName ? `https://${codespaceName}-8000.app.github.dev` : 'http://localhost:8000';
};

export function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const response = await fetch(`${getApiBaseUrl()}/api/users/`);
        if (!response.ok) {
          throw new Error('Unable to fetch users');
        }
        const payload = await response.json();
        setUsers(Array.isArray(payload) ? payload : payload.results || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadUsers();
  }, []);

  return (
    <section>
      <h2 className="h4 mb-3">Users</h2>
      {loading && <p>Loading users…</p>}
      {error && <p className="text-danger">{error}</p>}
      {!loading && !error && (
        <div className="row row-cols-1 row-cols-md-2 g-3">
          {users.map((user) => (
            <div className="col" key={user._id || user.id}>
              <div className="card h-100">
                <div className="card-body">
                  <h3 className="h6">{user.name}</h3>
                  <p className="mb-1">{user.email}</p>
                  <p className="mb-1">Goal: {user.goal}</p>
                  <p className="mb-0">Fitness level: {user.fitnessLevel}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
