function Table({ columns, children }) {
  return (
    <table border="1" width="100%" cellPadding="10">
      <thead>
        <tr>
          {columns.map((col) => (
            <th key={col}>{col}</th>
          ))}
        </tr>
      </thead>

      <tbody>
        {children}
      </tbody>
    </table>
  );
}

export default Table;