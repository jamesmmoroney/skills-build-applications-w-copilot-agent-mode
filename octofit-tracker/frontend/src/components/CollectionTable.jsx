import { displayValue } from '../api.js';

export default function CollectionTable({ columns, rows }) {
  return (
    <div className="table-responsive data-table-wrap">
      <table className="table align-middle mb-0 data-table">
        <thead>
          <tr>
            {columns.map((column) => <th key={column.key}>{column.label}</th>)}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row._id || row.id || JSON.stringify(row)}>
              {columns.map((column) => (
                <td key={column.key}>{displayValue(row[column.key])}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}