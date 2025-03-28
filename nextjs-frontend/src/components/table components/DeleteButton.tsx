export default function DeleteButton({
    setToDelete,
    id,
}: {
    setToDelete: React.Dispatch<React.SetStateAction<string>>;
    id: string;
}) {
    return (
        <td className="h-full">
            <div className="flex h-full items-center justify-center p-4">
                <button
                    className="flex items-center justify-center hover:bg-gray-100 rounded p-2 transition-colors"
                    type="button"
                    onClick={() => setToDelete(id)}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        className="fill-red-500 w-5"
                    >
                        <title>delete</title>
                        <path d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z" />
                    </svg>
                </button>
            </div>
        </td>
    );
}
