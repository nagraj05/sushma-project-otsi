import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper,
  IconButton
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { userStore } from './UserStore';

const AdminPage = observer(() => {
  useEffect(() => {
    userStore.loadUsers();
  }, []);

  const handleDelete = (email) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      userStore.deleteUser(email);
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">User Management</h1>
        
        <Paper className="w-full mb-6">
          <TableContainer className="max-h-[600px]">
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell className="font-bold bg-gray-50">Name</TableCell>
                  <TableCell className="font-bold bg-gray-50">Email</TableCell>
                  <TableCell className="font-bold bg-gray-50">Phone</TableCell>
                  <TableCell className="font-bold bg-gray-50">Gender</TableCell>
                  <TableCell className="font-bold bg-gray-50">DOB</TableCell>
                  <TableCell className="font-bold bg-gray-50">Skills</TableCell>
                  <TableCell className="font-bold bg-gray-50">Experience</TableCell>
                  <TableCell className="font-bold bg-gray-50">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {userStore.users.map((user, index) => (
                  <TableRow 
                    key={user.email || index}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <TableCell>
                      {`${user.firstname} ${user.lastname}`}
                    </TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.phoneNumber}</TableCell>
                    <TableCell>{user.gender}</TableCell>
                    <TableCell>{user.dob}</TableCell>
                    <TableCell>
                      <div className="max-w-xs overflow-hidden text-ellipsis">
                        {user.skills}
                      </div>
                    </TableCell>
                    <TableCell>
                      {user.hasExperience === 'yes' ? user.experience : 'No experience'}
                    </TableCell>
                    <TableCell>
                      <IconButton
                        color="error"
                        onClick={() => handleDelete(user.email)}
                        size="small"
                        className="hover:bg-red-50"
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
                {userStore.users.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-8 text-gray-500">
                      No users found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </div>
    </div>
  );
});

export default AdminPage;