import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';

export default function SignIn () {
    const [username, setUsername] = useState(null);
    const [isDisabled, setDisabled] = useState(true);
    const { setUser } = useUser();
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        setUser(username);
        localStorage.setItem('user', JSON.stringify(username));
        navigate("/booklist");
    }

    const handleInputChange = (value) => {
        (value.length >= 4 && value.length <= 16) ? setDisabled(false) : setDisabled(true);
        setUsername(value);
    }

    return (
        <div id="signin" className="d-flex flex-column align-items-center mt-5">
            <img src="../img/avatar.png" alt="avatar logo" className="border rounded-circle"/>
            <form onSubmit={handleSubmit} className="d-flex flex-column align-items-center row">
                <p className="col-6 my-3">Username</p>
                <input
                    type="text"
                    className="form-control text-center col-6 my-3"
                    onChange={(e) => handleInputChange(e.target.value)}
                    placeholder="Type username"
                    required
                />
                <button type="submit" className="btn btn-primary" disabled={isDisabled} >Sign in</button>
            </form>
        </div>
    )
}