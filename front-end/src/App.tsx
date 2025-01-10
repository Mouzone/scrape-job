import { useState } from "react"

function App() {
    const [ page, setPage ] = useState("jobs")
    return (
        <>
            <div>
                <button onClick={() => setPage("Jobs")}> Jobs </button>
                <button onClick={() => setPage("Accounts")}> Accounts </button>
            </div>
            { page == "jobs" 
                ? <Jobs/>
                : <Accounts/>
            }
        </>
    )
}

function Jobs() {
    return (
        <>
            <SearchBar/>
        </>
    )
}

function Accounts() {
    return (
        <>
            <SearchBar/>
        </>
    )
}

function SearchBar() {
    return (
        <></>
    )
}
export default App
