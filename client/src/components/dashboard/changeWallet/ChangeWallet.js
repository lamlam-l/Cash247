import { Dropdown } from 'react-bootstrap'


function ChangeWallet(props) {
    const wallets = props.wallets
    const currentWalletId = localStorage.getItem('walletId')
    function changeWallet(walletId) {
        localStorage.setItem('walletId', walletId)
        window.location.reload(false)
    }
    // console.log(wallets)
    return (<>
        <Dropdown style={{width: '100%'}}>
            <Dropdown.Toggle variant="dark" id="dropdown-basic" style={{width: '100%'}}>
                {wallets.map((wallet) => {
                    if (wallet.walletId.toString() === currentWalletId)
                        return wallet.walletName
                })}
            </Dropdown.Toggle>

            <Dropdown.Menu variant="dark" style={{width: '100%'}}>
                {wallets.map((wallet) => {
                    console.log(wallet)
                    if (wallet.walletId.toString() !== currentWalletId)
                        return <Dropdown.Item onClick={() => changeWallet(wallet.walletId)}>{wallet.walletName}</Dropdown.Item>   
                })}
            </Dropdown.Menu>
        </Dropdown>
    </>)
}

export default ChangeWallet