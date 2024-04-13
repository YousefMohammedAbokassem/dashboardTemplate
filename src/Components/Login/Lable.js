import React from "react";

export default function Lable({
  HtmlFor,
  setValue,
  ClassName,
  Name,
  Id,
  Type,
  Info,
}) {
  return (
    <label htmlFor={HtmlFor} className="d-flex flex-column mt-2">
      {Info}
      <input
        className="mt-1"
        type={Type}
        name={Name}
        id={Id}
        onChange={(e) => setValue(e.target.value)}
      />
    </label>
  );
}
