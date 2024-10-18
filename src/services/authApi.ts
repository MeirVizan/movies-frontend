import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '../store';
import { get } from 'http';

interface SignUpResponse {
  email: string;
  token: string;
}

interface SignInResponse {
  email: string;
  token: string;
}

interface SignUpRequest {
  name: string;
  email: string;
  password: string;
}

interface SignInRequest {
  email: string;
  password: string;
}

interface UserResponse {
  id: string;
  email: string;
  name: string;
}

const baseQuery = fetchBaseQuery({
  baseUrl: '/api',
  prepareHeaders: (headers, { getState }) => {
    // const token = (getState() as RootState).user.token;
    const token = localStorage.getItem('token');
    // console.log('token :>> ', localStorage.getItem('token'));
    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery,
  endpoints: (builder) => ({
    signUp: builder.mutation<SignUpResponse, SignUpRequest>({
      query: (credentials) => ({
        url: 'http://localhost:5000/api/users/signup',
        method: 'POST',
        body: credentials,
      }),
    }),
    signIn: builder.mutation<SignInResponse, SignInRequest>({
      query: (credentials) => ({
        url: 'http://localhost:5000/api/users/signin',
        method: 'POST',
        body: credentials,
      }),
    }),
    getUser: builder.query<UserResponse, void>({ // Add this endpoint
      query: () => 'http://localhost:5000/api/users/user',
    }),
  }),
});

export const { useSignUpMutation, useSignInMutation, useGetUserQuery } = authApi;
