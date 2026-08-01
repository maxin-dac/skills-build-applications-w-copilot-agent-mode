import { NavLink, Route, Routes } from 'react-router-dom';
import { Activities } from './components/Activities.jsx';
import { Leaderboard } from './components/Leaderboard.jsx';
import { Teams } from './components/Teams.jsx';
import { Users } from './components/Users.jsx';
import { Workouts } from './components/Workouts.jsx';
import './App.css';

function App() {
  return (
    <div className="container py-4">
      <header className="mb-4">
        <h1 className="display-6">Octofit Tracker</h1>
        <p className="text-muted">
          Connects to the backend API using Vite environment variables. Define{' '}
          <code>VITE_CODESPACE_NAME</code> in <code>.env.local</code> for Codespaces, or leave it unset for localhost.
        </p>
      </header>

      <nav className="nav nav-pills flex-wrap mb-4">
        <NavLink className="nav-link" to="/">Overview</NavLink>
        <NavLink className="nav-link" to="/users">Users</NavLink>
        <NavLink className="nav-link" to="/teams">Teams</NavLink>
        <NavLink className="nav-link" to="/activities">Activities</NavLink>
        <NavLink className="nav-link" to="/leaderboard">Leaderboard</NavLink>
        <NavLink className="nav-link" to="/workouts">Workouts</NavLink>
      </nav>

      <Routes>
        <Route path="/" element={<section><h2 className="h4 mb-3">Overview</h2><p>Browse the Octofit API data through the routed views below.</p></section>} />
        <Route path="/users" element={<Users />} />
        <Route path="/teams" element={<Teams />} />
        <Route path="/activities" element={<Activities />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/workouts" element={<Workouts />} />
      </Routes>
    </div>
  );
}

export default App;
