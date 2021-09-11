import { Row, Col, Container, Button } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faWrench, faMoneyCheckAlt } from '@fortawesome/free-solid-svg-icons'

import NavBar from '../layout/NavBar'

function Welcome() {
    return (<div className="welcome">
        {localStorage.getItem('name') ? <NavBar /> : <></>}
        <div className="header">
            <div className="text">
                <h1>Cash247</h1>
                <h4>Most effective financial management application for your money</h4>
            </div>
        </div>
        <Container>
            <Row className="banner">
                <Col>
                    <FontAwesomeIcon icon={faWrench} className="welcome-icon" />
                    <h3>Easy To Use</h3>
                    <p>User-friendly interface, maximum removal of redundant details</p>
                </Col>
                <Col>
                    <FontAwesomeIcon icon={faMoneyCheckAlt} className="welcome-icon" />
                    <h3>High Efficiency</h3>
                    <p>Quickly organize your daily transactions, detailed reports every month</p>
                </Col>
                <Col>
                    <FontAwesomeIcon icon={faWrench} className="welcome-icon" />
                    <h3>Convenient</h3>
                    <p>Access to your wallet everytime, everywhere. Smootly switch between the wallets</p>
                </Col>
            </Row>
        </Container>
        {localStorage.getItem('name') ? <></> : <div className="auth">
            <h2>Ready to use ?</h2>
            <Button href="./register">Register</Button>
            <span> here, or </span>
            <Button href="./login">Sign in</Button>
            <span> if you already have an account</span>
        </div>}
        <div className="footer">
            <span>made by lam. If you find bug, error, feel free to contact to me at <a href="https://www.facebook.com/nguyentunglamxxxx">here</a></span>
        </div>
    </div>)
}

export default Welcome