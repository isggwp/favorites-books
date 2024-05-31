// usersSlice.ts
import { FormUsers, UserResponseFromAPI } from '@/types/users';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UsersState {
  users: UserResponseFromAPI[];
  streamUsers: UserResponseFromAPI | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: UsersState = {
  users: [],
  streamUsers: null, 
  status: 'idle',
  error: null,
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUsers: (state, action: PayloadAction<UserResponseFromAPI[]>) => {
      state.users = action.payload;
    },
    setStreamUsers: (state, action: PayloadAction<UserResponseFromAPI>) => {
      state.streamUsers = action.payload;
    },
    setStatus: (state, action: PayloadAction<UsersState['status']>) => {
      state.status = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    addUsers: (state, action: PayloadAction<UserResponseFromAPI>) => {
      state.users = [...state.users, action.payload];
    },
    editUsers: (state, action) => {
      const index = state?.users?.findIndex(item => item.id === action.payload.id);
      if (index !== -1) {
        state.users = state.users.filter(item => item.id !== action.payload.id);
        state.users[index] = action.payload;
      }
    },
    deleteUsers: (state, action) => {
      state.users = state.users.filter(item => item.id !== action.payload.id);
    },
  },
});

export const { setUsers, setStatus, setError, addUsers, editUsers, deleteUsers, setStreamUsers } = usersSlice.actions;

export default usersSlice.reducer; // Ekspor usersReducer sebagai default
