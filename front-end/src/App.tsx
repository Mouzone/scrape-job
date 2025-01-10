import { useState } from "react"
import useSWR from "swr"

function App() {
    const [ page, setPage ] = useState("jobs")
    return (
        <>
            <div>
                <button onClick={() => setPage("jobs")}> Jobs </button>
                <button onClick={() => setPage("accounts")}> Accounts </button>
            </div>
            { page == "jobs" 
                ? <Jobs/>
                : <Accounts/>
            }
        </>
    )
}

const fetcher = (...args) => fetch(...args).then(res => res.json())

function Jobs() {
    return (
        <>
            <SearchBar/>
        </>
    )
}

function Accounts() {
    const { data, error, isLoading } = useSWR("http://localhost:3000/jobs", fetcher)
    if (error) return <div>failed to load</div>
    if (isLoading) return <div>loading...</div>
    console.log(data)
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
