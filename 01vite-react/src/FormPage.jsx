import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const initialFormState = {
  firstName: "",
  lastName: "",
  username: "",
  email: "",
  password: "",
  phoneCode: "",
  phoneNumber: "",
  country: "",
  city: "",
  pan: "",
  aadhar: "",
};

export default function FormPage() {
  const [form, setForm] = useState(initialFormState);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const navigate = useNavigate();

  const countries = { India: ["Delhi", "Mumbai", "Bangalore"], USA: ["New York", "Los Angeles", "Chicago"] };

  const validate = () => {
    const errs = {};
    if (!form.firstName) errs.firstName = "First Name is required.";
    if (!form.lastName) errs.lastName = "Last Name is required.";
    if (!form.username) errs.username = "Username is required.";
    if (!form.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = "Valid email required.";
    if (!form.password) errs.password = "Password is required.";
    if (!form.phoneCode || !form.phoneNumber) errs.phoneNumber = "Phone number and country code required.";
    if (!/^\d{10}$/.test(form.phoneNumber)) {
    errs.phoneNumber = "Phone number must be exactly 10 digits.";}
    if (!form.country) errs.country = "Country is required.";
    if (!form.city) errs.city = "City is required.";
    if (!form.pan) errs.pan = "PAN number required.";
    if (!form.aadhar) errs.aadhar = "Aadhar number required.";
     if (!/^\d{12}$/.test(form.aadhar)) {
    errs.aadhar = "Aadhar number must be exactly 12 digits.";}
    if (!/^[A-Z0-9]{10}$/i.test(form.pan)) {
    errs.pan = "PAN number must be exactly 10 alphanumeric characters.";}
    return errs;
  };

  useEffect(() => {
    setErrors(validate());
  }, [form]);

  useEffect(() => {
    setIsValid(Object.keys(errors).length === 0);
  }, [errors]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleBlur = (e) => {
    setTouched({ ...touched, [e.target.name]: true });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isValid) navigate("/success", { state: form });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
    <form className="bg-white p-10 rounded-3xl shadow-xl w-full max-w-3xl mx-auto" onSubmit={handleSubmit}>
       <h2 className="text-2xl font-bold mb-6 text-center text-gray-700">
         Enter Your Information
     </h2>
     <div className="grid grid-cols-2 gap-4">
      {Object.keys(initialFormState).map((field) => (
        field !== "city" && field !== "country" && field !== "phoneCode" && field !== "phoneNumber" ? (
          <div key={field}>
            <label className="block">
              {field.charAt(0).toUpperCase() + field.slice(1)}
              <input
                type={field === "password" ? (showPassword ? "text" : "password") : "text"}
                name={field}
                value={form[field]}
                onChange={handleChange}
                onBlur={handleBlur}
                className="w-full border p-2 rounded"
              />
            </label>
            {field === "password" && (
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="text-sm text-blue-600">
                {showPassword ? "Hide" : "Show"} Password
              </button>
            )}
            {touched[field] && errors[field] && <p className="text-red-600 text-sm">{errors[field]}</p>}
          </div>
        ) : null
      ))}
      


     
      <div>
        <div className="flex w-full gap-2">
 
  <div className="w-1/4">
    <label className="block text-sm font-medium mb-1">Code</label>
    <input
      type="text"
      name="phoneCode"
      placeholder="+91"
      value={form.phoneCode}
      onChange={handleChange}
      onBlur={handleBlur}
      className="w-full border p-2 rounded"
    />
  </div>

  <div className="w-3/4">
    <label className="block text-sm font-medium mb-1">Phone Number</label>
    <input
      type="text"
      name="phoneNumber"
      value={form.phoneNumber}
      onChange={handleChange}
        onBlur={handleBlur}
      className="w-full border p-2 rounded"
    />
  </div>
</div>

      </div>
    

      <div>
        <label className="block">
          Country
          <select name="country" value={form.country} onChange={handleChange} onBlur={handleBlur} className="w-full border p-2 rounded">
            <option value="">Select Country</option>
            {Object.keys(countries).map((country) => (
              <option key={country} value={country}>{country}</option>
            ))}
          </select>
        </label>
        {touched.country && errors.country && <p className="text-red-600 text-sm">{errors.country}</p>}
      </div>

      <div>
        <label className="block">
          City
          <select name="city" value={form.city} onChange={handleChange} onBlur={handleBlur} className="w-full border p-2 rounded">
            <option value="">Select City</option>
            {(countries[form.country] || []).map((city) => (
              <option key={city} value={city}>{city}</option>
            ))}
          </select>
        </label>
        {touched.city && errors.city && <p className="text-red-600 text-sm">{errors.city}</p>}
      </div>
      </div>
      <br />
      <button type="submit" disabled={!isValid} className="px-6 py-2 flex justify-center text-sm font-semibold text-white bg-blue-500 rounded-full hover:bg-blue-600 transition-colors">
        Submit
      </button>
      
    </form>
    </div>
    
  );
}
