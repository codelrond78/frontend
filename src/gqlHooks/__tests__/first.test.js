import React from "react";
import { renderHook } from '@testing-library/react-hooks';
import { useQuery, QueryClient, QueryClientProvider} from 'react-query';
import "@testing-library/jest-dom/extend-expect";
import { useGetSchool } from '../authQuery'


jest.mock("@auth0/auth0-react", () => ({
  useAuth0: jest.fn(() => ({
    isLoading: false,
    isAuthenticated: true,
    getAccessTokenSilently: jest.fn(() => Promise.resolve("access-token")),
  })),
  withAuthenticationRequired: jest.fn(),
}));

jest.mock("../../config", () => ({
  getConfig: jest.fn(() => ({
    domain: "test-domain.com",
    clientId: "123",
    apiOrigin: "http://localhost:3001",
    audience: "test-audience",
  })),
}));

function useCustomHook() {
    return useQuery('customHook', () => 'Hello');
}

describe("Testing first query hook", () => {
  beforeEach(() => {
    fetch.resetMocks();
  });

  it("test 01", async ()=>{
    const queryClient = new QueryClient();
    const wrapper = ({ children }) => (   
      <QueryClientProvider client={queryClient}>   
        {children}   
      </QueryClientProvider>   
    );    
  
 const { result, waitFor } = renderHook(() => useGetSchool(), { wrapper });
 await waitFor(() => result.current.isSuccess);
 expect(result.current.data.headers.authorization).toEqual("Bearer access-token");
 expect(result.current.data.name).toEqual("nuestra señora de la salud");
 })
});
