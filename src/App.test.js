import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import App from "./App";
import RecipeSearch from "./components/carousel/RecipeSearch";
import { getRecipeSearchResults } from "./components/Utils";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
}));

jest.mock("./components/Utils.js", () => ({
  getRecipeSearchResults: jest.fn(),
}));

describe("RecipeSearch Component", () => {
  // const mockNavigate = useNavigate();

  beforeEach(() => {
    jest.clearAllMocks(); // Clear mocks before each test
  });
  test("renders search recipe title", () => {
    render(<RecipeSearch />);
    const searchTitle = screen.getByText(/Find Your Next Recipe/i);
    expect(searchTitle).toBeInTheDocument();
  });

  test("should render the search input and search button", () => {
    render(<RecipeSearch />);

    const inputElement = screen.getByPlaceholderText(/enter your recipe here/i);
    const buttonElement = screen.getByDisplayValue(/search/i);

    expect(inputElement).toBeInTheDocument();
    expect(buttonElement).toBeInTheDocument();
  });

  test("should update the query state when user types in the input", () => {
    render(<RecipeSearch />);

    const inputElement = screen.getByPlaceholderText(/enter your recipe here/i);

    fireEvent.change(inputElement, { target: { value: "pasta" } });

    expect(inputElement.value).toBe("pasta");
  });

  test("should call the API with the correct value after debounce time", async () => {
    render(<RecipeSearch />);

    const inputElement = screen.getByPlaceholderText(/enter your recipe here/i);

    fireEvent.change(inputElement, { target: { value: "pasta" } });

    await waitFor(
      () => {
        expect(getRecipeSearchResults).toHaveBeenCalledWith(
          "pasta",
          expect.any(Function)
        );
      },
      { timeout: 500 }
    ); // Ensure it waits for debounce time
  });

  test("should display an alert if search query is less than 3 characters", () => {
    window.alert = jest.fn(); // Mock alert

    render(<RecipeSearch />);

    const inputElement = screen.getByPlaceholderText(/enter your recipe here/i);
    const buttonElement = screen.getByDisplayValue(/search/i);

    fireEvent.change(inputElement, { target: { value: "pa" } });
    fireEvent.click(buttonElement);

    expect(window.alert).toHaveBeenCalledWith(
      "Value length must be greater than 2"
    );
  });
});
