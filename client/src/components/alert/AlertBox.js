import { Alert } from 'react-bootstrap'

function AlertBox(info) {
    if (info.info === null)
        return null
    else
        return (<>
            <Alert variant={info.info.variant}>
                {info.info.message}
            </Alert>
        </>)
}

export default AlertBox