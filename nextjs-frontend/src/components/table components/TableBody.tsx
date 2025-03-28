import { columns } from "@/utility/consts";
import ModifiableCell from "./ModifiableCell";
import DeleteButton from "./DeleteButton";
import { Account, AccountKeys, FormType, Job, JobKeys } from "@/utility/types";

export default function TableBody({
    type,
    data,
    pageIndex,
    setToDelete,
}: {
    type: FormType;
    data: Account[] | Job[];
    pageIndex: number;
    setToDelete: React.Dispatch<React.SetStateAction<string>>;
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
                    <td className="p-4 text-gray-500 text-center">
                        {pageIndex + index + 1}
                    </td>
                    {columns[type].map((column) => (
                        <ModifiableCell
                            key={column}
                            type={type}
                            id={entry["id"]}
                            column={column}
                            value={entry[column]}
                        />
                    ))}
                    <DeleteButton setToDelete={setToDelete} id={entry["id"]} />
                </tr>
            ))}
        </tbody>
    );
}
