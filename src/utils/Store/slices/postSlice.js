import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BASE_URL } from "../../constants";


export const likePost = createAsyncThunk(
    "post/likePost",
    async (postId, {rejectWithValue}) =>{
        try {
            const response = await fetch(BASE_URL + "/post/like/" + postId, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include"
            });
            if (!response.ok) {
                throw new Error("Failed to like post");
            }
            const data = await response.json();
            return data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
)



export const fetchPosts = createAsyncThunk(
    "post/fetchPosts",
    async (__, {rejectWithValue}) =>{
        try {
            const response = await fetch(BASE_URL + "/post/all",{
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include"
            });
            if (!response.ok) {
                throw new Error("Failed to fetch posts");
            }
            const data = await response.json();
            return data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
)

export const createPost = createAsyncThunk(
    "post/createPost",
    async (postData, {rejectWithValue}) =>{
        try {
            const response = await fetch(BASE_URL + "/post/create", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(postData),
                credentials: "include"
            });
            if (!response.ok) {
                throw new Error("Failed to create post");
            }
            const data = await response.json();
            return data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
)
export const updatePost = createAsyncThunk(
    "post/updatePost",
    async (postData, {rejectWithValue}) =>{
        try {
            const response = await fetch(BASE_URL + "/post/update", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(postData),
            });
            if (!response.ok) {
                throw new Error("Failed to update post");
            }
            const data = await response.json();
            return data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
)
export const deletePost = createAsyncThunk(
    "post/deletePost",
    async (postId, {rejectWithValue}) =>{
        try {
            const response = await fetch(BASE_URL + "/post/delete/" + postId, {
                method: "DELETE",
            });
            if (!response.ok) {
                throw new Error("Failed to delete post");
            }
            const data = await response.json();
            return data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
)

// Initial state
const initialState = {
    posts: [],
    loading: false,
    error: null,

}
const postSlice = createSlice({
    name : "post",
    initialState,
    reducers:{
        clearErrors: (state) => {
            state.error = null;
          },
        setPosts: (state, action) => {
            state.posts = action.payload;
        },
        setLikes: (state, action) =>{
            const postIndex = state.posts.findIndex(post => post.id === action.payload.postId);
            if (postIndex !== -1) {
                state.posts[postIndex].likes = action.payload.likes;
            }
        }
    },
    extraReducers: (builder) =>{
        builder.addCase("post/fetchPosts/pending", (state) => {
            state.loading = true;
            state.error = null;
        }
        )
        .addCase("post/fetchPosts/fulfilled", (state, action) => {
            if (Array.isArray(action.payload.posts)) {
                state.posts = action.payload.posts;
              
              } else {
                console.error("fetchPosts.fulfilled - Received non-array payload:", action.payload);
                state.properties = [];
                state.error = { message: 'Received invalid property data from server.' };
              }
        }).addCase("post/fetchPosts/rejected", (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        .addCase("post/createPost/pending", (state) => {
            state.loading = true;
            state.error = null;
        }
        )
        .addCase("post/createPost/fulfilled", (state, action) => {
            state.loading = false;
            state.posts.push(action.payload);
        }).addCase("post/createPost/rejected", (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        .addCase("post/updatePost/pending", (state) => {
            state.loading = true;
            state.error = null;
        }
        )
        .addCase("post/updatePost/fulfilled", (state, action) => {
            state.loading = false;
            const index = state.posts.findIndex(post => post.id === action.payload.id);
            if (index !== -1) {
                state.posts[index] = action.payload;
            }
        }).addCase("post/updatePost/rejected", (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        .addCase("post/deletePost/pending", (state) => {
            state.loading = true;
            state.error = null;
        }
        )
        .addCase("post/deletePost/fulfilled", (state, action) => {
            state.loading = false;
            state.posts = state.posts.filter(post => post.id !== action.payload.id);
        }).addCase("post/deletePost/rejected", (state, action) => {
            state.loading = false;
            state.error = action.payload;
        }).addCase("post/likePost/pending", (state) =>{
            state.loading = true;
            state.error = null;
        
        }).addCase("post/likePost/fulfilled", (state, action) =>{
            state.loading = false;
            const postIndex = state.posts.findIndex(post => post.id === action.payload.postId);
            if (postIndex !== -1) {
                state.posts[postIndex].likes = action.payload.likes;
            }
        }
        ).addCase("post/likePost/rejected", (state, action) =>{
            state.loading = false;
            state.error = action.payload;
        })
//        
    }
})

export const { clearErrors ,setPosts} = postSlice.actions;

export default postSlice.reducer;