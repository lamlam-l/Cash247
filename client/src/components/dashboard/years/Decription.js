import { Popover, OverlayTrigger, Button } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStickyNote } from '@fortawesome/free-solid-svg-icons'

function Decription(props) {
    const trade = props.trade

    //popover
    const popover =
        <Popover id="popover-basic">
            <Popover.Header as="h3">{trade.spendType ? trade.spendType : trade.reciveType}</Popover.Header>
            <Popover.Body>
                {trade.decription}
            </Popover.Body>
        </Popover>

    return (<>
        <OverlayTrigger trigger="click" placement="bottom" overlay={popover}>
            <div>
                <FontAwesomeIcon
                    icon={faStickyNote}
                    className="description-icon colorTransition"
                />
            </div>
        </OverlayTrigger>


    </>)
}

export default Decription