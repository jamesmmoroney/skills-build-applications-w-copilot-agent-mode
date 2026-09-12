export default function CollectionStatus({ loading, error, count }) {
  if (loading) return <div className="empty-state">Loading records...</div>;
  if (error) return <div className="alert alert-warning mb-0">{error}</div>;
  if (!count) return <div className="empty-state">No records found.</div>;
  return null;
}