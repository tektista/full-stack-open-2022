import React from "react";

const Filter = ({ inputValue, onChangeFunction }) => (
    <>
      <div>
        filter shown with{" "}
        <input value={inputValue} onChange={onChangeFunction}></input>
      </div>
    </>
);

export default Filter;

