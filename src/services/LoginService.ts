
export function login(username:string,password:string):boolean{
    let userDetails={
        username,
        password
    };
    let allUsersData=localStorage.getItem("data")==null?{}:JSON.parse(localStorage.getItem("data") as string);
    let userData={
        ...userDetails,
        tasks:[]
    };
    allUsersData[username]=userData;
    if(!isUserNameUsed(username))
    {
        localStorage.removeItem("user");
        localStorage.setItem("data",JSON.stringify(allUsersData));
        localStorage.setItem("user",JSON.stringify(userDetails)); 
        return true;
    }
    if(isUserNameUsed(username) && isValidPassword(username,password))
    {
        localStorage.removeItem("user");
        localStorage.setItem("user",JSON.stringify(userDetails)); 
        return true;
    }
    return false;
}

export function logout(){
    localStorage.removeItem("user");
    // localStorage.clear();
}

export function isUserLoggedIn(){
    let userJson=localStorage.getItem('user');
    let user=JSON.parse(userJson as string);
    return user;
}

export function isUserNameUsed(username:string):boolean{
    let usersDataJson=localStorage.getItem('data');
    if(usersDataJson==null) return false;
    let usersData= JSON.parse(usersDataJson);
    return (username in usersData);
}

export function isValidPassword(username:string,password:string){
    let usersDataJson=localStorage.getItem('data');
    if(usersDataJson==null) return false;
    let usersData= JSON.parse(usersDataJson);
    return usersData[username]['password']===password;
}
