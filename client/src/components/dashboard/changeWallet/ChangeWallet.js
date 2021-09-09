import { Dropdown } from 'react-bootstrap'


function ChangeWallet(props) {
    console.log(1)
    const wallets = props.wallets
    const currentWalletId = localStorage.getItem('walletId')
    function changeWallet(walletId) {
        localStorage.setItem('walletId', walletId)
        window.location.reload(false)
    }

    return (<>
        <Dropdown>
            <Dropdown.Toggle variant="info" id="dropdown-basic">
                {wallets.map((wallet) => {
                    if (wallet.walletId.toString() === currentWalletId)
                        return wallet.walletName
                })}
            </Dropdown.Toggle>

            <Dropdown.Menu>
                {wallets.map((wallet) => {
                    if (wallet.walletId.toString() !== currentWalletId)
                        return <Dropdown.Item onClick={() => changeWallet(wallet.walletId)}>{wallet.walletName}</Dropdown.Item>   
                })}
            </Dropdown.Menu>
        </Dropdown>
    </>)
}

export default ChangeWallet