// Learning from React-လို-တို-ရှင်း - အခန်း(၁၂) - React Basic
// Follow By 
// Name : Aung Myat Moe
// Date : 17 Nov 2024 (11:27 PM)
// Description :  how to work with api

import React, { createRef, useEffect, useState } from "react";

const App = props => {
  let firstNameRef = createRef();
  let lastNameRef = createRef();
  const [users, setUsers] = useState([]);

  const add = () => {
    let first_name = firstNameRef.current.value;
    let last_name = lastNameRef.current.value;
    
    fetch('https://reqres.in/api/users',{
      method: 'POST',
      headers: {
        'content-type':'application/json',
      },
      body: JSON.stringify({first_name, last_name})
    })
    .then(res => res.json())
    .then(name => {setUsers([...users,name])});

    firstNameRef.current.value = "";
    lastNameRef.current.value = "";
  }

  const remove = () => {
    console.log('hello');
  }

  useEffect(() => {
    fetch('https://reqres.in/api/users?page=2')
    .then(res => res.json())
    .then(json => {
      setUsers(json.data);
    });
  },[]);

  return(
    <div>
      First Name : <input type="text" ref={firstNameRef}/>
      last Name : <input type="text" ref={lastNameRef}/>
      <button onClick={add}>Add User</button>
      <ul>
        {users.map(i=><li key={i.id}>{i.first_name} {i.last_name}<button onClick={remove}>Delete</button></li>)}
      </ul>
    </div>
  )
}

export default App;