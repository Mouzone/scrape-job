import React, { useEffect, useState } from "react"

const fields = {
	jobs: {
		jobsite: "",
		company: "",
		title: ""
	},
	accounts: {
		company: "",
		username: "",
		password: ""
	}
}

type Type = "jobs" | "accounts"

function Forms() {
		const [selectedForm, setSelectedForm] = useState<Type>('jobs');
	
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
	};

function Inputs({type}: {type: Type}) {
	const [form, setForm] = useState(fields[type])

	useEffect(() => {
		setForm(fields[type])
	}, [type])

	const onSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (!Object.values(form).every(value => value !== "")) {
			return
		}
		await fetch("http://localhost:3000/" + type, {
			method: "POST",
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(form)
		});
		setForm(fields[type])
	}

	return (
		<form onSubmit={onSubmit} className="space-y-4">
			{
				Object.entries(form).map(([key, value]) => (
					<Input 
						key={key}
						label={key.charAt(0).toUpperCase() + key.slice(1)}
						value={value}
						onChange={(e) => setForm({...form, [key]: e.target.value})}
					/>))
			}
			<SubmitButton/>
		</form>
	)
}

function Input({label, value, onChange}: {label: string, value: string, onChange: React.ChangeEventHandler<HTMLInputElement>}) {
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
	)
}

function SubmitButton() {
	return (
		<button
			type="submit"
			className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
		>
			Submit
		</button>
	)
}
export default Forms