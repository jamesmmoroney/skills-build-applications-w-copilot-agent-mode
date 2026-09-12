import { useEffect, useState } from 'react';
import { fetchCollection } from '../api.js';
import CollectionStatus from './CollectionStatus.jsx';
import CollectionTable from './CollectionTable.jsx';

const columns = [
  { key: 'name', label: 'Team' },
  { key: 'description', label: 'Focus' },
  { key: 'captainId', label: 'Captain' },
  { key: 'memberIds', label: 'Members' },
];

export default function Teams() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => { fetchCollection('teams').then(setTeams).catch((reason) => setError(reason.message)).finally(() => setLoading(false)); }, []);
  return <section className="page-section"><div className="page-heading"><div><span className="eyebrow">Competition</span><h1>Teams</h1><p>Find your crew and keep the momentum moving.</p></div><span className="record-count">{teams.length} teams</span></div><CollectionStatus loading={loading} error={error} count={teams.length} />{!loading && !error && teams.length > 0 && <CollectionTable columns={columns} rows={teams} />}</section>;
}