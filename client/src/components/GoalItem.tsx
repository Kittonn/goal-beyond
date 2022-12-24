import React from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store/store";
import { deleteGoal } from "../store/goal/goalAction";

interface GoalI {
  _id: string;
  text: string;
  user: string;
}

interface Props {
  item: GoalI;
}

const GoalItem: React.FC<Props> = ({ item }: any) => {
  const dispatch = useDispatch<AppDispatch>();
  return (
    <div>
      <p>{item.text}</p>
      <button onClick={() => dispatch(deleteGoal(item._id))}>Delete</button>
    </div>
  );
};

export default GoalItem;
