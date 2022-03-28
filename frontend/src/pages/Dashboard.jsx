import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ArticleForm from "../components/ArticleForm";
import Spinner from "../components/Spinner"
import { getArticles, reset } from "../features/articles/articleSlice";
import ArticleItem from "../components/ArticleItem";

function Dashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { goals, isLoading, isError, message } = useSelector((state) => state.articles);

  useEffect(() => {
    if(isError) {
      console.log(message);
    }

    if(!user) {
      navigate("/articles");
    }

    dispatch(getArticles())

    return () => {
      dispatch(reset())
    }

  }, [user, navigate, isError, message, dispatch]);

  if(isLoading) {
    return <Spinner />
  }

  return <>
    <section className="heading">
      <h1>Welcome {user && user.name}</h1>
    </section>
    <ArticleForm />

    <section className="content">
      {goals.length > 0 ? (
        <div className="goals">
          {goals.map((goal) => (
            <ArticleItem key={goal._id} goal={goal}/>
          ))}
        </div>
      ): (<h3>No articles yet</h3>)}
    </section>

  </>;
}

export default Dashboard;
