import { act, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";

// This test is flaky.
test("increment", async () => {
  render(<App />);
  const queryInput = screen.getByTestId("query-input");
  const query = screen.getByTestId("query");
  const count = screen.getByTestId("count");
  const increment = screen.getByTestId("increment");

  await userEvent.type(queryInput, 'hello');

  // Solution 1: wait for the async behavior in act() so that the cascading render happens here.
  // await act(async () => {
  //   await new Promise(resolve => setTimeout(resolve));
  // });

  // NOT a solution: this only guarantees the first render happened, but not the cascading render.
  await waitFor(() => {
    expect(query).toHaveTextContent("hello");
  }, { interval: 0 });

  // Solution 2: yield to the event loop to allow the cascading render to happen.
  await new Promise(resolve => setTimeout(resolve));

  await userEvent.click(increment);
  expect(count).toHaveTextContent("1");
});
