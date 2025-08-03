import './styles.css'; 

const Table = ({ summary=null, ...props }) => {
  return (
    <table 
      {...props}
      className={[
        "cs-table",
        props.className || ''
      ].join(' ').trim()}
    >
      {summary 
        ? <caption className="sr-only">{summary}</caption>
        : <caption className="sr-only">Table Summary</caption>
      }
      {props.children}
    </table>
  );
};

const Tr = ({ children, ...props }) => {
  return (
    <tr 
      {...props}
      className={[
        "cs-table-row",
        props.className || ''
      ].join(' ').trim()}
    >
      {children}
    </tr>
  );
}

const Th = ({ children, ...props }) => {
  return (
    <th 
      {...props}
      className={[
        "cs-table-header",
        props.className || ''
      ].join(' ').trim()}
    >
      {children}
    </th>
  );
}

const Td = ({ children, ...props }) => {
  return (
    <td 
      {...props}
      className={[
        "cs-table-data",
        props.className || ''
      ].join(' ').trim()}
    >
      {children}
    </td>
  );
}

export default Table;

export { Table, Tr, Th, Td };