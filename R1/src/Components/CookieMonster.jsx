import { useState } from "react";
import axios from 'axios';

function CookieMonster() {

    const [text, useText] = useState ('');

    const set = _ => {
        axios.post('http://localhost:3003/cookie', {text}, {withCredentials: true})
        .then(res => {
            console.log(res.data);
        });
    }

    const del = _ => {
        axios.post('http://localhost:3003/cookie', {delete: true}, {withCredentials: true})
        .then(res => {
            console.log(res.data);
        });
    }


    return (
    <div>
        <article>
            <h3 className="list-header">Cookies manager</h3>
        </article>
        <table>
            <thead>
                <tr>
                    <th>monsterCookie</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>
                    <div>
                        <label className="form-label">New Cookie Text</label>
                    </div>
                    <input type="text" value={text} onChange={e => useText(e.target.value)}/>
                    <button className="balance-update-btn" onClick={set}>Set</button>
                    <button className="balance-update-btn" onClick={del}>Delete</button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
    )
}

export default CookieMonster;