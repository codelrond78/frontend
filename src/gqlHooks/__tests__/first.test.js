import React from "react";
import { renderHook } from '@testing-library/react-hooks';
import { useQuery, QueryClient, QueryClientProvider} from 'react-query';
import "@testing-library/jest-dom/extend-expect";
import { useGetSchool } from '../authQuery'
import {render, screen, waitFor} from '@testing-library/react'

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

const C = () => {
  const { data, isLoading } = useGetSchool();
  if(isLoading) return <div></div>
  return <div>{data.school.name}</div>
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
  expect(result.current.data.school.headers.authorization).toEqual("Bearer access-token");
  expect(result.current.data.school.name).toEqual("nuestra señora de la salud");
    })

  it("test component with useshool", async ()=>{
    const client = new QueryClient()
    render(
    <QueryClientProvider client={client}>
      <C />
    </QueryClientProvider>
    )
    await waitFor(() => expect(screen.getByText('nuestra señora de la salud')).toBeInTheDocument())
  })

  }) 
