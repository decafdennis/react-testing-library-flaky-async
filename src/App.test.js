import { act, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";

test("increment", async () => {
  render(<App />);
  const count = screen.getByTestId("count");
  const cascadedCount = screen.getByTestId("cascaded-count");
  expect(count).toHaveTextContent("0");
  expect(cascadedCount).toHaveTextContent("0");

  const button = screen.getByText("Increment");
  await userEvent.click(button);
  // Solution 1: wait for the async behavior in act() so that the cascading render happens here.
  // await act(async () => {
  //   await new Promise(resolve => setTimeout(resolve));
  // });
  await waitFor(async () => {
    expect(count).toHaveTextContent("1");
  });
  // Solution 2: yield to the next macrotask so that any batched renders can happen.
  // await new Promise(resolve => setTimeout(resolve));
  expect(cascadedCount).toHaveTextContent("1");
});
