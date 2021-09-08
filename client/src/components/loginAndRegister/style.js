const style = {
    landingImage: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundImage: 'url(https://blog.quickbridge.com/wp-content/uploads/2018/08/small-business-money-management.jpg)',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        width: '100%',
        height: '100vh',
    },
    landingInner: {
        top: '0',
        width: window.innerWidth > 600 ? '80%' : '95%',
        border: '3px solid white',
        borderRadius: '30px',
        padding: window.innerWidth > 600 ? '30px 10px' : '5px',
        background: 'rgba(0, 0, 0, 0.4)',
    },
    title: {
        textAlign: 'center',
        color: 'white',
        fontSize: '35px',
    },
    text: {
        color: 'white',
    },
    link: {
        color: 'white',
        textDecoration: 'none',
    },
}

export default style