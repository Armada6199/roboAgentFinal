/* eslint-disable */
import { ThemeProvider } from "@mui/material";
import { fireEvent, render, waitFor } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import { AlertContext } from "hooks/context/AlertContext";
import { lightTheme } from "styles/theme";
import ServicesGetAnswer from "../page/ServicesGetAnswer";
import { Services } from "../schema/ServicesSchema";



const renderWithContexts = (ui, { providerProps, ...renderOptions }) => {
  return render(
    <AlertContext.Provider value={providerProps.alert}>
      <ThemeProvider theme={lightTheme()}>
        <Router>{ui}</Router>
      </ThemeProvider>
    </AlertContext.Provider>,
    renderOptions
  );
};

describe("ServicesGetAnswer component", () => {
  const providerProps = {
    alert: { setAlert: jest.fn() },
    theme: { currentTheme: "light", setCurrentTheme: jest.fn() },
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders without crashing", () => {
    const { container } = renderWithContexts(<ServicesGetAnswer />, {
      providerProps,
    });
    expect(container).toBeInTheDocument();
  });

  test("displays the correct service name", () => {
    const { getByText } = renderWithContexts(<ServicesGetAnswer />, {
      providerProps,
    });
    const service = Services.find(
      (service) => service.enName === "Visas"
    );
    expect(getByText(service.enName)).toBeInTheDocument();
  });

  // test("handles form submission correctly", async () => {
  //   const mockSetAnswer = jest.fn();
  //   const mockSetLoading = jest.fn();
  //   const { getByText, getByLabelText } = renderWithContexts(
  //     <ServicesGetAnswer
  //       setAnswer={mockSetAnswer}
  //       setLoading={mockSetLoading}
  //     />,
  //     { providerProps }
  //   );

  //   fireEvent.change(getByText("Establishment Number *"), {
  //     target: { value: "123456" },
  //   });
  //   fireEvent.change(getByText("ID or Iqameh *"), {
  //     target: { value: "987654" },
  //   });

  //   fireEvent.click(getByText(/Search/i));

  //   await waitFor(() => {
  //     expect(providerProps.alert.setAlert).toHaveBeenCalledWith({
  //       alertType: "info",
  //       alertMsg: "Generating Ticket Answer",
  //       sleep: 999999,
  //     });
  //   });
  // });

 
});
