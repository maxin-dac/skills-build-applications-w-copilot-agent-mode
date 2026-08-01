import { useEffect, useState } from 'react';

const getApiBaseUrl = () => {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME;
  const baseUrl = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev/api/workouts`
    : 'http://localhost:8000/api/workouts';
  return baseUrl;
};

export function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadWorkouts = async () => {
      try {
        const response = await fetch(`${getApiBaseUrl()}`);
        if (!response.ok) {
          throw new Error('Unable to fetch workouts');
        }
        const payload = await response.json();
        setWorkouts(Array.isArray(payload) ? payload : payload.results || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadWorkouts();
  }, []);

  return (
    <section>
      <h2 className="h4 mb-3">Workouts</h2>
      {loading && <p>Loading workouts…</p>}
      {error && <p className="text-danger">{error}</p>}
      {!loading && !error && (
        <div className="row row-cols-1 row-cols-md-2 g-3">
          {workouts.map((workout) => (
            <div className="col" key={workout._id || workout.id}>
              <div className="card h-100">
                <div className="card-body">
                  <h3 className="h6">{workout.title}</h3>
                  <p className="mb-1">{workout.category}</p>
                  <p className="mb-1">{workout.difficulty}</p>
                  <p className="mb-0">{workout.durationMinutes} min</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
