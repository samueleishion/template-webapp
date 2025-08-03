import { useContext, useState, useEffect } from "react";

/* Global State */
import useAppState, { actionTypes } from "../../data/app-state";
import { getUsers } from "../../data/api";

/* Shared Components */
import Avatar from '../../components/avatar'; 
import Button from '../../components/button'; 
import { DataTable } from "../../components/table/bundles";
import Flex from '../../components/flex';
import Link from "../../components/link";

/* Assets */ 
import { 
  Code,
  Developer,
  EditPencil,
  Key,
  User,
  UserCrown
} from 'iconoir-react'

const UserTable = () => {
  const [appState, dispatch] = useContext(useAppState);
  const [data, setData] = useState([]);

  const TABLE_HEADERS = [{
    "label": "Name",
    "key": "name",
    "sortable": true,
    "searchable": true,
    "template": (row) => (
      <Flex direction="row" justify="flex-start" align="center" gap={9}>
        <Avatar src={row.picture} size="small" /> 
        {row.name}
      </Flex>
    )
  }, {
    "label": "Email",
    "key": "email",
    "sortable": true, 
    "searchable": true,
    "template": (row) => (
      <Link href={`mailto:${row.email}`}>{row.email}</Link>
    )
  }, {
    "label": "Role",
    "key": "role",
    "sortable": true, 
    "searchable": true,
    "template": (row) => (
      <Flex direction="row" align="center" gap={6}>
        {row.role === "admin"
          ? <Key />
          : row.role === "developer"
          ? <Developer />
          : <User />
        }
        {/* <Code /> */}
        <code>
          {row.role}
        </code>
      </Flex>
    )
  }, {
    "label": "Actions",
    "key": "_id",
    "sortable": false,
    "searchable": false,
    "align": "right",
    "template": (row) => (
      <Flex direction="row" justify="flex-end" align="center" gap={6}>
        <Button variant="outlined" round size="small" aria-label="Edit ">
          <EditPencil />
        </Button>
      </Flex>
    )
  }]

  const dispatchNotification = (loadingKey, alertType=null, alertMessage=null) => {
    dispatch({ type: actionTypes.setLoadingOff, payload: loadingKey });
    if (alertType && alertMessage) {
      dispatch({ type: actionTypes.setAlertOn, payload: { type: alertType, message: alertMessage } });
    }
  };

  const fetchUsers = async () => {
    try {
      dispatch({ 
        type: actionTypes.setLoadingOn, 
        payload: 'UserTable.fetchUsers' 
      });

      getUsers({}, (err, data) => {
        if (err) {
          console.error("Error fetching users:", err);
          dispatchNotification('UserTable.fetchUsers', 'error', 'Failed to fetch users.');
          return;
        }
        
        setData(data
          .map(user => ({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            picture: user.picture
          }))
        );
        dispatchNotification('UserTable.fetchUsers', 'success', 'Users fetched successfully.');
      });
    } catch (error) {
      console.error("Failed to fetch users:", error);
      dispatchNotification('UserTable.fetchUsers', 'error', 'Failed to fetch users.');
    }

    dispatch({ 
      type: actionTypes.setLoadingOff, 
      payload: 'UserTable.fetchUsers' 
    });
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <DataTable 
      summary="List of Users"
      data={data}
      // columns={data[0] ? Object.keys(data[0]).map((x, i) => ({ label: x, key: x, sortable: false })) : []}
      columns={TABLE_HEADERS}
    />
  );
}

export default UserTable;