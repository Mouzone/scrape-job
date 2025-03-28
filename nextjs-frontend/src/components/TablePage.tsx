import React, { useState, useEffect } from "react";
import Table from "./Table";
import TabButton from "./TabButton";
import Search from "./Search";
import { Type, searchableKeys, Data, Keys } from "../types";
import { columns } from "@/utility/consts";
import { collection, doc, getDocs } from "firebase/firestore";
import { firestore } from "@/utility/firebase";

export default function TablePage() {
    const [type, setType] = useState<Type>("jobs");
    const [searchTerm, setSearchTerm] = useState<Keys>(columns[type][0]);
    const [searchValue, setSearchValue] = useState<string>("");
    const [pageIndex, setPageIndex] = useState<number>(0);
    const [data, setData] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const documents = await getDocs(collection(firestore, type));
            const results = [];
            documents.forEach((document) => {
                results.push({
                    id: document.id,
                    ...document.data(),
                });
            });
            setData(results);
        }
        fetchData();
    });

    useEffect(() => {
        setSearchTerm(columns[type][0]);
        setSearchValue("");
    }, [type]);

    useEffect(() => {
        setPageIndex(0);
    }, [searchValue, type]);

    const filtered = (
        searchValue === ""
            ? data
            : data.filter((entry) =>
                  entry[searchTerm as searchableKeys<typeof entry>]
                      .toLowerCase()
                      .includes(searchValue)
              )
    ) as Data;

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
