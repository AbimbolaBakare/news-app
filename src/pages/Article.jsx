import React from "react";
import { selectSingleArticle } from "./articleSlice";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Card from "../components/Card";

export const Article = () => {
  const history = useHistory();
  const singleArticle = useSelector(selectSingleArticle);

  return (
    <div>
      <div className="back">
        <button className="search-button" onClick={() => history.push("/")}>
          GO BACK
        </button>
      </div>

      <Card data={singleArticle} isArticlePage />
    </div>
  );
};
