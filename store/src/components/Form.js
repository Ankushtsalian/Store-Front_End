import React, { useState, useEffect } from "react";
import axios from "axios";
import "../Styles/form.css";
const URL = "http://localhost:5000/api/v1/products";
const companyList = ["ikea", "liddy", "caressa", "marcos"];

const Form = () => {
  const [form, setForm] = useState({
    featured: false,
    name: "",
    company: "",
  });
  const [response, setResponse] = useState([]);

  const { featured, company, name } = form;

  const handleCheckbox = (event) => {
    setForm((formValues) => ({ ...formValues, featured: !featured }));
  };

  const handleSelect = (event) => {
    const { value } = event.target;
    setForm((formValues) => ({ ...formValues, company: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const res = await axios.get(
        `${URL}?featured=${featured}&company=${company}&name=${name}`
      );
      setResponse(res.data.msg);
    } catch (error) {
      console.log(error.response);
    }
  };

  const handleName = (event) => {
    const { value } = event.target;
    setForm((formValues) => ({ ...formValues, name: value }));
  };

  return (
    <div>
      <form className="formContainer" onSubmit={handleSubmit}>
        <div>
          <label>Company : </label>
          <select onChange={handleSelect}>
            {companyList.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>name : </label>
          <input onChange={handleName} />
        </div>
        <div>
          <label>Featured : </label>
          <input type="checkbox" value={featured} onChange={handleCheckbox} />
        </div>
        <button>Submit</button>
      </form>
      <div>
        {response.map((result, i) => {
          const { name, price, featured, rating, createdAt, company } = result;
          return (
            <ol>
              <li>index : {i + 1}</li>
              <li>name : {name}</li>
              <li>price : {price}</li>
              <li>featured : {String(featured)}</li>
              <li>rating : {rating}</li>
              <li>createdAt : {createdAt}</li>
              <li>company : {company}</li>
            </ol>
          );
        })}
      </div>{" "}
    </div>
  );
};

export default Form;
