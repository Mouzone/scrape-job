import React, { useState, useEffect } from "react";
import Table from "./Table";
import TabButton from "./TabButton";
import useSWR from "swr";

type Type = "jobs" | "accounts"
type Job = {
    id: number,
    applied: string,
    company: string,
    job: string,
    title: string
}
type JobKeys = keyof Job
type Account = {
    id: number,
    company: string,
    username: string,
    password: string
}
type AccountKeys = keyof Account
const columns = {
	accounts: ["company", "username", "password"] as Array<AccountKeys>,
	jobs: ["applied", "jobsite", "company", "title"] as Array<JobKeys>
};

const fetcher = (...args: [string]) => fetch(...args).then(res => res.json());

export default function TablePage() {
	const [type, setType] = useState<Type>("jobs");
    const [searchTerm, setSearchTerm] = useState<JobKeys | AccountKeys>(columns[type][0]);
    const [searchValue, setSearchValue] = useState<string>("");
	const [pageIndex, setPageIndex] = useState<number>(0);    

    useEffect(() => {
        setSearchTerm(columns[type][0]);
        setSearchValue("")
    }, [type])

    useEffect(() => {
        setPageIndex(0)
    }, [searchValue, type])

    const { data, error, isLoading }: { data: Array<Job> | Array<Account>, error: boolean | undefined, isLoading: boolean} = useSWR("http://localhost:3000/" + type, fetcher);

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

function Search({type, searchTerm, setSearchTerm, searchValue, setSearchValue}: {type: Type, searchTerm: string, setSearchTerm: React.Dispatch<React.SetStateAction<AccountKeys | JobKeys>>, searchValue: string, setSearchValue: React.Dispatch<React.SetStateAction<string>>}) {
    return (
        <div className="flex gap-4">
            <select
                value={searchTerm}
                name="search term"
                onChange={(e) => setSearchTerm(e.target.value as JobKeys)}
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
