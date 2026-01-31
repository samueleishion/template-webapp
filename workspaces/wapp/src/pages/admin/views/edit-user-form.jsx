import { useState } from 'react';

/* Shared Components */
import Flex from '../../../components/flex';
import Input from '../../../components/input';
import Button from '../../../components/button';
// import { useContext, useState, useRef } from 'react';
// import { useAppState } from '../../../context/appStateContext';

const EditUserForm = ({ userInfo, onCancel=() => {}, onSubmit=() => {}, ...props }) => {
  const [userRole, setUserRole] = useState(userInfo.role || 'user');

  const handleRoleChange = (e) => {
    setUserRole(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ role: userRole });
  }

  return (
    <form onSubmit={handleSubmit} >
      <Flex direction="column" gap={10} padding={20} grow={1}>
        <Flex direction="column" justify="between" align="center" grow={1} gap={18} style={{ marginTop: '21px' }}>
          <Input type="text" label="Name" value={userInfo.name} readOnly />
          <Input type="email" label="Email" value={userInfo.email} readOnly />
          <Input type="select" label="Role" value={userRole} onChange={handleRoleChange}>
            <option value="user">User</option>
            <option value="developer">Developer</option>
            <option value="admin">Admin</option>
          </Input>
        </Flex>
        <Flex direction="row" justify="flex-end" align="center" gap={6} style={{ marginTop: '21px' }}>
          <Button variant="outlined" onClick={onCancel}>
            Cancel
          </Button>
          <Button 
            type="submit"
            variant="filled" 
            onClick={handleSubmit} 
            disabled={!userRole || userRole === userInfo.role}
          >
            Save Changes
          </Button>
        </Flex>
      </Flex>
    </form>
  );
};

export default EditUserForm;