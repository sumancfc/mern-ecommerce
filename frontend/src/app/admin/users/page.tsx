"use client";

import { Col, Table, Button } from "react-bootstrap";

export const users = [
  {
    _id: "1",
    name: "John Doe",
    email: "john@example.com",
    isAdmin: false,
  },
  {
    _id: "2",
    name: "Jane Smith",
    email: "jane@example.com",
    isAdmin: true,
  },
  {
    _id: "3",
    name: "Bob Johnson",
    email: "bob@example.com",
    isAdmin: false,
  },
  {
    _id: "4",
    name: "Alice Brown",
    email: "alice@example.com",
    isAdmin: false,
  },
  {
    _id: "5",
    name: "Charlie Davis",
    email: "charlie@example.com",
    isAdmin: true,
  },
];

const UserList: React.FC = () => {
  return (
    <Col md={9}>
      <h1>User List</h1>
      <Table striped bordered hover responsive className='table-sm'>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Admin/User</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user._id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.isAdmin ? "Admin" : "User"}</td>
              <td>
                <Button variant='primary' className='btn-sm'>
                  <i className='fas fa-edit'></i>
                </Button>

                <Button variant='danger' className='btn-sm'>
                  <i className='fas fa-trash'></i>
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Col>
  );
};

export default UserList;
