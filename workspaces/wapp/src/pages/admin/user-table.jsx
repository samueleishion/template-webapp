import { useContext, useEffect, useRef, useState } from "react";

/* Global State */
import useAppState, { actionTypes } from "../../data/app-state";
import { 
  getUsers,
  updateUser 
} from "../../data/api";

/* Shared Components */
import Avatar from '../../components/avatar'; 
import Button from '../../components/button'; 
import { DataTable } from "../../components/table/bundles";
import Dialog from '../../components/dialog';
import Flex from '../../components/flex';
import Input from '../../components/input';
import Link from "../../components/link";

/* Assets */ 
import { 
  Code,
  EditPencil,
  Group,
  Key,
  User,
} from 'iconoir-react'
import { EditUserForm } from "./views";

const UserTable = () => {
  const [appState, dispatch] = useContext(useAppState);
  const [data, setData] = useState([]);
  const [toEdit, setToEdit] = useState(null);
  const dialogRef = useRef(null);

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
          ? <Code />
          : <User />
        }
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
        <Button 
          variant="outlined" 
          round 
          size="small" 
          aria-label="Edit" 
          onClick={() => {
            setToEdit(row);
            dialogRef.current && 
            dialogRef.current.showModal && 
            dialogRef.current.showModal();
          }}
        >
          <EditPencil />
        </Button>
        <Button 
          variant="outlined" 
          round 
          size="small" 
          aria-label="Supervise user account"
          disabled={row._id === appState.supervisedSession._id}
          onClick={() => {
            dispatch({
              type: actionTypes.setSupervisedSession,
              payload: row
            })
            dispatch({
              type: actionTypes.setAlertOn,
              payload: {
                id: Date.now(),
                type: 'info',
                message: `You are now supervising ${row.name}'s account.`
              }
            })
          }}
        >
          <Group />
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
        
        console.log("UserTable.fetchUsers()", data);
        setData(data
          .map(user => ({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            picture: user.picture
          }))
        );
        dispatch({ 
          type: actionTypes.setLoadingOff, 
          payload: 'UserTable.fetchUsers' 
        });
      });
    } catch (error) {
      console.error("Failed to fetch users:", error);
      dispatchNotification('UserTable.fetchUsers', 'error', 'Failed to fetch users.');
      dispatch({ 
        type: actionTypes.setLoadingOff, 
        payload: 'UserTable.fetchUsers' 
      });
    }
  };

  const handleCancelEdit = () => {
    dialogRef.current && dialogRef.current.close();
    setToEdit(null);
  }

  const handleSaveChanges = (update) => {
    // Handle save logic here
    dispatch({ type: actionTypes.setLoadingOn, payload: 'UserTable.updateUser' });
    updateUser(toEdit._id, update, (err, updatedUser) => {
      dispatch({ type: actionTypes.setLoadingOff, payload: 'UserTable.updateUser' });

      if (err) {
        console.error("Error updating user:", err);
        dispatch({ type: actionTypes.setAlertOn, payload: { type: 'error', message: 'Failed to update user.' } });
        return;
      }
      
      // Update the local state with the updated user
      setData(prevData => prevData.map(user => 
        user._id === updatedUser._id ? updatedUser : user
      ));
      
      dispatch({ type: actionTypes.setAlertOn, payload: { type: 'success', message: 'User updated successfully.' } });
      fetchUsers();
    });
    dialogRef.current && dialogRef.current.close();
    setToEdit(null);
  }

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <>
      <DataTable 
        summary="List of Users"
        data={data}
        columns={TABLE_HEADERS}
      />
      <Dialog ref={dialogRef} title="Edit user">
        {toEdit && (
          <EditUserForm 
            userInfo={toEdit} 
            onCancel={handleCancelEdit}
            onSubmit={handleSaveChanges}
          />
        )}
      </Dialog>
    </>
  );
}

export default UserTable;