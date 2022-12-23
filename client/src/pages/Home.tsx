import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState, AppDispatch } from "../store/store";
import { getGoals } from "../store/goal/goalAction";

const Home: React.FC = () => {
  const { goals, success, loading, error } = useSelector(
    (state: RootState) => state.goals
  );
  const { user } = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getGoals());
  }, [dispatch, navigate, user, error, success]);

  return (
    <div>
      <h1>Goal</h1>
      {goals.map((goal) => (
        <div key={goal._id}>
          <h3>{goal.text}</h3>
        </div>
      ))}
    </div>
  );
};

export default Home;
