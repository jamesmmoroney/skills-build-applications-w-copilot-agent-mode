import { useEffect, useState } from 'react';
import { fetchCollection } from '../api.js';
import CollectionStatus from './CollectionStatus.jsx';
import CollectionTable from './CollectionTable.jsx';

const columns = [
  { key: 'rank', label: 'Rank' },
  { key: 'username', label: 'Athlete' },
  { key: 'points', label: 'Points' },
  { key: 'period', label: 'Period' },
];

export default function Leaderboard() {
  const endpoint = import.meta.env.VITE_CODESPACE_NAME
    ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/leaderboard/`
    : 'http://localhost:8000/api/leaderboard/';
  const [leaders, setLeaders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => { fetchCollection(endpoint).then(setLeaders).catch((reason) => setError(reason.message)).finally(() => setLoading(false)); }, [endpoint]);
  return <section className="page-section"><div className="page-heading"><div><span className="eyebrow">September challenge</span><h1>Leaderboard</h1><p>Small wins add up. See who is climbing.</p></div><span className="record-count">{leaders.length} ranked</span></div><CollectionStatus loading={loading} error={error} count={leaders.length} />{!loading && !error && leaders.length > 0 && <CollectionTable columns={columns} rows={leaders} />}</section>;
}