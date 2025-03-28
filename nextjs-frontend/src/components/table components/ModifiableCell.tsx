import { firestore } from "@/utility/firebase";
import { FormType } from "@/utility/types";
import { doc, Timestamp, updateDoc } from "firebase/firestore";
import { useState } from "react";

export default function ModifiableCell({
    type,
    id,
    column,
    value,
}: {
    type: FormType;
    id: string;
    column: string;
    value: string;
}) {
    const [edit, setEdit] = useState(false);
    const [newValue, setNewValue] = useState(value);

    if (column === "applied") {
        value = "5";
    }

    const sendEdit = async () => {
        setEdit(false);
        await updateDoc(doc(firestore, type, id), { [column]: newValue });
    };

    return (
        <td className="p-4">
            {edit && column !== "applied" ? (
                <input
                    value={newValue}
                    onBlur={sendEdit}
                    onChange={(e) => setNewValue(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            sendEdit();
                        }
                    }}
                />
            ) : (
                <span
                    onDoubleClick={
                        column !== "applied" ? () => setEdit(true) : undefined
                    }
                >
                    {value}
                </span>
            )}
        </td>
    );
}
