
function Currency(props) {
    const value = parseInt(props.value)
    const currentUnit = localStorage.getItem('currentUnit')
    var aspect
    switch (currentUnit) {
        case 'USD':
            aspect = 1
            break
        case 'VND':
            aspect = 23500
            break
        default:
            aspect = 1
            break
    }

    const currencyFormated = new Intl.NumberFormat('us-US', { style: 'currency', currency: currentUnit }).format(value * aspect)
    var valueFormated
    if (value > 0)
        valueFormated = <span style={{ color: 'rgb(0, 160, 0)' }}>+{currencyFormated}</span>
    else if (value < 0)
        valueFormated = <span style={{ color: 'rgb(204, 11, 11)' }}>{currencyFormated}</span>
    else
        valueFormated = <span style={{ color: 'rgb(82, 82, 82)' }}>{currencyFormated}</span>
    
    return valueFormated
}

export default Currency
