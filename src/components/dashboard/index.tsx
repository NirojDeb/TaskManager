import React from 'react';
import TextField from "@mui/material/TextField";
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import { addTask, getAllTasks, isTaskNameUsed, onDeleteTask, onEditTask } from '../../services/TaskService';
import { ITaskDetails } from '../../models/ITaskDetails';
import { isUserLoggedIn } from '../../services/LoginService';
import './style.css';
import Paper from '@mui/material/Paper';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import { UserContext } from '../../App';
import InputLabel from '@mui/material/InputLabel';

const Dashboard: React.FC<{}> = (props)=>{

  const [taskName,setTaskName] =React.useState('');
  const [taskDescription,setTaskDescription] =React.useState('');
  const [isDone,setIsDone] =React.useState(false);
  const [tasks,setTasks] = React.useState<ITaskDetails[]>([]);
  const [user,setUser] = React.useState<any>(null);
  const [isEditMode,setIsEditMode] =React.useState(false);
  const [editTask,setEditTask] = React.useState<ITaskDetails | null>(null);
  const [nameError,setNameError] =React.useState('');
  const [descriptionError,setDescriptionError] = React.useState('');
  

  const context = React.useContext(UserContext);

  

  React.useEffect(()=>{
    if(context && context.user)
    {
      let tasks=getAllTasks(context.user.username);
      setTasks(tasks);
      setUser(context.user)
    }
  },[context]);

  const addNewTask = () =>{
    if(isTaskNameUsed(user.username,taskName))
    {
      setNameError('Task Name already Used');
      return;
    }
    if(taskName.length<3)
    {
      setNameError('Task Name must be atleast 3 characters')
      return;
    }
    if(taskDescription.length<3)
    {
      setDescriptionError('Task Description must be atleast 3 characters')
      return;
    }
    let newTask:ITaskDetails={
      taskName:taskName,
      taskDescription:taskDescription,
      taskStatus:isDone,
      id:Date.now()
    }
    addTask(newTask,user.username);
    let allTasks:ITaskDetails[]=[...tasks,newTask];
    setTasks(allTasks);
    setTaskName('');
    setTaskDescription('');
    setIsDone(false);
    setNameError('')
    setDescriptionError('')
  }

  const onEditClicked = (task:ITaskDetails) =>{
    setTaskName(task.taskName);
    setTaskDescription(task.taskDescription);
    setIsEditMode(true);
    setEditTask(task);
  }


  const onEditBtnClicked = () =>{
    let editedTask:ITaskDetails={id:editTask?.id as number,taskName:taskName,taskDescription:taskDescription,taskStatus:isDone}
    onEditTask(user.username,editedTask as ITaskDetails);
    let alltasks:ITaskDetails[]=[...tasks];
    let alleditedTasks:ITaskDetails[]=[];
    alltasks.forEach((t:ITaskDetails)=>{
      if(t.id==editedTask?.id)
      {
        alleditedTasks.push(editedTask)
      }
      else{
        alleditedTasks.push(t);
      }
    });
    setTasks(alleditedTasks);
    setTaskName('');
    setTaskDescription('');
    setIsDone(false);
    setEditTask(null);

  }
  

  const onDeleteClicked = (task:ITaskDetails) =>{
    onDeleteTask(user.username,task);
    let alltasks:ITaskDetails[]=[...tasks];
    let alleditedTasks:ITaskDetails[]=alltasks.filter(t=>t.id!=task?.id);
    setTasks(alleditedTasks);
    setTaskName('');
    setTaskDescription('');
    setIsDone(false);
    setEditTask(null);

  }

  

  const renderCard = (task:ITaskDetails) =>{
    return <Paper
      sx={{
        height: 140,
        width: 200,
      }}
     >
      <div className='taskContainer'>
        <div className='iconsContainer'>
          <DeleteOutlineOutlinedIcon color='secondary' fontSize='small' onClick={()=>{onDeleteClicked(task)}} />
          <ModeEditOutlineOutlinedIcon color='secondary' fontSize='small' onClick={()=>{onEditClicked(task)}} />
        </div>
        <div className={`taskname ${task.taskStatus?'strike':''}`}>{task.taskName}</div>
        <div className='decription'>{task.taskDescription}</div>
      </div>
    </Paper>
  }

  return (
    <div>
      <div className='taskForm'>
        <div>
          <div className='textField'>
              <TextField id="name" label="Task Name" error={nameError!==''} helperText={nameError} value={taskName} variant="standard" onChange={(event)=>{setNameError(''); setTaskName(event.target.value)}} />
          </div>
          <div className='textField'>
              <TextField id="description" label="Description" error={descriptionError!=''} helperText={descriptionError} value={taskDescription} variant="standard" onChange={(event)=>{setTaskDescription(event.target.value)}} />
          </div>
          <div className='textField'>
            <InputLabel>Is Task Completed?</InputLabel>
              <Checkbox checked={isDone} onChange={(event)=>{setIsDone(!isDone);}} />
          </div>
        </div>
      {!isEditMode && <Button id="addTaskBtn" onClick={addNewTask} >Add Task</Button>}
      {isEditMode && <div>
        <Button id="cancelEdit" onClick={()=>{
          setIsEditMode(false);
          setTaskName('');
          setTaskDescription('');
          setIsDone(false);
          }} >Cancel Edit</Button>
        <Button id="" onClick={onEditBtnClicked} >Edit Task</Button>
      </div>}
      </div>
      <div className='cardContainer'>
        {tasks.map((task:ITaskDetails)=>{return <div>{renderCard(task)}</div>})}
      </div>
    </div>

  );
}

export default Dashboard;
