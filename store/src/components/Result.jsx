import React from "react";

const Result = ({ result, index }) => {
  const { name, price, featured, rating, createdAt, company } = result;
  return (
    <ol>
      <li>index : {index + 1}</li>
      <li>name : {name}</li>
      <li>price : {price}</li>
      <li>featured : {String(featured)}</li>
      <li>rating : {rating}</li>
      <li>createdAt : {createdAt}</li>
      <li>company : {company}</li>
    </ol>
  );
};

export default Result;
