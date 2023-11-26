import { fireEvent, render, screen } from "@testing-library/react";
import BookingForm from "./BookingForm";

describe("BookingForm", () => {
  test("Submission is disabled if any field is invalid", () => {
    const handleSubmit = jest.fn();
    const updateTimes = jest.fn;
    render(<BookingForm onSubmit={handleSubmit} updateTimes={updateTimes} />);

    // Number of Guests Field
    const numberInput = screen.getByLabelText(/Number of Guests:/);
    fireEvent.change(numberInput, { target: { value: 11 } });
    expect(handleSubmit).not.toHaveBeenCalled();
    const guestsErrorMessage = screen.getByText(
      /Please enter a number between 1 and 10/i
    );
    expect(guestsErrorMessage).toBeInTheDocument();

    // Date Field
    const dateInput = screen.getByLabelText(/Choose Date:/);
    fireEvent.change(dateInput, { target: { value: "2022-01-01" } });
    expect(handleSubmit).not.toHaveBeenCalled();
    const dateErrorMessage = screen.getByText(/Please choose a valid date/i);
    expect(dateErrorMessage).toBeInTheDocument();

    // Submit Button
    const submitButton = screen.getByRole("button");
    fireEvent.click(submitButton);

    expect(handleSubmit).not.toHaveBeenCalled();
    expect(submitButton).toHaveAttribute("disabled");
  });
});
