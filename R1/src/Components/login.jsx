import { useEffect, useState } from "react";
import axios from 'axios';

function Login() {

    const [userName, setUserName] = useState (null);
    const [error, setError] = useState (null);
    const [name, setName] = useState('');
    const [psw, setPsw] = useState('');

    useEffect(() => {
        axios.get('http://localhost:3003/login', {withCredentials: true})
        .then(res => {
            if(res.data.status === 'ok'){
                setUserName(res.data.name);
            }
        });
    }, []);

    const login = _ => {
        axios.post('http://localhost:3003/login', {name, psw}, {withCredentials: true})
        .then(res => {
            console.log(res.data);
            if(res.data.status === 'ok'){
                setUserName(res.data.name);
                setName('');
                setPsw('');
                setError(null);
            } else {
                setError(true);
                setItemName(true);
            }
        });
    }

    return (
        <div className="form-container">
        <article>
            <h3 className="list-header"> {error ? <span style={{collor: 'crimson'}}>Login Error</span> : <span>Login</span>}</h3>
        </article>
        <div>
            <h3>
                        {
                        userName ? <span>Hello, {userName}</span> : <span>Hello, guest</span>
                        }
            </h3>
        </div>
            <div>
                <label className="form-label">Name</label>
                <input type="text" value={name} onChange={e => setName(e.target.value)}/>
            </div>
            <div>
                <label className="form-label">Password</label>
                <input type="password" value={psw} onChange={e => setPsw(e.target.value)}/>
            </div>
            <div>
                <button className="balance-update-btn" onClick={login}>Login</button>
        </div>
    </div>
    )
}

export default Login;