import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import useSWR from "swr";

const fetcher = (...args) => fetch(...args).then(res => res.json());

const columns = {
	accounts: ["company", "username", "password"],
	jobs: ["applied", "jobsite", "company", "title"]
};

function Search({type, searchTerm, setSearchTerm, searchValue, setSearchValue}) {
    return (
        <>
            <select 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
                {
                    columns[type].map((column) => {
                        return <option key={column} value={column}> {column} </option>
                    })
                }
            </select>
            <input type="text" value={searchValue} onChange={(e) => setSearchValue(e.target.value)}/>
        </>
    )
}

export default function Table({ type }) {
	const [pageIndex, setPageIndex] = useState(0);    
    const [searchTerm, setSearchTerm] = useState(columns[type][0]);
    const [searchValue, setSearchValue] = useState("");

    const { data, error, isLoading } = useSWR(
		"http://localhost:3000/" + type,
		fetcher
	);

	useEffect(() => {
		setPageIndex(0);
	}, [type, searchValue]);

    useEffect(() => {
        setSearchTerm(columns[type][0]);
        setSearchValue("")
    }, [type])

	if (error) return (
		<div className="text-center py-8 text-red-600">Failed to load</div>
	);
	
	if (isLoading) return (
		<div className="text-center py-8 text-gray-600">Loading...</div>
	);

    const filtered = searchValue === "" 
        ? data
        : data.filter(entry => entry[searchTerm].toLowerCase().includes(searchValue))

	const limit = Math.floor(data.length / 50) * 50;
	const paginated = filtered.slice(pageIndex, pageIndex + 50);

	return (
		<>
            <Search 
                type={type}
                searchTerm={searchTerm} 
                setSearchTerm={setSearchTerm} 
                searchValue={searchValue} 
                setSearchValue={setSearchValue}
            />
			<div className="overflow-x-auto rounded-lg border border-gray-200">
				<table className="w-full border-collapse">
					<thead>
						<tr className="bg-gray-50">
							<th className="p-4 text-left text-gray-600 font-medium border-b">#</th>
							{columns[type].map(header => (
								<th key={header} className="p-4 text-left text-gray-600 font-medium border-b">
									{header.charAt(0).toUpperCase() + header.substring(1)}
								</th>
							))}
						</tr>
					</thead>
					<tbody>
						{paginated.map((entry, index) => (
							<tr 
								key={pageIndex + index + 1}
								className="hover:bg-gray-50 transition-colors"
							>
								<td className="p-4 border-b text-gray-500">
									{pageIndex + index + 1}
								</td>
								{columns[type].map((column) => (
									<td key={column} className="p-4 border-b">
										{entry[column]}
									</td>
								))}
                                {/* <button type="button" onClick={() => fetch("http://localhost:3000/", {
                                    method: "DELETE",
                                    headers: {
                                        'Content-Type': 'application/json'
                                    },
                                    body: JSON.stringify({
                                        id: entry["id"]
                                    })
                                })}/> */}
							</tr>
						))}
					</tbody>
				</table>
			</div>

			<div className="mt-6 flex justify-between items-center">
				<div className="text-sm text-gray-600">
					Showing {pageIndex + 1}-{Math.min(pageIndex + 50, data.length)} of {filtered.length}
				</div>
				<div className="flex gap-2">
					<button
						onClick={() => setPageIndex(Math.max(0, pageIndex - 50))}
						disabled={pageIndex === 0}
						className="flex items-center gap-1 px-4 py-2 rounded-lg bg-white border border-gray-200 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
					>
						<ChevronLeft className="w-4 h-4" />
						Prev
					</button>
					<button
						onClick={() => setPageIndex(Math.min(limit, pageIndex + 50))}
						disabled={pageIndex + 50 >= filtered.length}
						className="flex items-center gap-1 px-4 py-2 rounded-lg bg-white border border-gray-200 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
					>
						Next
						<ChevronRight className="w-4 h-4" />
					</button>
				</div>
			</div>
		</>
	);
}