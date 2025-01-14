import { useState } from "react";
import Table from "./Table";

export default function TablePage() {
	const [data, setData] = useState("jobs");

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
            </div>
            <Table type={data} />
        </>
    )
}
