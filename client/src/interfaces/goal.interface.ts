export interface GoalBodyI {
  text: string;
}

export interface GoalI extends GoalBodyI {
  _id: string;
  user: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface GoalStateI {
  goals: GoalI[];
  status: "idle" | "loading" | "failed" | "success";
  message: string;
}
