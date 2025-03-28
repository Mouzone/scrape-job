"use client";
import React, { useState } from "react";
import DeleteConfirmation from "./table components/DeleteConfirmation";
import TableHead from "./table components/TableHead";
import TableBody from "./table components/TableBody";
import PageNav from "./table components/PageNav";
import { Type, Account, Job, Data } from "../types";
import { deleteDoc, doc } from "firebase/firestore";
import { firestore } from "@/utility/firebase";

export default function Table({
    type,
    pageIndex,
    setPageIndex,
    data,
}: {
    type: Type;
    pageIndex: number;
    setPageIndex: React.Dispatch<React.SetStateAction<number>>;
    data: Account[] | Job[];
}) {
    const [toDelete, setToDelete] = useState<string>("");
    const [increasing, setIncreasing] = useState<boolean>(true);

    const deleteEntry = async () => {
        setToDelete("");
        await deleteDoc(doc(firestore, type, toDelete));
    };

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
