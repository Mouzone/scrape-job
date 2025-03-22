export default function ModifiableCell({
    type,
    id,
    column,
    value,
}: {
    type: Type;
    id: number;
    column: string;
    value: string | number;
}) {
    const [edit, setEdit] = useState(false);
    const [newValue, setNewValue] = useState(value);

    if (column === "applied") {
        const date = new Date(value);
        const formattedDate = date.toLocaleDateString("en-US", {
            year: "2-digit",
            month: "2-digit",
            day: "2-digit",
        });
        value = formattedDate;
    }

    const sendEdit = () => {
        setEdit(false);
        fetch("http://localhost:3000/" + type, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                id,
                column,
                newValue,
            }),
        });
    };

    return (
        <td className="p-4 border-b">
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
