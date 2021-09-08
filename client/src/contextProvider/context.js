import { createContext, useState } from "react"

export const context = createContext()

function ContextProvider({ children }) {
    //state
    const [view, setView] = useState({
        currentView: 'byDay' //byDay or byTrade
    })
    //data
    const contextData = {
        view,
        setView
    }
    //provider
    return(<context.Provider value={contextData}>
        {children}
    </context.Provider>)
}

export default ContextProvider