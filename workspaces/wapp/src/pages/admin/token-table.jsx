import { useCallback, useContext, useEffect, useState } from 'react'
import { 
  deleteToken,
  getTokens,
  updateToken
} from "../../data/api";

/* Global State */
import useAppState, { actionTypes } from '../../data/app-state';

/* Shared Components */ 
import Button from '../../components/button';
import { DataTable } from '../../components/table/bundles';
import Flex from '../../components/flex';

/* Assets */
import { 
  Lock, 
  LockSlash, 
  Trash 
} from 'iconoir-react';
import { InputSecret } from '../../components/input/bundles';

const TokenTable = () => {
  const [appState, dispatch] = useContext(useAppState);
  const [tokens, setTokens] = useState([]);

  const TABLE_HEADERS = [{
      "label": "Name",
      "key": "name",
      "sortable": false,
      "searchable": true,
    }, {
      "label": "Created At",
      "key": "createdAt",
      "sortable": true,
      "searchable": false,
      "template": (row) => new Date(row.createdAt).toLocaleDateString()
    }, {
      "label": "Owner",
      "key": "userId",
      "sortable": true,
      "searchable": true,
      "template": (row) => (
        <InputSecret 
          value={row.userId}
          onCopy={() => {
            dispatch({
              type: actionTypes.setAlertOn,
              payload: { type: 'success', message: 'User ID copied to clipboard!' }
            });
          }}
        />
      )
    },{
      "label": "Token",
      "key": "key",
      "sortable": false,
      "searchable": true,
      "template": (row) => (
        <InputSecret 
          value={row.key}
          onCopy={() => {
            dispatch({
              type: actionTypes.setAlertOn,
              payload: { type: 'success', message: 'Token key copied to clipboard!' }
            });
          }}
        />
      )
    }, { 
      "label": "Actions",
      "key": "_id",
      "sortable": false,
      "searchable": false,
      "align": "right",
      "template": (row) => (
        <Flex direction="row" justify="flex-end" align="center" gap={6}>
          <Button
            variant={row.status === "locked" ? "filled" : "outlined"}
            round
            size="small"
            aria-label={row.status === "locked" ? "Unlock token" : "Lock token"}
            onClick={() => {
              // Handle token view logic here
              console.log(`Lock token: ${row._id} ${row.key}`);
              updateToken(
                row._id, 
                { status: row.status && row.status === "locked"  ? 'active' :'locked' }, 
                (error, data) => {
                  if (error) {
                    console.error("Error locking token:", error);
                    dispatch({
                      type: actionTypes.setAlertOn,
                      payload: { type: 'error', message: 'Failed to lock token.' }
                    });
                    return;
                  }
                  setTokens(tokens.map(t => 
                    t._id === row._id ? { ...t, status: data.status } : t
                  ));
                }
              )
            }}
          >
            {row.status === "locked"  ? <LockSlash /> : <Lock />}
          </Button>
          <Button 
            variant="outlined" 
            round 
            size="small"
            aria-label="Delete token"
            onClick={() => {
              // Handle token deletion logic here
              console.log(`Delete token: ${row._id} ${row.key}`);
              deleteToken(row._id, (error, data) => {
                if (error) {
                  console.error("Error deleting token:", error);
                  dispatch({
                    type: actionTypes.setAlertOn,
                    payload: { type: 'error', message: `Error deleting token: ${error.message}` }
                  });
                  return;
                } else {
                  console.log("Token deleted successfully");
                  setTokens(tokens.filter(t => t._id !== row._id));
                  dispatch({
                    type: actionTypes.setAlertOn,
                    payload: { type: 'success', message: 'Token deleted successfully!' }
                  });
                }
              });
            }}
          >
            <Trash />
          </Button>
        </Flex>
      )
    }];

  const fetchTokens = useCallback(() => {
    // Fetch existing tokens when component mounts
    dispatch({ 
      type: actionTypes.setLoadingOn, 
      payload: 'TokenTable.getTokens' 
    });
    getTokens({ 
        userId: appState.supervisedSession._id 
      }, 
      (error, data) => {
        dispatch({ type: actionTypes.setLoadingOff, payload: 'TokenTable.getTokens' });

        if (error) {
          console.error("Error fetching tokens:", error);
          dispatch({
            type: actionTypes.setAlertOn,
            payload: { type: 'error', message: 'Failed to fetch tokens.' }
          });
          return;
        }
        
        console.log("Fetched tokens:", data);
        setTokens(data);
      }
    );
  }, [tokens])

  useEffect(() => {
    fetchTokens()
  }, []);

  return (
    <>
      <DataTable 
        summary="List of tokens"
        columns={TABLE_HEADERS}
        data={tokens}
      />
    </>
  )
}

export default TokenTable;