import { CKEditor } from '@ckeditor/ckeditor5-react';
import { ClassicEditor, Bold, Essentials, Heading, Indent, IndentBlock, Italic, Link, List, ListProperties , MediaEmbed, Paragraph, Table, Undo, Alignment, Image, ImageToolbar, ImageCaption, ImageStyle, ImageResize, ImageUpload, Base64UploadAdapter 
} from 'ckeditor5';
import 'ckeditor5/ckeditor5.css';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTasksApi } from '../redux/slices/taskSlice';
const licenseKey = import.meta.env.VITE_CK_EDITOR_KEY;

const CkEditor = ({taskTitle, setTaskTitleStatus, setTaskTitle, handleClosePopup}) => {
    const dispatch = useDispatch()

    const [textEditor, setTextEditor] = useState("");
    const [taskDetailsStatus, setTaskDetailsStatus] = useState(false)

    const handleCreateTask = ()=>{
        const addTaskValidation ={
            title: false,
            details: false,
        }
       if(taskTitle.trim()==""){
        setTaskTitleStatus(true)
        addTaskValidation.title = true
       }else{addTaskValidation.title = false;  setTaskTitleStatus(false)}

       if(textEditor==""){
        setTaskDetailsStatus(true)
        addTaskValidation.details = true
       }else {addTaskValidation.details = false; setTaskDetailsStatus(false)}

       if(addTaskValidation.title == false && addTaskValidation.details == false){
            dispatch(addTasksApi({taskTitle:taskTitle, taskDetails:textEditor}))
            setTextEditor("")
            setTaskTitle("")
            handleClosePopup()
       }
    }

    return (
        <div>
            <div className=" mx-auto mt-1">
                <CKEditor
                    editor={ClassicEditor}
                    config={{
                        licenseKey,
                        plugins: [
                            Essentials, Bold, Heading, Indent, Alignment, IndentBlock, Italic, Link, ListProperties, List, MediaEmbed, Paragraph, Table, Undo,
                            Image, ImageToolbar, ImageCaption, ImageStyle, ImageResize, ImageUpload, Base64UploadAdapter
                        ],
                        toolbar: [
                            'undo', 'redo', '|',
                            'heading', '|', 'bold', 'italic', '|',
                            'link', 'insertImage', 'insertTable', '|',
                            'Alignment', 'bulletedList', 'numberedList', 'indent', 'outdent'
                        ],
                        image: {
                            styles: [
                                'alignLeft', 
                                'alignCenter',
                                'alignRight', 
                                'full', 
                                'side' 
                            ],
                            toolbar: [
                                'imageStyle:alignLeft',
                                'imageStyle:alignCenter',
                                'imageStyle:alignRight',
                                '|',
                                'imageTextAlternative'
                            ]
                        },
                    }}
                    data={textEditor}
                    onChange={(event, editor) => {
                        const data = editor.getData();
                        setTextEditor(data);
                    }}
                />
            </div>
            {taskDetailsStatus && <p className="text-red-500 font-bold text-center">**Task Discription is required**</p>}
            <div className='flex justify-center mt-2'>
                <button className='bg-green-700 text-white text-center px-2 py-2 rounded-lg' onClick={()=>handleCreateTask()}>Add Task</button>   
            </div>
        </div>
    );
};

export default CkEditor;
