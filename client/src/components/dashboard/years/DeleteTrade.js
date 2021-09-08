import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

function DeleteTrade() {
    return (<>
        <FontAwesomeIcon
            icon={faTrash}
            className="colorTransition"
        />
    </>)
}

export default DeleteTrade