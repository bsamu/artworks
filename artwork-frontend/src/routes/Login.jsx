// import './App.css';
// App.jsx-ben létrehozni useState, mind2-t továbbadogatni, useEffect dependencybe a value, az pedig újat változtat true-ra 
import { useEffect, useState } from 'react';
import http from 'axios'
import { Link, useNavigate } from "react-router-dom";

const Login = (props) => {
  const [nameValue, setNameValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');

  // const [authUser, setAuthUser] = useState('');
  // const [authPassword, setAuthPassword] = useState('');

  const authUser = props.authUser;
  const setAuthUser = props.setAuthUser;
  const authPassword = props.authPassword;
  const setAuthPassword = props.setAuthPassword;

  const loggedIn = props.loggedIn;
  const setLoggedIn = props.setLoggedIn;

  let navigate = useNavigate();

  const login = async () => {
    try {
      const response = await http.post('http://localhost:3001/api/login', {

    }, {
        headers: {
          authorization: authUser+':::'+authPassword
        }
      })
    //   console.log(authUser, authPassword);
      getPassword();
      alert('Successful login')
      setLoggedIn(true)
      // localStorage.setItem('user', authUser)
      localStorage.setItem('sessionId', response.data)

    //   localStorage.setItem('password', authPassword)
    } catch (err) {
      alert('Wrong username or password')
    }
  }

  const getPassword = async () => {
      try {
        const password = await http.get('http://localhost:3001/api/login')
        // localStorage.setItem('password', password.data)
        navigate("/")
      } catch(err) {
        alert('Something went wrong')
      }
  }

  // const signOut = () => {
  //     localStorage.removeItem('user', authUser)
  //     localStorage.removeItem('password', authPassword)
  
  //     setAuthUser('')
  //     setAuthPassword('')
  // }

  // dependency arraybe kell majd egy useState value
  useEffect(() => {
    // const user = localStorage.getItem('user')
    // const password = localStorage.getItem('password')
    const sessionId = localStorage.getItem('sessionId')
    if (!sessionId) return;
    // setAuthUser(user)
    // setAuthPassword(password)
  }, [])

  // nem biztos, hogy kell ez
  useEffect(() => {
  }, [])
  

  return (
    <div>
        <h2>Login</h2>
        <div className='login-form'>
          <input type="text" placeholder="authUsername" value={authUser} onChange={(e) => setAuthUser(e.target.value)}/>
          <input type="password" placeholder="authPassword" value={authPassword} onChange={(e) => setAuthPassword(e.target.value)}/>
          <button onClick={login}>Log in</button>
          <button onClick={() => navigate("/signup")}>I don't have an account</button>
          <div className="image" >
          </div>
        </div>
    </div>
  );
}
// localStorage.removeItem('user')
// localStorage.removeItem('password')


export default Login;

// import './App.css';
// import { useEffect, useState } from 'react';
// import http from 'axios'

// function Login() {
//   const [nameValue, setNameValue] = useState('');
//   const [passwordValue, setPasswordValue] = useState('');

//   const [authUser, setAuthUser] = useState('');
//   const [authPassword, setAuthPassword] = useState('');
//   const [todo, setTodo] = useState('');

//   const [sectionToAppear, setSectionToAppear] = useState('registration')

//   const signUp = async () => {
//     try {
//       await http.post('http://localhost:3001/api/signup', {
//         name: nameValue,
//         password: passwordValue
//       })
//       alert("Succesful signup")
//       setSectionToAppear('login')
//       setNameValue('')
//       setPasswordValue('')
//     } catch (err) {
//       console.log(err.response)
//       if (!err.response) {
//         alert("Oops... Something went wrong")
//       }
//       if (err.response.status === 409) {
//         alert('Username already exists')
//       }
//       if (err.response.status === 400) {
//         alert('Missing credentials')
//       }
//     }
//   }

//   const addTodo = async () => {
//     try {
//       await http.post('http://localhost:3001/api/todo', {
//         todo: todo
//       }, {
//         headers: {
//           authorization: authUser+':::'+authPassword
//         }
//       })
//       alert("Todo added")
//       setTodo('')
//     } catch (err) {
//       alert('Ooop... Something went wrong')
//     }
//   }

//   const login = async () => {
//     try {
//       await http.post('http://localhost:3001/api/login', {

//     }, {
//         headers: {
//           authorization: authUser+':::'+authPassword,
//         },
//       })
//       console.log(authUser, authPassword);
//       setSectionToAppear('todos')
//       localStorage.setItem('user', authUser)
//       localStorage.setItem('password', authPassword)

//     } catch (err) {
//       alert('Wrong username or password')
//     }
//   }

//   const signOut = () => {
//     localStorage.removeItem('user', authUser)
//     localStorage.removeItem('password', authPassword)

//     setAuthUser('')
//     setAuthPassword('')
//     setSectionToAppear('login')
//   }

//   useEffect(() => {
//     const user = localStorage.getItem('user')
//     const password = localStorage.getItem('password')
//     if (!user || !password) return;
//     setAuthUser(user)
//     setAuthPassword(password)
//     setSectionToAppear('todos')
//   }, [])

//   return (
//     <main>

//       {sectionToAppear === 'registration' && <section>
//         <h1>Registration</h1>
//         <input type='text' placeholder='username' value={nameValue} onChange={(e) => setNameValue(e.target.value)} />
//         <input type='password' placeholder='password' value={passwordValue} onChange={(e) => setPasswordValue(e.target.value)} />
//         <button onClick={signUp}>Sign up</button>
//         <button onClick={() => setSectionToAppear('login')}>I already have an account</button>
//       </section>}    

//       {sectionToAppear === 'login' && <section>
//         <h1>Login</h1>
//         <input type="text" placeholder="authUsername" value={authUser} onChange={(e) => setAuthUser(e.target.value)}/>
//         <input type="password" placeholder="authPassword" value={authPassword} onChange={(e) => setAuthPassword(e.target.value)}/>
//         <button onClick={() => setSectionToAppear('registration')}>I don't have an account</button>
//         <button onClick={login}>Log in</button>
//       </section>}

//       {sectionToAppear === 'todos' && <section>
//         <h1>Todos</h1>
//         <input type='text' placeholder='todo' value={todo} onChange={(e) => setTodo(e.target.value)} />
//         <button onClick={addTodo} disabled={!todo}>Add todo</button>
//         <button onClick={signOut}>Sign out</button>
//       </section>}
      
//     </main>
//   );
// }

// export default Login;
