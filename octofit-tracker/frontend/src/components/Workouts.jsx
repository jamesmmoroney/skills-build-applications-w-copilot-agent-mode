import { useEffect, useState } from 'react';
import { fetchCollection } from '../api.js';
import CollectionStatus from './CollectionStatus.jsx';
import CollectionTable from './CollectionTable.jsx';

const columns = [
  { key: 'name', label: 'Workout' },
  { key: 'type', label: 'Type' },
  { key: 'duration', label: 'Minutes' },
  { key: 'difficulty', label: 'Difficulty' },
  { key: 'description', label: 'Details' },
];

export default function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => { fetchCollection('workouts').then(setWorkouts).catch((reason) => setError(reason.message)).finally(() => setLoading(false)); }, []);
  return <section className="page-section"><div className="page-heading"><div><span className="eyebrow">Plan your next</span><h1>Workouts</h1><p>Suggestions shaped for different levels and goals.</p></div><span className="record-count">{workouts.length} plans</span></div><CollectionStatus loading={loading} error={error} count={workouts.length} />{!loading && !error && workouts.length > 0 && <CollectionTable columns={columns} rows={workouts} />}</section>;
}