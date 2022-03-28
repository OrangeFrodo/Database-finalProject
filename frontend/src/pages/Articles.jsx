import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ArticleForm from "../components/ArticleForm";
import Spinner from "../components/Spinner"
import { getArticlesAll, reset } from "../features/articles/articleSlice";
import ArticleItem from "../components/ArticleItem";

function Articles() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { goals, isLoading, isError, message } = useSelector(
    (state) => state.articles
  );

  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    dispatch(getArticlesAll());

    return () => {
      dispatch(reset());
    };
  }, [navigate, isError, message, dispatch]);

  if (isLoading) {
    return <Spinner />;
  }
  return (
    <div>
      <section className="content">
        {goals.length > 0 ? (
          <div className="goals">
            {goals.map((goal) => (
              <ArticleItem key={goal._id} goal={goal} />
            ))}
          </div>
        ) : (
          <h3>No articles yet</h3>
        )}
      </section>
    </div>
  );
}

export default Articles;
