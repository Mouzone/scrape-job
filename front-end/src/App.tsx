import { useState } from "react";
import Inputs from "./Inputs";
import Table from "./Table";

function App() {
	const [page, setPage] = useState("jobs");
	
	return (
		<div className="min-h-screen bg-gray-50 p-8">
			<div className="mx-auto max-w-6xl bg-white rounded-lg shadow-sm">
				<div className="p-6">
					<Inputs/>
					<div className="mb-6 flex gap-4">
						<button 
							onClick={() => setPage("jobs")}
							className={`px-4 py-2 rounded-lg font-medium transition-colors ${
								page === "jobs" 
									? "bg-blue-600 text-white" 
									: "bg-gray-100 hover:bg-gray-200"
							}`}
						>
							Jobs
						</button>
						<button 
							onClick={() => setPage("accounts")}
							className={`px-4 py-2 rounded-lg font-medium transition-colors ${
								page === "accounts" 
									? "bg-blue-600 text-white" 
									: "bg-gray-100 hover:bg-gray-200"
							}`}
						>
							Accounts
						</button>
					</div>
					<Table type={page} />
				</div>
			</div>
		</div>
	);
}

export default App;