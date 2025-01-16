import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const columns = {
	accounts: ["company", "username", "password"],
	jobs: ["applied", "jobsite", "company", "title"]
};

export default function Table({ type, error, isLoading, data }) {
	const [pageIndex, setPageIndex] = useState(0);    
    const [toDelete, setToDelete] = useState(null);

    useEffect(() => {
        setPageIndex(0)
    }, [type])

    const deleteEntry = () => {
        fetch("http://localhost:3000/" + type, {
            method: "DELETE",
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({
            id: toDelete
            })
        })
        setToDelete(null)
    }

	if (error) return (
		<div className="text-center py-8 text-red-600">Failed to load</div>
	);
	
	if (isLoading) return (
		<div className="text-center py-8 text-gray-600">Loading...</div>
	);

    const paginated = data.slice(pageIndex, pageIndex + 50);

	return (
		<>
            <DeleteConfirmation deleteEntry={deleteEntry} toDelete={toDelete} setToDelete={setToDelete}/>
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
                            <th className="p-4 text-left text-gray-600 font-medium border-b"> Delete </th>
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
                                <td className="flex items-center justify-center p-4 border-b">
                                    <button 
                                        className="flex items-center justify-center hover:bg-gray-100 rounded p-2 transition-colors"
                                        type="button"
                                        onClick={() => setToDelete(entry["id"])}
                                    >
                                        <svg 
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 24 24"
                                            className="fill-red-500 w-5"
                                            >
                                            <title>delete</title>
                                            <path d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z" />
                                        </svg>
                                    </button>
                                </td>
							</tr>
						))}
					</tbody>
				</table>
                <Nav pageIndex={pageIndex} setPageIndex={setPageIndex} filtered={data}/>
			</div>
		</>
	);
}

function DeleteConfirmation({toDelete, setToDelete, deleteEntry}) {
    return (
        <div 
            className={`${toDelete === null ? 'hidden' : 'block'} fixed inset-0 bg-black/50 flex items-center justify-center z-50`}
            >
            <div className="bg-white rounded-lg shadow-xl p-6 max-w-sm w-full mx-4">
                <h1 className="text-xl font-semibold mb-4 text-center">Confirm Delete?</h1>
                <div className="flex gap-4 justify-center">
                <button
                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                    onClick={deleteEntry}
                >
                    Yes
                </button>
                <button 
                    className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 transition-colors"
                    onClick={() => setToDelete(null)}
                >
                    No
                </button>
                </div>
            </div>
        </div>
    )
}

function TableHead() {

}

function TableBody() {

}

function Nav({pageIndex, setPageIndex, filtered}) {
    const limit = Math.floor(filtered.length / 50) * 50;

    return (
        <div className="mt-6 flex justify-between items-center">
            <div className="text-sm text-gray-600">
                Showing {pageIndex + 1}-{Math.min(pageIndex + 50, filtered.length)} of {filtered.length}
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
    )
}