export default function TableHead({
    type,
    setIncreasing,
    increasing,
}: {
    type: Type;
    setIncreasing: React.Dispatch<React.SetStateAction<boolean>>;
    increasing: boolean;
}) {
    return (
        <thead>
            <tr className="bg-gray-200">
                <th className="p-4 w-24 min-w-24 text-gray-600 font-medium border-b">
                    #
                </th>
                {columns[type].map((header) => (
                    <th
                        key={header}
                        className={`p-4 border-b w-48 min-w-48 ${
                            header === "applied" ? "cursor-pointer" : ""
                        }`}
                        onClick={() => {
                            if (header === "applied") {
                                setIncreasing(!increasing);
                            }
                        }}
                    >
                        <div className="flex items-center text-gray-600 font-medium">
                            <span className="truncate">
                                {header.charAt(0).toUpperCase() +
                                    header.substring(1)}
                            </span>
                            {header === "applied" && (
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    className="w-5 h-5 flex-shrink-0 ml-2"
                                >
                                    <title>
                                        {increasing ? "menu-down" : "menu-up"}
                                    </title>
                                    <path
                                        d={
                                            increasing
                                                ? "M7,10L12,15L17,10H7Z"
                                                : "M7,15L12,10L17,15H7Z"
                                        }
                                    />
                                </svg>
                            )}
                        </div>
                    </th>
                ))}
                <th className="p-4 text-gray-600 font-medium border-b text-center">
                    {" "}
                    Delete{" "}
                </th>
            </tr>
        </thead>
    );
}
