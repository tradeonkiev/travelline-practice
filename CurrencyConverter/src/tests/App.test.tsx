import { fireEvent, render } from "@testing-library/react";
import { expect, test } from "vitest";
import App from "../App";

test("RecalculateResultWhenAmountChanges", () => {
  render(<App />);

  const amountInput = document.getElementById(
    "from-input-amount",
  ) as HTMLInputElement;
  const resultInput = document.getElementById(
    "to-input-amount",
  ) as HTMLInputElement;

  fireEvent.change(amountInput, {
    target: { value: "2" },
  });

  expect(resultInput.value).toBe("5.9");
});
