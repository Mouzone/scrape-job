import { useState, useEffect } from "react";
import { fields } from "@/utility/consts";
import Input from "./input";
import SubmitButton from "./SubmitButton";

export default function Inputs({ type }: { type: Type }) {
    const [form, setForm] = useState(fields[type]);

    useEffect(() => {
        setForm(fields[type]);
    }, [type]);

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!Object.values(form).every((value) => value !== "")) {
            return;
        }
        await fetch("http://localhost:3000/" + type, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(form),
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
