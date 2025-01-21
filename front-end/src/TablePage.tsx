import { useState, useEffect } from "react";
import Table from "./Table";
import TabButton from "./TabButton";
import useSWR from "swr";

const columns = {
	accounts: ["company", "username", "password"],
	jobs: ["applied", "jobsite", "company", "title"]
};

const fetcher = (...args) => fetch(...args).then(res => res.json());

export default function TablePage() {
	const [type, setType] = useState("jobs");
    const [searchTerm, setSearchTerm] = useState(columns[type][0]);
    const [searchValue, setSearchValue] = useState("");
	const [pageIndex, setPageIndex] = useState(0);    

    useEffect(() => {
        setSearchTerm(columns[type][0]);
        setSearchValue("")
    }, [type])

    useEffect(() => {
        setPageIndex(0)
    }, [searchValue, type])

    const { data, error, isLoading } = useSWR(
            "http://localhost:3000/" + type,
            fetcher
        );

    const filtered = searchValue === "" 
        ? data
        : data.filter(entry => entry[searchTerm].toLowerCase().includes(searchValue))

    return (
        <>
            <div className="mb-6 flex gap-4">
                <TabButton onClick={() => setType("jobs")} text="Jobs" value="jobs" data={type}/>
                <TabButton onClick={() => setType("accounts")} text="Accounts" value="accounts" data={type}/>
                <Search 
                    type={type}
                    searchTerm={searchTerm} 
                    setSearchTerm={setSearchTerm} 
                    searchValue={searchValue} 
                    setSearchValue={setSearchValue}
                />
            </div>
            <Table 
                type={type}
                pageIndex={pageIndex}
                setPageIndex={setPageIndex}
                error={error}
                isLoading={isLoading}
                data={filtered}
            />
        </>
    )
}

function Search({type, searchTerm, setSearchTerm, searchValue, setSearchValue}) {
    return (
        <div className="flex gap-4">
            <select
                value={searchTerm}
                name="search term"
                onChange={(e) => setSearchTerm(e.target.value)}
                className=" px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
                {columns[type].map((column) => (
                    <option key={column} value={column}>
                        {column}
                    </option>
                ))}
            </select>
            <input
                type="text"
                name="search value"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Search..."
            />
        </div>
    )
}
