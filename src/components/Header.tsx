import React from "react"
import { Navbar, Nav, Form, FormControl, Button } from "react-bootstrap"
import "./Header.css"

const Header = () => {
  return (
    <div className="header">
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="/">Puzzled</Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link href="/">Home</Nav.Link>
          <Nav.Link href="huarong-dao">Huarong Dao</Nav.Link>
          <Nav.Link href="eight-queens-puzzle">8 Queens</Nav.Link>
        </Nav>
        <Form inline>
          <FormControl type="text" placeholder="Search" className="mr-sm-2" />
          <Button variant="outline-info">Search</Button>
        </Form>
      </Navbar>
    </div>
  )
}

export default Header
