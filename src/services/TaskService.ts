import { ITaskDetails } from "../models/ITaskDetails";

export function addTask(task:ITaskDetails,username:string){
    let usersDataJson=localStorage.getItem('data');
    if(usersDataJson==null) return null;
    let usersData= JSON.parse(usersDataJson);
    let alltasks=[...usersData[username]['tasks'],task];
    usersData[username]['tasks']=alltasks;
    localStorage.setItem('data',JSON.stringify(usersData));
}

export function getAllTasks(username:string)
{
    let usersDataJson=localStorage.getItem('data');
    if(usersDataJson==null) return null;
    let usersData= JSON.parse(usersDataJson);
    let tasks= usersData[username]['tasks']
    return tasks;

}

export function onEditTask(username:string,editedTask:ITaskDetails)
{
    let usersDataJson=localStorage.getItem('data');
    if(usersDataJson==null) return null;
    let usersData= JSON.parse(usersDataJson);
    let tasks:ITaskDetails[]= usersData[username]['tasks'];
    let alltasks:ITaskDetails[]=[];
    tasks.forEach((task:ITaskDetails)=>{
        if(task.id==editedTask.id){
            alltasks.push(editedTask);
        }
        else{
            alltasks.push(task);
        }
    });
    usersData[username]['tasks']=alltasks;
    localStorage.setItem('data',JSON.stringify(usersData));
}

export function onDeleteTask(username:string,editedTask:ITaskDetails)
{
    let usersDataJson=localStorage.getItem('data');
    if(usersDataJson==null) return null;
    let usersData= JSON.parse(usersDataJson);
    let tasks:ITaskDetails[]= usersData[username]['tasks'];
    let alltasks:ITaskDetails[]=tasks.filter((task)=>{return task.id!=editedTask.id})
    usersData[username]['tasks']=alltasks;
    localStorage.setItem('data',JSON.stringify(usersData));
}

export function isTaskNameUsed(username:string,taskname:string):boolean{
    let usersDataJson=localStorage.getItem('data');
    if(usersDataJson==null) return false;
    let usersData= JSON.parse(usersDataJson);
    let tasks:ITaskDetails[]= usersData[username]['tasks'];
    for(let i=0;i<tasks.length;i++)
    {
        if(tasks[i].taskName===taskname)
        {
            return true;
        }
    }
    return false;
}
