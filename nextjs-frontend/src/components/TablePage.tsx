import React, { useState, useEffect } from "react";
import Table from "./Table";
import TabButton from "./TabButton";
import Search from "./Search";
import useSWR, { mutate } from "swr";
import {
    Type,
    AccountKeys,
    JobKeys,
    searchableKeys,
    Data,
    Keys,
} from "../types";
import { columns } from "@/utility/consts";

const fetcher = (...args: [string]) => fetch(...args).then((res) => res.json());

export default function TablePage() {
    const [type, setType] = useState<Type>("jobs");
    const [searchTerm, setSearchTerm] = useState<Keys>(columns[type][0]);
    const [searchValue, setSearchValue] = useState<string>("");
    const [pageIndex, setPageIndex] = useState<number>(0);
    const {
        data,
        error,
        isLoading,
    }: { data: Data; error: boolean | undefined; isLoading: boolean } = useSWR(
        "http://localhost:3000/" + type,
        fetcher
    );
    const [subscribed, setSubscribed] = useState<Type[]>([]);

    useEffect(() => {
        setSearchTerm(columns[type][0]);
        setSearchValue("");
    }, [type]);

    useEffect(() => {
        setPageIndex(0);
    }, [searchValue, type]);

    useEffect(() => {
        const socket = new WebSocket("ws://localhost:3000/ws");

        // probably use a different useEffect
        socket.onopen = () => {
            if (!(type in subscribed)) {
                socket.send(JSON.stringify({ action: "subscribe", type }));
                setSubscribed([...subscribed, type]);
            }
        };

        socket.onmessage = (event) => {
            const message = JSON.parse(event.data);

            switch (message.action) {
                case "post":
                    mutate(
                        "http://localhost:3000/" + message.type,
                        (prevData) => [...prevData, message.payload],
                        false
                    );
                    break;
                case "put":
                    mutate(
                        "http://localhost:3000/" + message.type,
                        (prevData) =>
                            prevData.map((item) =>
                                item.id === message.payload.id
                                    ? message.payload
                                    : item
                            ),
                        false
                    );
                    break;
                case "delete":
                    mutate(
                        "http://localhost:3000/" + message.type,
                        (prevData) =>
                            prevData.filter(
                                (item) => item.id !== message.payload.id
                            ),
                        false
                    );
                    break;
            }
        };

        socket.onerror = (error) => {
            console.error("WebSocket error:", error);
        };

        socket.onclose = () => {
            console.log("Websocket closed");
        };

        return () => {
            if (socket.readyState === WebSocket.OPEN) {
                socket.close();
            }
        };
    }, []);

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
                error={error}
                isLoading={isLoading}
                data={filtered}
            />
        </>
    );
}
