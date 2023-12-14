import React, { useState } from "react";

const Login = () => {
  const [edit, setEdit]= React.useState(false);
  const [updateData,setUpdateData]=React.useState<{username:string; address:string}>({username:'', address:''});
  const [currentStep, setCurrentStep]= React.useState(0);
  const [isLogged, setIsLoggedIn] = useState(false);
  const [data, setData] = React.useState<any>({});
  const [error, setError] = useState<string | null>(null);
  const [userData, setUserData] = React.useState<{ username: string, password: string }>({
    username: '',
    password: ''
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const temp = {
      [name]: value
    };
    setUserData(pre => ({
      ...pre,
      ...temp
    }));
  }
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      fetch('https://dummyjson.com/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: userData.username,
          password: userData.password
        })
      })
        .then(res => res.json()).then(data => {
          console.log('data', data)
          if(data.message==="Invalid credentials"){
                setIsLoggedIn(false);
                setError("Invalid credentials. Please try again.")
          }
          else{
            setData(
                { ...data }
                );
              setUpdateData({
                username:data.username,
                address:''
              })
              setIsLoggedIn(true);
          }
          
          
        })
    } catch (error) {
      console.log("error", error)
      setIsLoggedIn(false);
      setError('Invalid credentials. Please try again.');
    }
  }

  const updateUserData = () => {
    fetch(`https://dummyjson.com/users/${data.id}`, {
  method: 'PUT', /* or PATCH */
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    username: updateData.username,
    address:{
      address: updateData.address
    }
  })
})
.then(res => res.json())
.then(console.log).catch(er=>console.log('Error', er));
            
  }

  const setCurrentStepbutton=()=>{
       setCurrentStep(1)
  }

  return (
    <div className="login-page">
      {/* <div>
        <p>
          username: 'kminchelle'
        </p>
        <p>
          password: '0lelplR',
        </p> username":"lgribbinc","password":"ftGj8LZTtv9g"
      </div> */}

      {!isLogged ? <form onSubmit={handleSubmit}  >
        <div className="form">
          <label htmlFor="username">Username</label>
          <input type="text" name="username" id="username" value={userData.username} onChange={handleChange} />
        
        <div>
          <label htmlFor="password">password</label>
          <input type="password" name="password" id="password" value={userData.password} onChange={handleChange} />
        </div>
       
        <button type="submit">Login</button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
      </form> :
        (
      <div className="form">
          <h2> Welcome {data?.firstName} !!</h2>
          <button type="button" onClick={()=>setEdit(true)}>Update User</button>
          <br /><br />
          {
            edit && currentStep===0 ? (
              <div>
                <label htmlFor="username">Username</label>
                <input type="text" value={updateData.username} name="username" onChange={e => {
                  setUpdateData(pre => ({
                    ...pre,
                    [e.target.name]:e.target.value
                  }))
                }}/>
                <button type="button" onClick={setCurrentStepbutton}>Next</button>
              </div>
            ):
            currentStep===1 && (
              <div>
                <label htmlFor="address">Address</label>
                <input type="text" value={updateData.address} name="address" onChange={e => {
                  setUpdateData(pre => ({
                    ...pre,
                    [e.target.name]:e.target.value
                  }))
                }}/>
                <button type="button" onClick={updateUserData}>Submit</button>
              </div>
            )
            
          }
      </div>
        )
      }
    </div>
  )
}

export default Login;