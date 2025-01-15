import { useState } from "react";
import Table from "./Table";
import TabButton from "./TabButton";

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
                <TabButton onClick={() => setData("jobs")} text="Jobs" value="jobs" data={data}/>
                <TabButton onClick={() => setData("accounts")} text="Accounts" value="accounts" data={data}/>
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
