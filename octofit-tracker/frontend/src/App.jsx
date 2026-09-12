import { Link, NavLink, Route, Routes } from 'react-router-dom';
import Activities from './components/Activities.jsx';
import Leaderboard from './components/Leaderboard.jsx';
import Teams from './components/Teams.jsx';
import Users from './components/Users.jsx';
import Workouts from './components/Workouts.jsx';
import './App.css';

const navigation = [
  ['/', 'Overview'],
  ['/activities', 'Activities'],
  ['/workouts', 'Workouts'],
  ['/teams', 'Teams'],
  ['/leaderboard', 'Leaderboard'],
  ['/users', 'Athletes'],
];

function Overview() {
  return <section className="overview"><span className="eyebrow">OctoFit Tracker</span><h1>Make progress visible.</h1><p className="lead">One place for movement, friendly competition, and a smarter next workout.</p><div className="overview-actions"><Link className="btn btn-primary" to="/activities">Log activity</Link><Link className="btn btn-outline-dark" to="/workouts">Browse workouts</Link></div><div className="overview-note"><span className="pulse-dot" /> Live team data is ready to explore</div></section>;
}

export default function App() {
  return <div className="app-shell"><header className="topbar"><Link className="brand" to="/"><img src="/octofitapp-small.png" alt="" /><span>octofit<span>/</span>tracker</span></Link><span className="status-chip"><span className="pulse-dot" /> API connected</span></header><div className="app-layout"><aside className="sidebar"><p className="sidebar-label">Workspace</p><nav>{navigation.map(([path, label]) => <NavLink key={path} to={path} end={path === '/'}>{label}</NavLink>)}</nav><div className="sidebar-footer"><span className="mini-label">This week</span><strong>Keep showing up.</strong><span>Consistency beats intensity.</span></div></aside><main className="content"><Routes><Route path="/" element={<Overview />} /><Route path="/activities" element={<Activities />} /><Route path="/workouts" element={<Workouts />} /><Route path="/teams" element={<Teams />} /><Route path="/leaderboard" element={<Leaderboard />} /><Route path="/users" element={<Users />} /></Routes></main></div></div>;
}