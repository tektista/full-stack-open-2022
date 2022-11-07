import React from "react";

const PersonForm = ({
  onSubmitFunction,
  nameInputValue,
  nameInputOnChangeFunction,
  numberInputValue,
  numberInputOnChangeFunction,
}) => (
  <>
    <form onSubmit={onSubmitFunction}>
      <div>
        {/* input value changed to newName which is ian initial useState value
            onChange required to be able to edit input field - we need an event handler
            that syncs changes made to input with component's state */}
        name:{" "}
        <input value={nameInputValue} onChange={nameInputOnChangeFunction} />
      </div>

      <div>
        number:{" "}
        <input
          value={numberInputValue}
          onChange={numberInputOnChangeFunction}
        />
      </div>

      <div>
        <button type="submit">add</button>
      </div>
    </form>
  </>
);

export default PersonForm;
