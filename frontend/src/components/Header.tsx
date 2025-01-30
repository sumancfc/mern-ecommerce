"use client";

import { useRouter } from "next/navigation";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { logout } from "@/store/features/userSlice";
import Search from "./Search";

const Header: React.FC = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { currentUser } = useAppSelector((state) => state.user);

  const logoutHandler = () => {
    dispatch(logout());
    router.push("/login");
  };

  return (
    <Navbar bg='dark' variant='dark' expand='lg' collapseOnSelect>
      <Container>
        <Link href='/' passHref legacyBehavior>
          <Navbar.Brand>Store</Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />

        <Navbar.Collapse id='basic-navbar-nav'>
          <Nav className='mr-auto'>
            <Link href='/' passHref legacyBehavior>
              <Nav.Link>Home</Nav.Link>
            </Link>
            <Link href='/cart' passHref legacyBehavior>
              <Nav.Link>Cart</Nav.Link>
            </Link>

            {currentUser ? (
              <NavDropdown title={currentUser.name} id='username'>
                <Link href='/profile' passHref legacyBehavior>
                  <NavDropdown.Item>Profile</NavDropdown.Item>
                </Link>
                <NavDropdown.Item onClick={logoutHandler}>
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <Link href='/login' passHref legacyBehavior>
                <Nav.Link>
                  <i className='fas fa-user'></i> Login
                </Nav.Link>
              </Link>
            )}

            {currentUser && currentUser.isAdmin && (
              <NavDropdown title='Admin' id='adminmenu'>
                <Link href='/admin/userlist' passHref legacyBehavior>
                  <NavDropdown.Item>User List</NavDropdown.Item>
                </Link>
                <Link href='/admin/productlist' passHref legacyBehavior>
                  <NavDropdown.Item>Product List</NavDropdown.Item>
                </Link>
                <Link href='/admin/orderlist' passHref legacyBehavior>
                  <NavDropdown.Item>Order List</NavDropdown.Item>
                </Link>
              </NavDropdown>
            )}
          </Nav>
          <Search />
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
