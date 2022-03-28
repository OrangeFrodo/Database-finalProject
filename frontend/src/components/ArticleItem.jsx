import React from "react";
import { useDispatch } from "react-redux";
import { deleteGoal } from "../features/articles/articleSlice";

function ArticleItem({ goal }) {
  const dispatch = useDispatch();

  return (
    <div className="goal">
      <h2>{goal.header}</h2>
      <p>{goal.text}</p>
      <button onClick={() => dispatch(deleteGoal(goal._id))} className="close">
        X
      </button>
    </div>
  );
}

export default ArticleItem;
