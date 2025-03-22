import React, { useEffect, useState } from "react";
import { Type } from "../types";
import Inputs from "./form components/Inputs";

function Forms() {
    const [selectedForm, setSelectedForm] = useState<Type>("jobs");

    return (
        <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
            <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Select Form Type
                </label>
                <select
                    value={selectedForm}
                    onChange={(e) => setSelectedForm(e.target.value as Type)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                    <option value="jobs"> Job </option>
                    <option value="accounts"> Account </option>
                </select>
            </div>

            <div className="mt-4">
                <Inputs type={selectedForm} />
            </div>
        </div>
    );
}

export default Forms;
