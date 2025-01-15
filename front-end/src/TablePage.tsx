import { useState } from "react";
import Table from "./Table";

const columns = {
	accounts: ["company", "username", "password"],
	jobs: ["applied", "jobsite", "company", "title"]
};

export default function TablePage() {
	const [data, setData] = useState("jobs");
    const [searchTerm, setSearchTerm] = useState(columns[data][0]);
    const [searchValue, setSearchValue] = useState("");

    return (
        <>
            <div className="mb-6 flex gap-4">
                <button 
                    onClick={() => setData("jobs")}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    data === "jobs" 
                        ? "bg-blue-600 text-white" 
                        : "bg-gray-100 hover:bg-gray-200"
                }`}>
                    Jobs
                </button>
                <button 
                    onClick={() => setData("accounts")}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    data === "accounts" 
                        ? "bg-blue-600 text-white" 
                        : "bg-gray-100 hover:bg-gray-200"
                }`}>
                    Accounts
                </button>
                <Search 
                    type={data}
                    searchTerm={searchTerm} 
                    setSearchTerm={setSearchTerm} 
                    searchValue={searchValue} 
                    setSearchValue={setSearchValue}
                />
            </div>
            <Table 
                type={data} 
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                searchValue={searchValue}
                setSearchValue={setSearchValue}
            />
        </>
    )
}

function Search({type, searchTerm, setSearchTerm, searchValue, setSearchValue}) {

    return (
        <div className="flex gap-4">
            <select
                value={searchTerm}
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
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Search..."
            />
        </div>
    )
}
