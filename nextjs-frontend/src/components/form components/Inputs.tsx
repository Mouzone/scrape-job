import { useState, useEffect } from "react";
import { fields } from "@/utility/consts";
import Input from "./Input";
import SubmitButton from "./SubmitButton";
import { addDoc, collection } from "firebase/firestore";
import { firestore } from "@/utility/firebase";
import { FormType } from "@/utility/types";

export default function Inputs({ type }: { type: FormType }) {
    const [form, setForm] = useState(fields[type]);

    useEffect(() => {
        setForm(fields[type]);
    }, [type]);

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!Object.values(form).every((value) => value !== "")) {
            return;
        }
        const today = new Date();
        const day = String(today.getDate()).padStart(2, "0"); // Ensures 2 digits (e.g., 02)
        const month = String(today.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
        const year = String(today.getFullYear()).slice(-2); // Last 2 digits of year

        const formattedDate = `${month}/${day}/${year}`;
        await addDoc(collection(firestore, type), {
            applied: formattedDate,
            ...form,
        });
        setForm(fields[type]);
    };

    return (
        <form onSubmit={onSubmit} className="space-y-4">
            {Object.entries(form).map(([key, value]) => (
                <Input
                    key={key}
                    label={key.charAt(0).toUpperCase() + key.slice(1)}
                    value={value}
                    onChange={(e) =>
                        setForm({ ...form, [key]: e.target.value })
                    }
                />
            ))}
            <SubmitButton />
        </form>
    );
}
