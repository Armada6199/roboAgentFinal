// UserMenu.test.js
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { LoginContext } from "src/hooks/Context/LoginInfoContext";
import UserMenu from "../MainHeader/UserMenu";
import Providers from "src/components/Providers";

jest.mock("src/assets/Images/GreenQiwa.jpg", () => "userAvatar.jpg");

const mockProps = {
  onOpen: jest.fn(),
  onClose: jest.fn(),
  anchorEl: null,
};

const mockLoginData = {
  firstName: "John",
  email: "john.doe@example.com",
  isLoggedIn: true,
};

const mockLogout = jest.fn();

const renderWithProviders = (ui, { providerProps, ...renderOptions }) => {
  return render(
    <Providers>
      <LoginContext.Provider value={providerProps}>{ui}</LoginContext.Provider>
    </Providers>,
    renderOptions
  );
};

describe("UserMenu Component", () => {
  test("renders avatar button", () => {
    const providerProps = {
      loginData: mockLoginData,
      logout: mockLogout,
    };

    renderWithProviders(
      <Provider>
        <UserMenu {...mockProps} />
      </Provider>,
      { providerProps }
    );

    const avatarButton = screen.getByRole("button");
    expect(avatarButton).toBeInTheDocument();
  });

  test("opens and closes the menu on avatar button click", () => {
    const providerProps = {
      loginData: mockLoginData,
      logout: mockLogout,
    };

    renderWithProviders(
      <Providers>
        <UserMenu {...mockProps} />
      </Providers>,

      { providerProps }
    );

    const avatarButton = screen.getByRole("button");
    fireEvent.click(avatarButton);

    const menu = screen.getByRole("menu");
    expect(menu).toBeInTheDocument();

    // Close the menu
    fireEvent.click(document.body);
    expect(mockProps.onClose).toHaveBeenCalled();
  });

  test("displays user information", () => {
    const providerProps = {
      loginData: mockLoginData,
      logout: mockLogout,
    };

    renderWithProviders(
      <Providers>
        <UserMenu {...mockProps} />
      </Providers>,
      { providerProps }
    );

    const avatarButton = screen.getByRole("button");
    fireEvent.click(avatarButton);

    expect(screen.getByText("John")).toBeInTheDocument();
    expect(screen.getByText("john.doe@example.com")).toBeInTheDocument();
  });

  test("renders links correctly", () => {
    const providerProps = {
      loginData: mockLoginData,
      logout: mockLogout,
    };

    renderWithProviders(
      <Providers>
        <UserMenu {...mockProps} />
      </Providers>,

      { providerProps }
    );

    const avatarButton = screen.getByRole("button");
    fireEvent.click(avatarButton);

    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("Profile")).toBeInTheDocument();
    expect(screen.getByText("Settings")).toBeInTheDocument();
  });

  test("calls logout function on logout button click", () => {
    const providerProps = {
      loginData: mockLoginData,
      logout: mockLogout,
    };

    renderWithProviders(
      <Providers>
        <UserMenu {...mockProps} />
      </Providers>,
      { providerProps }
    );

    const avatarButton = screen.getByRole("button");
    fireEvent.click(avatarButton);

    const logoutButton = screen.getByRole("button", { name: /logout/i });
    fireEvent.click(logoutButton);

    expect(mockLogout).toHaveBeenCalled();
  });
});
