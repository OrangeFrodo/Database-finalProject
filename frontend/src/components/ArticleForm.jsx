import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createArticle } from "../features/articles/articleSlice";

function ArticleForm() {
  const [text, setText] = useState("");
  const [header, setHeader] = useState("");

  const dispatch = useDispatch();

  const onSubmit = (values) => {
    values.preventDefault();

    dispatch(createArticle({ header, text }));
    setText("");
    setHeader("");
  };

  return (
    <section className="form">
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="text">Header</label>
          <input
            type="header"
            id="header"
            name="header"
            value={header}
            onChange={(e) => setHeader(e.target.value)}
          />
          <label htmlFor="text">Text</label>
          <input
            type="text"
            id="text"
            name="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </div>
        <div className="form-group">
          <button className="btn btn-block" type="submit">
            Add goal
          </button>
        </div>
      </form>
    </section>
  );
}

export default ArticleForm;
