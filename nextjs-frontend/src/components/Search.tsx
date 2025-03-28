import { columns } from "@/utility/consts";

export default function Search({
    type,
    searchTerm,
    setSearchTerm,
    searchValue,
    setSearchValue,
}: {
    type: Type;
    searchTerm: string;
    setSearchTerm: React.Dispatch<React.SetStateAction<Keys>>;
    searchValue: string;
    setSearchValue: React.Dispatch<React.SetStateAction<string>>;
}) {
    return (
        <div className="flex gap-4">
            <select
                value={searchTerm}
                name="search term"
                onChange={(e) => setSearchTerm(e.target.value as Keys)}
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
                name="search value"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Search..."
            />
        </div>
    );
}
