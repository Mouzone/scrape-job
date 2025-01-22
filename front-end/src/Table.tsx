import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {Type, Account, AccountKeys, Job, JobKeys, searchableKeys, Data} from "../types"

const columns = {
	accounts: ["company", "username", "password"] as AccountKeys[],
	jobs: ["applied", "jobsite", "company", "title"] as JobKeys[]
};

export default function Table({ type, pageIndex, setPageIndex, error, isLoading, data }: {type: Type, pageIndex: number, setPageIndex: React.Dispatch<React.SetStateAction<number>>, error: boolean | undefined, isLoading: boolean, data: Account[] | Job[]}) {
    const [toDelete, setToDelete] = useState<number | null>(null);
    const [increasing, setIncreasing] = useState<boolean>(true);

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

    const sortedData = (type === "jobs" && !increasing 
        ? [...data].reverse() 
        : data) as Data
    const paginated = sortedData.slice(pageIndex, pageIndex + 50) as Data
	return (
		<>
            <DeleteConfirmation deleteEntry={deleteEntry} toDelete={toDelete} setToDelete={setToDelete}/>
			<div className="overflow-x-auto rounded-lg border border-gray-200">
				<table className="w-full border-collapse table-auto">
					<TableHead type={type} setIncreasing={setIncreasing} increasing={increasing}/>
                    <TableBody type={type} pageIndex={pageIndex} data={paginated} setToDelete={setToDelete}/>
				</table>
			</div>
            <Nav pageIndex={pageIndex} setPageIndex={setPageIndex} filtered={data}/>
		</>
	);
}

function DeleteConfirmation({toDelete, setToDelete, deleteEntry}: {toDelete: number | null, setToDelete: React.Dispatch<React.SetStateAction<number | null>>, deleteEntry: React.MouseEventHandler<HTMLButtonElement>}) {
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

function TableHead({type, setIncreasing, increasing}: {type: Type, setIncreasing: React.Dispatch<React.SetStateAction<boolean>>, increasing: boolean}) {
    return (
        <thead>
            <tr className="bg-gray-200">
                <th className="p-4 w-24 min-w-24 text-gray-600 font-medium border-b">#</th>
                {
                    columns[type].map(header => (
                        <th
                            key={header}
                            className={`p-4 border-b w-48 min-w-48 ${header === "applied" ? "cursor-pointer" : ""}`}
                            onClick={() => {
                                if (header === "applied") {
                                    setIncreasing(!increasing);
                                }
                            }}
                        >
                            <div className="flex items-center text-gray-600 font-medium">
                                <span className="truncate">
                                    {header.charAt(0).toUpperCase() + header.substring(1)}
                                </span>
                                {header === "applied" && (
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        className="w-5 h-5 flex-shrink-0 ml-2"
                                    >
                                        <title>{increasing ? 'menu-down' : 'menu-up'}</title>
                                        <path d={increasing ? "M7,10L12,15L17,10H7Z" : "M7,15L12,10L17,15H7Z"} />
                                    </svg>
                                )}
                            </div>
                        </th>
                    ))
                }
                <th className="p-4 text-gray-600 font-medium border-b text-center"> Delete </th>
            </tr>
        </thead>
    )
}

function TableBody({type, data, pageIndex, setToDelete}: {type: Type, data: Account[] | Job[], pageIndex: number, setToDelete: React.Dispatch<React.SetStateAction<number | null>>}) {
    return (
        <tbody>
            {
                data.map((entry, index) => (
                    <tr 
                        key={entry["id"]}
                        className={`${index % 2 ? "bg-gray-200" : "bg-white"} hover:bg-blue-100 transition-colors`}
                    >
                        <td className="p-4 border-b text-gray-500 text-center">
                            {pageIndex + index + 1}
                        </td>
                        {
                            columns[type].map((column) => (
                                <ModifiableCell 
                                    key={entry["id"] + column} 
                                    type={type} 
                                    id={entry["id"]} 
                                    column={column} 
                                    value={entry[column as searchableKeys<typeof entry>]}
                                />
                            ))
                        }
                        <DeleteButton setToDelete={setToDelete} id={entry["id"]}/>
                    </tr>
                ))
            }
        </tbody>
    )
}

function ModifiableCell({type, id, column, value}: {type: Type, id: number, column: string, value: string | number}) {
    const [edit, setEdit] = useState(false)
    const [newValue, setNewValue] = useState(value)

    if (column === "applied") {
        const date = new Date(value)
        const formattedDate = date.toLocaleDateString("en-US", {
            year: "2-digit",
            month: "2-digit",
            day: "2-digit"
          })
        value = formattedDate
    }

    const sendEdit = () => {
        setEdit(false)
        fetch("http://localhost:3000/" + type, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id,
                column,
                newValue
            })
        })
    }

    return (
        <td className="p-4 border-b">
            {
                edit && column !== "applied" 
                ? <input
                    value={newValue}
                    onBlur={sendEdit}
                    onChange={(e) => setNewValue(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            sendEdit();
                        }
                    }}
                />
                : <span onDoubleClick={column !== "applied" ? () => setEdit(true) : undefined}>
                    {value}
                </span>
            }
        </td>

    )
}
function DeleteButton({setToDelete, id}: {setToDelete: React.Dispatch<React.SetStateAction<number | null>>, id: number}) {
    return (
        <td className="h-full">
            <div className="flex h-full items-center justify-center p-4">
                <button 
                    className="flex items-center justify-center hover:bg-gray-100 rounded p-2 transition-colors"
                    type="button"
                    onClick={() => setToDelete(id)}
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
            </div>
        </td>
    )
}

function Nav({pageIndex, setPageIndex, filtered}: {pageIndex: number, setPageIndex: React.Dispatch<React.SetStateAction<number>>, filtered: Array<Object>}) {
    const limit = Math.floor(filtered.length / 50) * 50;

    return (
        <div className="m-6 flex justify-between items-center">
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