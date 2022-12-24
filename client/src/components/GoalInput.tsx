import React, { useState } from "react";
import { createGoal } from "../store/goal/goalAction";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store/store";

const GoalInput: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [text, setText] = useState("");

  const create = () => {
    if(text === "") return;
    dispatch(createGoal(text));
    setText("");
  }

  return (
    <div>
      <input
        type="text"
        value={text}
        className="block border-1px border-black py-1px px-2 rounded-md"
        onChange={(e) => setText(e.target.value)}
      />
      <button onClick={create}>Add</button>
    </div>
  );
};

export default GoalInput;
