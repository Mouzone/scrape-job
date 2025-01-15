import { useState } from "react"

function Inputs() {
		const [selectedForm, setSelectedForm] = useState('job');
	
		return (
			<div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
				<div className="mb-6">
					<label className="block text-sm font-medium text-gray-700 mb-2">
						Select Form Type
					</label>
					<select 
						value={selectedForm}
						onChange={(e) => setSelectedForm(e.target.value)}
						className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
					>
						<option value="job"> Job </option>
						<option value="account"> Account </option>
					</select>
				</div>
	
				<div className="mt-4">
					{selectedForm === 'job' ? <JobInputs /> : <AccountInputs/>}
				</div>
			</div>
		);
	};
	
function JobInputs() {
		const [jobsite, setJobsite] = useState("");
		const [company, setCompany] = useState("");
		const [title, setTitle] = useState("");
	
		const onSubmit = async (e) => {
			e.preventDefault();
			if (!jobsite || !company || !title) {
				return
			}
			await fetch("http://localhost:3000/jobs", {
				method: "POST",
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ jobsite, company, title })
			});
			setJobsite("")
			setCompany("")
			setTitle("")
		};
	
		return (
			<form onSubmit={onSubmit} className="space-y-4">
				<Input label="Jobsite" value={jobsite} onChange={(e) => setJobsite(e.target.value)}/>
				<Input label="Company" value={company} onChange={(e) => setCompany(e.target.value)}/>
				<Input label="Title" value={title} onChange={(e) => setTitle(e.target.value)}/>
				<SubmitButton/>
			</form>
		);
	};
	
function AccountInputs() {
		const [company, setCompany] = useState("");
		const [username, setUsername] = useState("");
		const [password, setPassword] = useState("");
	
		const onSubmit = async (e) => {
			e.preventDefault();
			if (!company || !username || !password) {
				return
			}
			await fetch("http://localhost:3000/accounts", {
				method: "POST",
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ company, username, password })
			});
			setCompany("")
			setUsername("")
			setPassword("")
		};
	
		return (
			<form onSubmit={onSubmit} className="space-y-4">
				<Input label="Company" value={company} onChange={(e) => setCompany(e.target.value)}/>
				<Input label="Username" value={username} onChange={(e) => setUsername(e.target.value)}/>
				<Input label="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
				<SubmitButton/>
			</form>
		);
	};

function Input({label, value, onChange}) {
	return (
		<div>
			<label className="block text-sm font-medium text-gray-700 mb-1">
				{label}
			</label>
			<input
				type="text"
				name={value}
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
export default Inputs