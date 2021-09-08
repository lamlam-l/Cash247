import { Redirect } from 'react-router'

import NavBar from '../components/layout/NavBar'

function Auth(prop) {
    const name = localStorage.getItem('name')
    if (!name)
        return <Redirect to="/login" />
    else {
        return (<>
            <NavBar />
            <prop.cp/>
        </>)
    }
}

export default Auth