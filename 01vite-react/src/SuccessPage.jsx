import React from "react";
import { useLocation, Link } from "react-router-dom";

export default function SuccessPage() {
  const { state } = useLocation();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
    <div className="bg-white p-10 rounded-3xl shadow-xl w-full max-w-3xl mx-auto">
      <h2 className="ext-2xl font-bold mb-6 text-center text-gray-700">Submission Successful</h2>
      <ul className="space-y-2">
        {Object.entries(state).map(([key, value]) => (
          <li key={key}><strong>{key}:</strong> {value}</li>
        ))}
      </ul>
      <Link to="/" className="mt-4 inline-block text-blue-600 underline">Back to Form</Link>
    </div>
   </div> 
  );
}
