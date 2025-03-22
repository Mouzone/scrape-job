export default function Input({
    label,
    value,
    onChange,
}: {
    label: string;
    value: string;
    onChange: React.ChangeEventHandler<HTMLInputElement>;
}) {
    return (
        <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
                {label}
            </label>
            <input
                type="text"
                name={label}
                value={value}
                onChange={onChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
        </div>
    );
}
