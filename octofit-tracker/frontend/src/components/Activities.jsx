import { useEffect, useState } from 'react';
import { getApiBaseUrl } from '../utils/api';

export function Activities() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadActivities = async () => {
      try {
        const response = await fetch(`${getApiBaseUrl()}/api/activities/`);
        if (!response.ok) {
          throw new Error('Unable to fetch activities');
        }
        const payload = await response.json();
        setActivities(Array.isArray(payload) ? payload : payload.results || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadActivities();
  }, []);

  return (
    <section>
      <h2 className="h4 mb-3">Activities</h2>
      {loading && <p>Loading activities…</p>}
      {error && <p className="text-danger">{error}</p>}
      {!loading && !error && (
        <div className="row row-cols-1 row-cols-md-2 g-3">
          {activities.map((activity) => (
            <div className="col" key={activity._id || activity.id}>
              <div className="card h-100">
                <div className="card-body">
                  <h3 className="h6">{activity.type}</h3>
                  <p className="mb-1">{activity.durationMinutes} min</p>
                  <p className="mb-1">{activity.caloriesBurned} kcal</p>
                  <p className="mb-0">{activity.notes}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
