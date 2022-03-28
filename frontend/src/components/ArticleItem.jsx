import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteItem } from "../features/articles/articleSlice";

function ArticleItem({ goal }) {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  return (
    <div className="goal">
      <h2>{goal.header}</h2>
      <p>{goal.text}</p>
      {!user ? (
        <></>
      ) : (
        <button
          onClick={() => dispatch(deleteItem(goal._id))}
          className="close"
        >
          X
        </button>
      )}
    </div>
  );
}

export default ArticleItem;
