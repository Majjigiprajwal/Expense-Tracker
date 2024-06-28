import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import Login from '../components/Auth/Login';

jest.mock('react-toastify', () => ({
  toast: {
    error: jest.fn(),
    success: jest.fn(),
  },
}));

jest.mock('axios');

const mockStore = configureStore([]);

const renderWithProviders = (component, { store, history } = {}) => {
  return render(
    <Provider store={store}>
      <Router history={history}>
        <BrowserRouter>{component}</BrowserRouter>
      </Router>
    </Provider>
  );
};

describe('Login Component', () => {
  let store;
  let history;

  beforeEach(() => {
    store = mockStore({
      login: {
        user: {
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
          isPremium: false,
        },
      },
    });

    store.dispatch = jest.fn();

    history = createMemoryHistory();
  });

  test('renders the component', () => {
    renderWithProviders(<Login />, { store });
    expect(screen.getByText(/Sign up for an account/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Full Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email address/i)).toBeInTheDocument();
    expect(screen.getAllByLabelText(/Password/i))[0].toBeInTheDocument();
    expect(screen.getByLabelText(/Confirm Password/i)).toBeInTheDocument();
    expect(screen.getByText(/Create Account/i)).toBeInTheDocument();
  });

  test('form validation works correctly', async () => {
    renderWithProviders(<Login />, { store });
    fireEvent.click(screen.getByText(/Create Account/i));
    expect(toast.error).toHaveBeenCalledWith('Fill all the details correctly', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  });

  test('password mismatch shows error message', async () => {
    renderWithProviders(<Login />, { store });
    fireEvent.change(screen.getByLabelText(/Full Name/i), { target: { value: 'Test User' } });
    fireEvent.change(screen.getByLabelText(/Email address/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getAllByLabelText(/Password/i)[0], { target: { value: 'password1' } });
    fireEvent.change(screen.getByLabelText(/Confirm Password/i), { target: { value: 'password2' } });
    fireEvent.click(screen.getByText(/Create Account/i));
    expect(toast.error).toHaveBeenCalledWith('Passwords do not match', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  });

  
  test('successful form submission redirects to login page', async () => {
    axios.post.mockResolvedValue({ status: 201 });
    renderWithProviders(<Login />, { store, history });
    fireEvent.change(screen.getByLabelText(/Full Name/i), { target: { value: 'Test User' } });
    fireEvent.change(screen.getByLabelText(/Email address/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getAllByLabelText(/Password/i)[0], { target: { value: 'password1' } }); // Use getAllByLabelText and select the first one
    fireEvent.change(screen.getAllByLabelText(/Confirm Password/i)[0], { target: { value: 'password1' } }); // Use getAllByLabelText and select the first one
    fireEvent.click(screen.getByText(/Create Account/i));

    // Wait for success toast message to appear and then disappear
    await waitFor(() => {
      expect(toast.success).toHaveBeenCalledWith('Account created successfully', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    });

    // Check if redirection happened to the login page
    expect(history.location.pathname).toBe('/'); // Adjust '/login' to your actual login page route
  });
});
