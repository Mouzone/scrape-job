export default function DeleteConfirmation({
    toDelete,
    setToDelete,
    deleteEntry,
}: {
    toDelete: number | null;
    setToDelete: React.Dispatch<React.SetStateAction<number | null>>;
    deleteEntry: React.MouseEventHandler<HTMLButtonElement>;
}) {
    return (
        <div
            className={`${
                toDelete === null ? "hidden" : "block"
            } fixed inset-0 bg-black/50 flex items-center justify-center z-50`}
        >
            <div className="bg-white rounded-lg shadow-xl p-6 max-w-sm w-full mx-4">
                <h1 className="text-xl font-semibold mb-4 text-center">
                    Confirm Delete?
                </h1>
                <div className="flex gap-4 justify-center">
                    <button
                        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                        onClick={deleteEntry}
                    >
                        Yes
                    </button>
                    <button
                        className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 transition-colors"
                        onClick={() => setToDelete(null)}
                    >
                        No
                    </button>
                </div>
            </div>
        </div>
    );
}
