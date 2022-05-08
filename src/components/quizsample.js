import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {formatUserName} from "../../utlis/utlis";
import {Link,Outlet} from "react-router-dom";

const LoadUser=()=>{
    const [state,setState]= useState([]);
    useEffect(()=>{
        const getUsers = async () => {
            const response = await axios.get('https://opentdb.com/api.php?amount=10&category=18&difficulty=easy&type=multiple')
                console.log("User ",response.data);
                setState(response.data);
            }
        getUsers();
    },[])
    return (
        <div>
            <h1>Load User</h1>
            {users.length > 0 && <nav>
                <ol data-testid={"user-list"}>
                    {users.map((user)=>{
                        return <li key={user.id} data-testid={'user-item'}>
                            <Link to={`/users/${user.id}`}>
                                {user.name +'('+ (formatUserName(user.username)) +')'}
                            </Link>
                        </li>
                    })}
                </ol>
            </nav>}
            <Outlet/>
        </div>
    )
}
export default LoadUser