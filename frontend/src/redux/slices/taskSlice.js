import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../config/axios";

export const getTasksApi = createAsyncThunk("getTasksApi", async(_, { rejectWithValue })=>{
    try {
        const response = await axiosInstance.get(`api/get-tasks`);
        return response.data.data;
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
})

export const addTasksApi = createAsyncThunk("addTasksApi", async(data, {rejectWithValue})=>{
    try {
      const   addTaskeResp = await axiosInstance.post(`api/add-task`,data)
      return  addTaskeResp.data
    } catch (error) {
      return rejectWithValue(error.response.data);
    } 
})

export const taskUpdateColumnApi = createAsyncThunk("taskUpdateColumnApi", async(data, {rejectWithValue})=>{
    try {
      const   addTaskeResp = await axiosInstance.patch(`api/task-column-update`,data)
      return  addTaskeResp.data
    } catch (error) {
      return rejectWithValue(error.response.data);
    } 
})

const initialState = {
    getTasksApiResp: "",
    getTasksApiLoading: false,

    addTaskResp:"",
    addTasksApiLoading: false,
    
    taskUpdateColumnResp:"",
    taskUpdateColumnApiLoading: false,

    apiStatus: false,
    showAddTaskPopup: false,
    showTaskDetailsPopup: false,
    getTaskDetails: "",
    taskColArrays:{
        col1: [],
        col2: [],
        col3: [],
    } 
}

export const taskSlice = createSlice({
    name:"taskSlice",
    initialState,
    extraReducers:(builder)=>{

        builder.addCase(getTasksApi.pending, (state, action)=>{
            state.getTasksApiLoading = true 
        });
        builder.addCase(getTasksApi.fulfilled, (state, action)=>{
            state.getTasksApiResp = action.payload  
            state.taskColArrays = { 
                col1: [],
                col2: [],
                col3: [], }
            action.payload.map((item)=>{
                if(item.taskColumn == "col1"){
                    state.taskColArrays.col1.push(item)
                } else if(item.taskColumn == "col2"){
                    state.taskColArrays.col2.push(item)
                } else if(item.taskColumn == "col3"){
                    state.taskColArrays.col3.push(item)
                }
            })
            state.getTasksApiLoading = false
        });
        builder.addCase(getTasksApi.rejected, (state, action)=>{
            state.getTasksApiResp = action.payload
            state.getTasksApiLoading = false
        });

        builder.addCase(addTasksApi.pending, (state, action)=>{
           state.addTasksApiLoading = true
        });
        builder.addCase(addTasksApi.fulfilled, (state, action)=>{
            state.addTaskResp = action.payload 
            state.addTasksApiLoading = false    
        });
        builder.addCase(addTasksApi.rejected, (state, action)=>{
            state.addTaskResp = action.payload 
            state.addTasksApiLoading = false    
        });

        builder.addCase(taskUpdateColumnApi.pending, (state, action)=>{
           state.taskUpdateColumnApiLoading = true
        });
        builder.addCase(taskUpdateColumnApi.fulfilled, (state, action)=>{
            state.taskUpdateColumnResp = action.payload 
            state.taskColArrays = { 
                col1: [],
                col2: [],
                col3: [], }
            state.taskUpdateColumnApiLoading = false    
        });
        builder.addCase(taskUpdateColumnApi.rejected, (state, action)=>{
            state.taskUpdateColumnResp = action.payload 
            state.taskUpdateColumnApiLoading = false    
        });
    },
    reducers: {
        setApiStatus :(state, action)=>
        {
            state.apiStatus = action.payload
        },
        setShowAddTaskPopup :(state, action)=>
        {
            state.showAddTaskPopup = action.payload
        },
        setShowTaskDetailsPopup :(state, action)=>
        {
            state.showTaskDetailsPopup = action.payload
        },
        setGetTaskDetails :(state, action)=>
        {
            state.getTaskDetails = action.payload
        },
        setAddTaskResp :(state, action)=>
        {
            state.addTaskResp = action.payload
        },
        setTaskColArrays :(state, action)=>
        {
            state.taskColArrays = action.payload
        },
    }})

export const {setApiStatus, setShowAddTaskPopup, setAddTaskResp, setShowTaskDetailsPopup, setGetTaskDetails, setTaskColArrays} = taskSlice.actions;

export default taskSlice.reducer
