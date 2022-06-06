import { render, screen } from "@testing-library/react";
import Card from ".";

const data = {
  title: "Some title",
  author: "Some author",
  urlToImage: "url",
  url: "some link",
  content: "some content",
  description: "some description",
  source: { name: "some source" },
  publishedAt: "2022-06-06T03:58:00Z",
};

describe("article card test", () => {
  it("renders the card properly", async () => {
    render(<Card data={data} />);

    const text = screen.getByText(/Some title/i);

    expect(text).toBeInTheDocument();
  });

  it("does not show author, source and date when not on article page", async () => {
    render(<Card data={data} />);

    const author = screen.queryByText(/Some author/i);
    const source = screen.queryByText(/some source/i);
    const publishedDate = screen.queryByText(/MON JUN 06 2022/i);

    expect(author).not.toBeInTheDocument();
    expect(source).not.toBeInTheDocument();
    expect(publishedDate).not.toBeInTheDocument();
  });

  it("shows all necessary data when on the article page", async () => {
    render(<Card data={data} isArticlePage />);

    const author = screen.getByText(/Some author/i);
    const source = screen.getByText(/some source/i);
    const publishedDate = screen.getByText(/MON JUN 06 2022/i);

    expect(author).toBeInTheDocument();
    expect(source).toBeInTheDocument();
    expect(publishedDate).toBeInTheDocument();
  });
});
