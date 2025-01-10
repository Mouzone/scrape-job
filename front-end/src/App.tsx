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
    const [ pageIndex, setPageIndex ] = useState(0)
    const { data, error, isLoading } = useSWR("http://localhost:3000/jobs", fetcher)
    if (error) return <div>failed to load</div>
    if (isLoading) return <div>loading...</div>

    const limit = Math.floor(data.length / 50) * 50
    const toShow = data.slice(pageIndex, pageIndex + 50)
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
                        toShow.map((entry, index) => {
                            return <tr key={pageIndex + index}>
                                <td>{pageIndex + index + 1}</td>
                                <td>{entry["jobsite"]}</td>
                                <td>{formatDateTime(entry["applied"])}</td>
                                <td>{entry["company"]}</td>
                                <td>{entry["title"]}</td>
                            </tr>
                        })
                    }
                </tbody>
            </table>
            <div>
                <button onClick={() => setPageIndex(Math.max(0, pageIndex - 50))}> Prev </button>
                <button onClick={() => setPageIndex(Math.min(limit, pageIndex + 50))}> Next </button>
            </div>
        </>
    )
}

function Accounts() {
    // const [ searchTerm, setSearchTerm ] = useState("")
    const [ pageIndex, setPageIndex ] = useState(0)
    const { data, error, isLoading } = useSWR("http://localhost:3000/accounts", fetcher)

    if (error) return <div>failed to load</div>
    if (isLoading) return <div>loading...</div>

    const limit = Math.floor(data.length / 50) * 50
    const toShow = data.slice(pageIndex, pageIndex + 50)
    return (
        <>
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
                        toShow.map((entry, index) => {
                            return <tr key={pageIndex + index}>
                                <td>{pageIndex + index + 1}</td>
                                <td>{entry["company"]}</td>
                                <td>{entry["username"]}</td>
                                <td>{entry["password"]}</td>
                            </tr>
                        })
                    }
                </tbody>
            </table>
            <div>
                <button onClick={() => setPageIndex(Math.max(0, pageIndex - 50))}> Prev </button>
                <button onClick={() => setPageIndex(Math.min(limit, pageIndex + 50))}> Next </button>
            </div>
        </>
    )
}

function SearchBar() {
    return (
        <></>
    )
}

export default App
