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
            <Table type={page}/>
        </>
    )
}

const fetcher = (...args) => fetch(...args).then(res => res.json())

const columns = {
    accounts: ["company", "username", "password"],
    jobs: ["jobsite", "applied", "company", "title"]
}

function Table({type} : {type: String}) {
    const [ pageIndex, setPageIndex ] = useState(0)
    const { data, error, isLoading } = useSWR("http://localhost:3000/" + type, fetcher)
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
                        { columns[type].map(header => <th>{header}</th>) }
                    </tr>
                </thead>
                <tbody>
                    {
                        toShow.map((entry, index) => {
                            return <tr key={pageIndex + index + 1}>
                                <td> {pageIndex + index + 1 }</td>
                                { columns[type].map((column) => <td>{entry[column]}</td>) }
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
