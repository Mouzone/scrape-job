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
            { page === "jobs" 
                ? <Jobs/>
                : <Accounts/>
            }
        </>
    )
}

const fetcher = (...args) => fetch(...args).then(res => res.json())

function Jobs() {
    const { data, error, isLoading } = useSWR("http://localhost:3000/jobs", fetcher)
    if (error) return <div>failed to load</div>
    if (isLoading) return <div>loading...</div>

    return (
        <>
            <SearchBar/>
            {
                data.map(entry => {
                    return <tr>
                        <td>{entry["jobsite"]}</td>
                        <td>{entry["applied"]}</td>
                        <td>{entry["company"]}</td>
                        <td>{entry["title"]}</td>
                    </tr>
                })
            }
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
