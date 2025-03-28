import React, { useState, useEffect } from "react";
import Table from "./Table";
import TabButton from "./TabButton";
import Search from "./Search";
import { columns } from "@/utility/consts";
import { collection, getDocs } from "firebase/firestore";
import { firestore } from "@/utility/firebase";
import { Account, FormType, Job } from "@/utility/types";

export default function TablePage() {
    const [type, setType] = useState<FormType>("jobs");
    const [searchTerm, setSearchTerm] = useState(columns[type][0]);
    const [searchValue, setSearchValue] = useState<string>("");
    const [pageIndex, setPageIndex] = useState<number>(0);
    const [data, setData] = useState<Account[] | Job[]>([]);

    useEffect(() => {
        async function fetchData() {
            const documents = await getDocs(collection(firestore, type));
            const results: Account[] | Job[] = [];
            documents.forEach((document) => {
                results.push({
                    id: document.id,
                    ...document.data(),
                } as Account | Job);
            });
            setData(results);
        }
        fetchData();
    }, [type]);

    useEffect(() => {
        setSearchTerm(columns[type][0]);
        setSearchValue("");
    }, [type]);

    useEffect(() => {
        setPageIndex(0);
    }, [searchValue, type]);

    const filtered =
        searchValue === ""
            ? data
            : data.filter((entry) =>
                  entry[searchTerm].toLowerCase().includes(searchValue)
              );

    return (
        <>
            <div className="mb-6 flex gap-4">
                <TabButton
                    onClick={() => setType("jobs")}
                    text="Jobs"
                    value="jobs"
                    data={type}
                />
                <TabButton
                    onClick={() => setType("accounts")}
                    text="Accounts"
                    value="accounts"
                    data={type}
                />
                <Search
                    type={type}
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                    searchValue={searchValue}
                    setSearchValue={setSearchValue}
                />
            </div>
            <Table
                type={type}
                pageIndex={pageIndex}
                setPageIndex={setPageIndex}
                data={filtered}
            />
        </>
    );
}
