export default function TableBody({
    type,
    data,
    pageIndex,
    setToDelete,
}: {
    type: Type;
    data: Account[] | Job[];
    pageIndex: number;
    setToDelete: React.Dispatch<React.SetStateAction<number | null>>;
}) {
    return (
        <tbody>
            {data.map((entry, index) => (
                <tr
                    key={entry["id"]}
                    className={`${
                        index % 2 ? "bg-gray-200" : "bg-white"
                    } hover:bg-blue-100 transition-colors`}
                >
                    <td className="p-4 border-b text-gray-500 text-center">
                        {pageIndex + index + 1}
                    </td>
                    {columns[type].map((column) => (
                        <ModifiableCell
                            key={entry["id"] + column}
                            type={type}
                            id={entry["id"]}
                            column={column}
                            value={
                                entry[column as searchableKeys<typeof entry>]
                            }
                        />
                    ))}
                    <DeleteButton setToDelete={setToDelete} id={entry["id"]} />
                </tr>
            ))}
        </tbody>
    );
}
