import { useState } from "react"

const Inputs = () => {
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
            <option value="job">Job Application</option>
            <option value="account">Account Creation</option>
          </select>
        </div>
  
        <div className="mt-4">
          {selectedForm === 'job' ? <JobInput /> : <AccountInput />}
        </div>
      </div>
    );
  };
  
  const JobInput = () => {
    const [jobsite, setJobsite] = useState("");
    const [company, setCompany] = useState("");
    const [title, setTitle] = useState("");
  
    const onSubmit = async (e) => {
      e.preventDefault();
      await fetch("http://localhost:3000/jobs", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ jobsite, company, title })
      });
    };
  
    return (
      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Jobsite
          </label>
          <input
            type="text"
            value={jobsite}
            name="jobsite"
            onChange={(e) => setJobsite(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
  
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Company
          </label>
          <input
            type="text"
            value={company}
            name="company"
            onChange={(e) => setCompany(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
  
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Title
          </label>
          <input
            type="text"
            value={title}
            name="title"
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
  
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Submit
        </button>
      </form>
    );
  };
  
  const AccountInput = () => {
    const [company, setCompany] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
  
    const onSubmit = async (e) => {
      e.preventDefault();
      await fetch("http://localhost:3000/accounts", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ company, username, password })
      });
    };
  
    return (
      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Company
          </label>
          <input
            type="text"
            value={company}
            name="company"
            onChange={(e) => setCompany(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
  
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Username
          </label>
          <input
            type="text"
            value={username}
            name="username"
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
  
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Password
          </label>
          <input
            type="password"
            value={password}
            name="password"
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
  
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Submit
        </button>
      </form>
    );
  };

export default Inputs