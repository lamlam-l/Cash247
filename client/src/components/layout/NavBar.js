import { useHistory } from "react-router-dom"

import { Navbar, Nav, Container, Button } from 'react-bootstrap'

import style from './style'

function NavBar() {
    const history = useHistory()

    function logOut() {
        localStorage.clear()
        
        history.push('/login')
    }
    
    return (<>
        <Navbar bg="light" expand="lg" style={{position: 'fixed', zIndex: '1', width: '100%', top: '0'}}>
            <Container>
                <Navbar.Brand href="/" style={style.title} className="colorTransition">Cash247</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="/dashboard">dashboard</Nav.Link>
                        <Nav.Link href="/report">report</Nav.Link>
                        <Nav.Link href="/profile">your account</Nav.Link>
                        <Nav.Link href="#">tools</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
                <Navbar.Collapse className="justify-content-end">
                    <Button variant="info" onClick={logOut}>Log out</Button>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    </>)
}

export default NavBar