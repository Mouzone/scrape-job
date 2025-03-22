"use client";

import { useState } from "react";
import Forms from "../components/Form";
import TablePage from "../components/TablePage";
import TabButton from "../components/TabButton";

function App() {
    const [page, setPage] = useState<"table" | "inputs">("table");

    return (
        <div className="min-h-screen bg-gray-100 p-4 md:p-8">
            <div className="mx-auto max-w-6xl bg-white rounded-xl shadow-md">
                <div className="border-b border-gray-200">
                    <div className="p-4 md:p-6">
                        <nav className="flex gap-2 md:gap-4">
                            <TabButton
                                onClick={() => setPage("table")}
                                text="View Data"
                                value="table"
                                data={page}
                            />
                            <TabButton
                                onClick={() => setPage("inputs")}
                                text="Create New"
                                value="inputs"
                                data={page}
                            />
                        </nav>
                    </div>
                </div>

                <div className="p-4 md:p-6">
                    {page === "table" ? <TablePage /> : <Forms />}
                </div>
            </div>
        </div>
    );
}

export default App;
