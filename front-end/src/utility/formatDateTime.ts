export default function formatDateTime(input: string) {
    const date = new Date(input);
    const options = { year: "numeric", month: "numeric", day: "numeric"};
    return date.toLocaleDateString("en-US", options)
}