import React, { useState, useEffect } from "react";
import Table from "./Table";
import TabButton from "./TabButton";
import useSWR from "swr";
import {Type, AccountKeys, JobKeys, searchableKeys, Data, Keys, } from "../types"

const columns = {
	accounts: ["company", "username", "password"] as AccountKeys[],
	jobs: ["applied", "jobsite", "company", "title"] as JobKeys[]
};

const fetcher = (...args: [string]) => fetch(...args).then(res => res.json());

export default function TablePage() {
	const [type, setType] = useState<Type>("jobs");
    const [searchTerm, setSearchTerm] = useState<Keys>(columns[type][0]);
    const [searchValue, setSearchValue] = useState<string>("");
	const [pageIndex, setPageIndex] = useState<number>(0);    

    useEffect(() => {
        setSearchTerm(columns[type][0]);
        setSearchValue("")
    }, [type])

    useEffect(() => {
        setPageIndex(0)
    }, [searchValue, type])

    useEffect(() => {
        const socket = new WebSocket("ws://localhost:3000/ws")

        socket.onmessage = (event) => {
            const message = JSON.parse(event.data)
        }

        socket.onclose = () => {
            console.log("Websocket closed")
        }

        return () => {
            socket.close()
        }
    }, [])

    const { data, error, isLoading }: { data: Data, error: boolean | undefined, isLoading: boolean} = useSWR("http://localhost:3000/" + type, fetcher);

    const filtered = (searchValue === "" 
        ? data
        : data.filter(entry => entry[searchTerm as searchableKeys<typeof entry>].toLowerCase().includes(searchValue))) as Data
        
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

function Search({type, searchTerm, setSearchTerm, searchValue, setSearchValue}: {type: Type, searchTerm: string, setSearchTerm: React.Dispatch<React.SetStateAction<Keys>>, searchValue: string, setSearchValue: React.Dispatch<React.SetStateAction<string>>}) {
    return (
        <div className="flex gap-4">
            <select
                value={searchTerm}
                name="search term"
                onChange={(e) => setSearchTerm(e.target.value as Keys)}
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
