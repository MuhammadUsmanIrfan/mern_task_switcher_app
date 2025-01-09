import Task from "../models/TaskModel.js"

export const addTask = async(req, res)=>{
    try {
        const {taskTitle, taskDetails} = req.body
        
        if(!taskTitle || !taskDetails){
            return res.status(404).json({success: false, message:"details are missing"})
        } 
        const task = await Task.create({
            taskTitle,
            taskDetails
        })

        if(task)
        {
            return res.status(201).json({success: true, message:"task created successfully"})
        } else{
            return res.status(400).json({success: false, message:"something went wrong during task creation"})
        }

    } catch (error) {
        res.status(400).json({success: false, message:error.message})
    }
}

export const changeTaskColumn = async(req, res)=>{
    try {
        const {taskId, taskColumn} = req.body
        
        if(!taskId || !taskColumn){
            return res.status(404).json({success: false, message:"details are missing"})
        } 

        if(taskColumn == "col1" || taskColumn == "col2" || taskColumn == "col3")
        {
            const task = await Task.findByIdAndUpdate(taskId,{
                taskColumn: taskColumn
            })
            if(task)
            {
                return res.status(200).json({success: true, message:"task column update successfully"})
            } else{
                return res.status(400).json({success: false, message:"something went wrong during task column update"})
            }

        }else{  
        return res.status(400).json({success: false, message:"invalid task column value"})}
        
    } catch (error) {
        res.status(400).json({success: false, message:error.message})
    }
}

export const getTask = async(req, res)=>{
    try {
        const tasks = await Task.find()
        if(tasks)
        {
            return res.status(200).json({success: true, message:"task get successfully", data: tasks})
        } else{
            return res.status(400).json({success: false, message:"something went wrong during getting task"})
        }
    } catch (error) {
        res.status(400).json({success: false, message:error.message})
    }
}