import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import useSWR from "swr";

function App() {
  const [page, setPage] = useState("jobs");
  
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="mx-auto max-w-6xl bg-white rounded-lg shadow-sm">
        <div className="p-6">
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

const fetcher = (...args) => fetch(...args).then(res => res.json());

const columns = {
  accounts: ["company", "username", "password"],
  jobs: ["applied", "jobsite", "company", "title"]
};

function Table({ type }) {
  const [pageIndex, setPageIndex] = useState(0);
  const { data, error, isLoading } = useSWR(
    "http://localhost:3000/" + type,
    fetcher
  );

  useEffect(() => {
    setPageIndex(0);
  }, [type]);

  if (error) return (
    <div className="text-center py-8 text-red-600">Failed to load</div>
  );
  
  if (isLoading) return (
    <div className="text-center py-8 text-gray-600">Loading...</div>
  );

  const limit = Math.floor(data.length / 50) * 50;
  const paginated = data.slice(pageIndex, pageIndex + 50);

  return (
    <>
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
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-6 flex justify-between items-center">
        <div className="text-sm text-gray-600">
          Showing {pageIndex + 1}-{Math.min(pageIndex + 50, data.length)} of {data.length}
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
            disabled={pageIndex + 50 >= data.length}
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

export default App;