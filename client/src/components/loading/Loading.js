import { Spinner } from "react-bootstrap"

function Loading(params) {
    return (<div style={{
        textAlign: 'center',
        marginTop: '300px'
    }} >
        <Spinner
            animation="border"
            variant="info"
            />
    </div>)
}

export default Loading