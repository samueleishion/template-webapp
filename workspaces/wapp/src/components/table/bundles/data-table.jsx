import { useEffect } from 'react';

/* Shared Components */
import Card from '../../card';
import Flex from '../../flex'; 

/* Assets */
import { WarningHexagon } from 'iconoir-react';

/* Internal Components */
import {
  Table, 
  Tr,
  Th,
  Td
} from '../index';

const DataTable = ({ summary=null, data=[], columns=[], ...props }) => {
  if (!data.length || !columns.length) {
    return (
      <Flex 
        direction="column" 
        grow={1} 
        align="center" 
        justify="center"
        style={{ 
          blockSize: '120px',
          padding: '40px',
          gap: '15px',
        }}
      >
        <WarningHexagon style={{ scale: '2'}}/>
        <p className="cs-data-table-empty">No data available.</p>
      </Flex>
    );
  }

  // Ensure columns are in the correct format
  if (typeof columns[0] === 'string') {
    columns = columns.map(col => ({ label: col, sortable: false }));
  }

  // Render the table
  return (
    <Table summary={summary} {...props}>
      <thead>
        <Tr>
          {columns.map((col, index) => (
            <Th key={index}>
              <Flex 
                direction="row" 
                align="center" 
                justify={'align' in col && col['align'] === "right" 
                  ? "flex-end" 
                  : "flex-start"
                }
              >
                {col.label}
              </Flex>
            </Th>
          ))}
        </Tr>
      </thead>
      <tbody>
        {data.map((row, rowIndex) => (
          <Tr key={rowIndex}>
            {columns.map((col, colIndex) => (
              <Td key={colIndex}>
                {'template' in col
                  ? col.template(row)
                  : row[col.key]
                }
                {/* {row[col.key]} */}
              </Td>
            ))}
          </Tr>
        ))}
      </tbody>
    </Table>
  );
};

export default DataTable;