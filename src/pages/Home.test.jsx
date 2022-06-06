import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { Home } from "./Home";
import axios from "axios";
import store from "../store";
import { baseUrl } from "../config";

jest.mock("axios");

const mockData = {
  articles: [
    {
      title: "Some title",
      author: "Some author",
      urlToImage: "url",
      url: "some link",
      content: "some content",
      description: "some description",
      source: { name: "some source" },
      publishedAt: "2022-06-06T03:58:00Z",
    },
  ],
};

const renderHomePage = async () => {
  render(
    <Provider store={store}>
      <Home />
    </Provider>
  );

  await waitFor(() => {
    expect(screen.getByTestId("loader")).toBeInTheDocument();
  });

  await waitFor(() => {
    expect(store.getState().article.topHeadlines.loading).toBe(false);
  });
};

describe("article card test", () => {
  it("renders the page properly", async () => {
    axios.get.mockResolvedValueOnce({ data: mockData });
    await renderHomePage();

    const resolvedData = await screen.findByTestId("top-headlines");

    expect(resolvedData).toHaveTextContent("Some title");
    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(axios.get).toHaveBeenCalledWith(
      `${baseUrl}/top-headlines?country=us&page=1`
    );
  });

  it("displays proper message when there's no data", async () => {
    axios.get.mockResolvedValueOnce({ data: { articles: [] } });
    await renderHomePage();

    const displayMessage = screen.getByText("Nothing to see here");

    expect(displayMessage).toBeInTheDocument();
  });

  it("calls the search api when searching", async () => {
    axios.get.mockResolvedValueOnce({ data: mockData });
    await renderHomePage();
    const searchText = "holiday";

    axios.get.mockClear();

    const searchInput = screen.getByTestId(/search-input/i);
    fireEvent.change(searchInput, {
      target: { value: searchText },
    });
    expect(searchInput).toHaveValue(searchText);

    const searchButton = screen.getByTestId(/search-button/i);
    fireEvent.click(searchButton);

    await waitFor(() => {
      expect(screen.getByTestId("loader")).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(store.getState().article.topHeadlines.loading).toBe(false);
    });

    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(axios.get).toHaveBeenCalledWith(
      `${baseUrl}/everything?q=${searchText}&sortBy=`
    );
  });
});
