import axios from "axios";
import { GoalBodyI } from "../interfaces/goal.interface";

const createGoal = async (goalData: GoalBodyI, token: string) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(
    `${import.meta.env.VITE_API_URL}/goals/`,
    goalData,
    config
  );
  return response.data;
};

const getGoals = async (token: string) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(
    `${import.meta.env.VITE_API_URL}/goals/`,
    config
  );
  return response.data;
};

const deleteGoal = async (goalId: string, token: string) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.delete(
    `${import.meta.env.VITE_API_URL}/goals/${goalId}`,
    config
  );
  return response.data;
};

export default { createGoal, getGoals, deleteGoal };
