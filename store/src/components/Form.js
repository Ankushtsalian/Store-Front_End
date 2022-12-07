import React, { useState } from "react";
import "../Styles/form.css";

const Form = () => {
  const [form, setForm] = useState({
    featured: false,
    company: "",
  });

  const { featured, company } = form;

  const handleCheckbox = (event) => {
    setForm((formValues) => ({ ...formValues, featured: !featured }));
  };

  const handleSubmit = () => {};

  return (
    <div>
      <form className="formContainer" onSubmit={handleSubmit}>
        <div>
          <label>Company : </label> <input />
        </div>
        <div>
          <label>Featured : </label>
          <input type="checkbox" value={featured} onChange={handleCheckbox} />
        </div>
        <button>Submit</button>
      </form>
    </div>
  );
};

export default Form;
