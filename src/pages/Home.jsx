import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectTopHeadlines, setSingleArticle } from "./articleSlice";
import { getTopHeadLines, searchNews } from "../services/topHeadlineService";
import { useHistory } from "react-router-dom";
import { Loader } from "../components/Loader";
import Card from "../components/Card";

export const Home = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [page, setPage] = useState(1);
  const [searchParam, setSearchParam] = useState("");
  const [sortValue, setSortValue] = useState("");

  const { loading, data } = useSelector(selectTopHeadlines);

  const queryString = `q=${searchParam}&sortBy=${sortValue}`;

  useEffect(() => {
    dispatch(getTopHeadLines(page));
  }, [dispatch, page]);

  const searchEveryThing = () => {
    if (searchParam !== "") {
      dispatch(searchNews(queryString));
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div>
      <h1 className="page-title">Top Headlines</h1>

      <div className="search-option">
        <input
          type="search"
          className="search-bar"
          value={searchParam}
          placeholder="Search"
          onChange={(e) => setSearchParam(e.target.value)}
          data-testid="search-input"
        />

        {searchParam !== "" && (
          <div>
            <select
              value={sortValue}
              onChange={(e) => setSortValue(e.target.value)}
            >
              <option value="">Sort By</option>
              <option value="popularity">Popularity</option>
              <option value="relevancy">Relevancy</option>
              <option value="publishedAt">Published Date</option>
            </select>
          </div>
        )}

        <button
          className="search-button"
          onClick={searchEveryThing}
          data-testid="search-button"
        >
          Search
        </button>
      </div>

      {data?.articles && data?.articles.length !== 0 ? (
        data?.articles.map((item) => {
          return (
            <div key={item?.url} data-testid="top-headlines">
              <Card
                data={item}
                isArticlePage={false}
                buttonClick={() => {
                  dispatch(setSingleArticle(item));
                  history.push("/article");
                }}
              />
            </div>
          );
        })
      ) : (
        <div className="center">Nothing to see here</div>
      )}

      {data?.articles && data?.articles.length !== 0 && (
        <div className="load-more">
          <button
            onClick={() => {
              setPage(page + 1);
              window.scrollTo(0, 0);
            }}
          >
            LOAD MORE
          </button>
        </div>
      )}
    </div>
  );
};
