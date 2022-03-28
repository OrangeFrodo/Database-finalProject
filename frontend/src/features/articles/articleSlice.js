import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import goalService from './articleService';

const initialState = {
    goals: [],
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: "",
}

// Create new goal
export const createArticle = createAsyncThunk('goals/create',
    async (goalData, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token
            return await goalService.createArticle(goalData, token)
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }
);

// Get user goals
export const getArticles = createAsyncThunk('goals/getAll', 
    async (_, thunkAPI) => { 
        try {
            const token = thunkAPI.getState().auth.user.token
            return await goalService.getArticles(token)
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }
)

// Delete user goal
export const deleteGoal = createAsyncThunk('goals/delete', 
    async (id, thunkAPI) => { 
        try {
            const token = thunkAPI.getState().auth.user.token
            return await goalService.deleteGoal(id, token)
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }
)

export const goalSlice = createSlice({
    name: 'goal',
    initialState,
    reducers: {
        reset: (state) => initialState
    },
    extraReducers: (builder) => {
        builder
            .addCase(createArticle.pending, (state) => {
                state.isLoading = true
            })
            .addCase(createArticle.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.goals.push(action.payload)
            })
            .addCase(createArticle.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(getArticles.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getArticles.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.goals = action.payload
            })
            .addCase(getArticles.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(deleteGoal.pending, (state) => {
                state.isLoading = true
            })
            .addCase(deleteGoal.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.goals = state.goals.filter((goal) => goal._id !== action.payload.id)
            })
            .addCase(deleteGoal.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
    },
});


export const { reset } = goalSlice.actions;
export default goalSlice.reducer;