import mongoose from "mongoose"

const taskSchema = new mongoose.Schema({
    taskTitle:{
        type: String,
        require: true
    },
    taskDetails:{
        type: String,
        require: true
    },
    taskColumn:{
        type: String,
        default: "col1"
    },

})
const Task = mongoose.model("Tasks", taskSchema)
export default Task