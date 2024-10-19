import { afterEach, describe, expect, it, vi } from "vitest";
import AddIngredient from "./AddIngredient";
import { cleanup, fireEvent, screen, render } from "@testing-library/react";

describe("AddIngredient Component", () => {
  afterEach(cleanup);
  it("should add an ingredient when all inputs are properly filled", () => {
    const setIngredients = vi.fn();
    render(<AddIngredient setIngredients={setIngredients} />);
    fireEvent.change(screen.getByLabelText(/Ingrediente/i), {
      target: { value: "Tomato" },
    });
    fireEvent.change(screen.getByLabelText(/Cantidad/i), {
      target: { value: "4" },
    });
    fireEvent.change(screen.getByLabelText(/Unidad/i), {
      target: { value: "Kilos" },
    });
    fireEvent.click(screen.getByText(/Agregar Ingrediente/i));
    expect(setIngredients).toHaveBeenCalledTimes(1);
  });

  it("should not add an ingredient when any input is wrong", () => {
    const setIngredients = vi.fn();
    render(<AddIngredient setIngredients={setIngredients} />);
    //First wrong inputs
    fireEvent.change(screen.getByLabelText(/Ingrediente/i), {
      target: { value: "" },
    });
    fireEvent.change(screen.getByLabelText(/Cantidad/i), {
      target: { value: "4" },
    });
    fireEvent.change(screen.getByLabelText(/Unidad/i), {
      target: { value: "Kilos" },
    });
    fireEvent.click(screen.getByText(/Agregar Ingrediente/i));

    //Second wrong inputs
    fireEvent.change(screen.getByLabelText(/Ingrediente/i), {
      target: { value: "Tomato" },
    });
    fireEvent.change(screen.getByLabelText(/Cantidad/i), {
      target: { value: "1/" },
    });
    fireEvent.change(screen.getByLabelText(/Unidad/i), {
      target: { value: "Kilos" },
    });
    fireEvent.click(screen.getByText(/Agregar Ingrediente/i));

    //Third wrong inputs
    fireEvent.change(screen.getByLabelText(/Ingrediente/i), {
      target: { value: "Tomato" },
    });
    fireEvent.change(screen.getByLabelText(/Cantidad/i), {
      target: { value: "2.5" },
    });
    fireEvent.change(screen.getByLabelText(/Unidad/i), {
      target: { value: "" },
    });
    fireEvent.click(screen.getByText(/Agregar Ingrediente/i));

    expect(setIngredients).not.toHaveBeenCalled();
  });
});
