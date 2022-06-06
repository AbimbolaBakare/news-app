import React from "react";
import "./index.css";
import PropTypes from "prop-types";

const Card = ({ data, isArticlePage, buttonClick }) => {
  return (
    <div className="top-headline-container">
      <div className="top-headline-header">
        <div
          className="top-headline-cover"
          style={{
            backgroundImage: `url(${data?.urlToImage})`,
          }}
        >
          {isArticlePage && (
            <div className="top-headline-author">
              <h3>{data?.author}</h3>
            </div>
          )}
        </div>
      </div>

      <div className="top-headline-body">
        <div className="top-headline-title">
          <h1>
            <a href={data?.url}>{data?.title}</a>
          </h1>
        </div>
        <div className="top-headline-summary">
          <p>{isArticlePage ? data?.content : data?.description}</p>
        </div>

        {isArticlePage && (
          <div className="top-headline-tags">
            <ul>
              <li>
                <small className="published-date">{data?.source?.name}</small>
              </li>
              <li>
                <small className="published-date">
                  {new Date(data?.publishedAt).toDateString()}
                </small>
              </li>
            </ul>
          </div>
        )}
      </div>

      <div className="top-headline-footer">
        {isArticlePage ? (
          <button data-testid="article-site">
            <a href={data?.url} target="_blank" rel="noreferrer">
              GO TO ARTICLE SITE
            </a>
          </button>
        ) : (
          <button onClick={buttonClick} data-testid="full-article">
            READ FULL ARTICLE
          </button>
        )}
      </div>
    </div>
  );
};

Card.propTypes = {
  data: PropTypes.object.isRequired,
  isArticlePage: PropTypes.bool,
  buttonClick: PropTypes.func,
};

Card.defaultProps = {
  data: null,
  isArticlePage: false,
  buttonClick: null,
};

export default Card;
