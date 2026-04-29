import { render, screen } from "@testing-library/react";
import Profile from "./Profiles";

test("renders profile heading", () => {
  render(<Profile />);
  const text = screen.getByText(/profile/i);
  expect(text).toBeInTheDocument();
});