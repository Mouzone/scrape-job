export default function PageNav({
    pageIndex,
    setPageIndex,
    filtered,
}: {
    pageIndex: number;
    setPageIndex: React.Dispatch<React.SetStateAction<number>>;
    filtered: Array<Object>;
}) {
    const limit = Math.floor(filtered.length / 50) * 50;

    return (
        <div className="m-6 flex justify-between items-center">
            <div className="text-sm text-gray-600">
                Showing {pageIndex + 1}-
                {Math.min(pageIndex + 50, filtered.length)} of {filtered.length}
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
                    onClick={() =>
                        setPageIndex(Math.min(limit, pageIndex + 50))
                    }
                    disabled={pageIndex + 50 >= filtered.length}
                    className="flex items-center gap-1 px-4 py-2 rounded-lg bg-white border border-gray-200 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    Next
                    <ChevronRight className="w-4 h-4" />
                </button>
            </div>
        </div>
    );
}
