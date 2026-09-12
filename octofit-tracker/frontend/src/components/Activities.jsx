import { useEffect, useState } from 'react';
import { fetchCollection } from '../api.js';
import CollectionStatus from './CollectionStatus.jsx';
import CollectionTable from './CollectionTable.jsx';

const columns = [
  { key: 'type', label: 'Activity' },
  { key: 'duration', label: 'Minutes' },
  { key: 'distance', label: 'Distance' },
  { key: 'points', label: 'Points' },
  { key: 'completedAt', label: 'Completed' },
];

export default function Activities() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => { fetchCollection('activities').then(setActivities).catch((reason) => setError(reason.message)).finally(() => setLoading(false)); }, []);
  return <section className="page-section"><div className="page-heading"><div><span className="eyebrow">Your movement</span><h1>Activities</h1><p>A clear view of the work you have put in.</p></div><span className="record-count">{activities.length} logged</span></div><CollectionStatus loading={loading} error={error} count={activities.length} />{!loading && !error && activities.length > 0 && <CollectionTable columns={columns} rows={activities} />}</section>;
}