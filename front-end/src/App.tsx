import { useState } from "react";
import Inputs from "./Inputs";
import TablePage from "./TablePage";

function App() {
	const [page, setPage] = useState("table");

	return (
		<div className="min-h-screen bg-gray-100 p-4 md:p-8">
			<div className="mx-auto max-w-6xl bg-white rounded-xl shadow-md">
				<div className="border-b border-gray-200">
					<div className="p-4 md:p-6">
						<nav className="flex gap-2 md:gap-4">
							<button
								onClick={() => setPage("table")}
								className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ease-in-out ${
									page === "table"
										? "bg-blue-600 text-white shadow-sm hover:bg-blue-700"
										: "bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-900"
								}`}
							>
								View Data
							</button>
							<button
								onClick={() => setPage("inputs")}
								className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ease-in-out ${
									page === "inputs"
										? "bg-blue-600 text-white shadow-sm hover:bg-blue-700"
										: "bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-900"
								}`}
							>
								Create New
							</button>
						</nav>
					</div>
				</div>

				<div className="p-4 md:p-6">
					{page === "table" ? <TablePage /> : <Inputs />}
				</div>
			</div>
		</div>
	);
}

export default App;