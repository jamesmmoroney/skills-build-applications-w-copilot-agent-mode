import { useEffect, useState } from 'react';
import { fetchCollection } from '../api.js';
import CollectionStatus from './CollectionStatus.jsx';
import CollectionTable from './CollectionTable.jsx';

const columns = [
  { key: 'name', label: 'Name' },
  { key: 'username', label: 'Username' },
  { key: 'email', label: 'Email' },
  { key: 'fitnessLevel', label: 'Fitness level' },
];

export default function Users() {
  const endpoint = import.meta.env.VITE_CODESPACE_NAME
    ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/users/`
    : 'http://localhost:8000/api/users/';
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchCollection(endpoint).then(setUsers).catch((reason) => setError(reason.message)).finally(() => setLoading(false));
  }, [endpoint]);

  return <DataPage eyebrow="Community" title="Athletes" description="Everyone making progress with OctoFit."
    rows={users} columns={columns} loading={loading} error={error} />;
}

function DataPage({ eyebrow, title, description, rows, columns, loading, error }) {
  return <section className="page-section"><div className="page-heading"><div><span className="eyebrow">{eyebrow}</span><h1>{title}</h1><p>{description}</p></div><span className="record-count">{rows.length} records</span></div><CollectionStatus loading={loading} error={error} count={rows.length} />{!loading && !error && rows.length > 0 && <CollectionTable columns={columns} rows={rows} />}</section>;
}