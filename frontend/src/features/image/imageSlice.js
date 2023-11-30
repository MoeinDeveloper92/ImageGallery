import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import imageService from "./imageService"

const initialState = {
    images: [],
    image: {},
    isLoading: false,
    isError: false,
    isSuccess: false,
    message: ""
}


//uploadImage
export const uploadImage = createAsyncThunk("image/upload", async (imageData, thunkAPI) => {
    try {

        const token = thunkAPI.getState().auth.user.token
        return await imageService.uploadImage(imageData, token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message)
            || error.message
            || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

//get user's images
export const getImages = createAsyncThunk("image/getAll", async (_, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await imageService.getImages(token)

    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message)
            || error.message
            || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

//get single Image
export const getImage = createAsyncThunk("image/get", async (imageId, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await imageService.getImage(imageId, token)

    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message)
            || error.message
            || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

//Export to excel file
export const exportToExcel = createAsyncThunk("image/excel", async (_, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token
    return await imageService.exportToExcel(token)
})


//Delete image card
export const deleteImage = createAsyncThunk("image/delete", async (imageId, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await imageService.deleteImage(imageId, token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message)
            || error.message
            || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

//create Image slice
export const imageSlice = createSlice({
    name: "image",
    initialState,
    reducers: {
        reset: (state) => initialState
    },
    extraReducers: (builder) => {
        builder
            .addCase(uploadImage.pending, (state) => {
                state.isLoading = true
            })
            .addCase(uploadImage.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
            })
            .addCase(uploadImage.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(getImages.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getImages.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.images = action.payload
            })
            .addCase(getImages.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(getImage.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getImage.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.image = action.payload
            })
            .addCase(getImage.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(deleteImage.pending, (state) => {
                state.isLoading = true
            })
            .addCase(deleteImage.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.images = state.images.filter((image) => image._id !== action.payload.id)
            })
            .addCase(deleteImage.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
    }
})

export const { reset } = imageSlice.actions
export default imageSlice.reducer