import { render, screen, fireEvent } from "@testing-library/react";
import React from "react";
import { useForm } from "react-hook-form";

import CustomFormField, { FormFieldType } from "../components/CustomFormField";

test("CustomFormField renders correctly", () => {
  const { container } = render(
    <CustomFormField
      control={useForm().control}
      name="name"
      label="Name"
      fieldType={FormFieldType.INPUT}
    />
  );
  expect(container).toMatchSnapshot();
});
test("CustomFormField renders input field correctly", () => {
  render(
    <CustomFormField
      control={useForm().control}
      name="name"
      label="Name"
      fieldType={FormFieldType.INPUT}
    />
  );
  expect(screen.getByPlaceholderText("Name")).toBeInTheDocument();
});

test("CustomFormField renders textarea field correctly", () => {
  render(
    <CustomFormField
      control={useForm().control}
      name="description"
      label="Description"
      fieldType={FormFieldType.TEXTAREA}
    />
  );
  expect(screen.getByPlaceholderText("Description")).toBeInTheDocument();
});

test("CustomFormField updates input value correctly", () => {
  const { getByPlaceholderText } = render(
    <CustomFormField
      control={useForm().control}
      name="name"
      label="Name"
      fieldType={FormFieldType.INPUT}
    />
  );
  const input = getByPlaceholderText("Name");
  fireEvent.change(input, { target: { value: "John Doe" } });
  expect(input).toHaveValue("John Doe");
});

test("CustomFormField updates checkbox value correctly", () => {
  const { getByLabelText } = render(
    <CustomFormField
      control={useForm().control}
      name="agree"
      label="Agree to terms"
      fieldType={FormFieldType.CHECKBOX}
    />
  );
  const checkbox = getByLabelText("Agree to terms");
  fireEvent.click(checkbox);
  expect(checkbox).toBeChecked();
});
