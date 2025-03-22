"use client";
import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
    Type,
    Account,
    AccountKeys,
    Job,
    JobKeys,
    searchableKeys,
    Data,
} from "../types";

const columns = {
    accounts: ["company", "username", "password"] as AccountKeys[],
    jobs: ["applied", "jobsite", "company", "title"] as JobKeys[],
};

export default function Table({
    type,
    pageIndex,
    setPageIndex,
    error,
    isLoading,
    data,
}: {
    type: Type;
    pageIndex: number;
    setPageIndex: React.Dispatch<React.SetStateAction<number>>;
    error: boolean | undefined;
    isLoading: boolean;
    data: Account[] | Job[];
}) {
    const [toDelete, setToDelete] = useState<number | null>(null);
    const [increasing, setIncreasing] = useState<boolean>(true);

    const deleteEntry = () => {
        fetch("http://localhost:3000/" + type, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                id: toDelete,
            }),
        });
        setToDelete(null);
    };

    if (error)
        return (
            <div className="text-center py-8 text-red-600">Failed to load</div>
        );

    if (isLoading)
        return <div className="text-center py-8 text-gray-600">Loading...</div>;

    const sortedData = (
        type === "jobs" && !increasing ? [...data].reverse() : data
    ) as Data;
    const paginated = sortedData.slice(pageIndex, pageIndex + 50) as Data;
    return (
        <>
            <DeleteConfirmation
                deleteEntry={deleteEntry}
                toDelete={toDelete}
                setToDelete={setToDelete}
            />
            <div className="overflow-x-auto rounded-lg border border-gray-200">
                <table className="w-full border-collapse table-auto">
                    <TableHead
                        type={type}
                        setIncreasing={setIncreasing}
                        increasing={increasing}
                    />
                    <TableBody
                        type={type}
                        pageIndex={pageIndex}
                        data={paginated}
                        setToDelete={setToDelete}
                    />
                </table>
            </div>
            <PageNav
                pageIndex={pageIndex}
                setPageIndex={setPageIndex}
                filtered={data}
            />
        </>
    );
}
