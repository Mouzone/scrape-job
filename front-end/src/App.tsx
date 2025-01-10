import { useState } from "react"
import useSWR from "swr"
import formatDateTime from "./utility/formatDateTime"

function App() {
    const [ page, setPage ] = useState("jobs")
    return (
        <>
            <div>
                <button onClick={() => setPage("jobs")}> Jobs </button>
                <button onClick={() => setPage("accounts")}> Accounts </button>
            </div>
            { 
                page === "jobs" 
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
            <table>
                <thead>
                    <tr>
                        <th> </th>
                        <th> Jobsite </th>
                        <th> Applied </th>
                        <th> Company </th>
                        <th> Title </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data.map((entry, index) => {
                            return <tr>
                                <td>{index + 1}</td>
                                <td>{entry["jobsite"]}</td>
                                <td>{formatDateTime(entry["applied"])}</td>
                                <td>{entry["company"]}</td>
                                <td>{entry["title"]}</td>
                            </tr>
                        })
                    }
                </tbody>
            </table>
        </>
    )
}

function Accounts() {
    const { data, error, isLoading } = useSWR("http://localhost:3000/accounts", fetcher)
    if (error) return <div>failed to load</div>
    if (isLoading) return <div>loading...</div>

    return (
        <>
            <SearchBar/>
            <table>
                <thead>
                    <tr>
                        <th> </th>
                        <th> Company </th>
                        <th> Username </th>
                        <th> Password </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data.map((entry, index) => {
                            return <tr>
                                <td>{index + 1}</td>
                                <td>{entry["company"]}</td>
                                <td>{entry["username"]}</td>
                                <td>{entry["password"]}</td>
                            </tr>
                        })
                    }
                </tbody>
            </table>
        </>
    )
}

function SearchBar() {
    return (
        <></>
    )
}

export default App
