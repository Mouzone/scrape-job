export default function TabButton({
    onClick,
    text,
    value,
    data,
}: {
    onClick: React.MouseEventHandler<HTMLButtonElement>;
    text: string;
    value: string;
    data: string;
}) {
    return (
        <button
            onClick={onClick}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                data === `${value}`
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 hover:bg-gray-200"
            }`}
        >
            {text}
        </button>
    );
}
