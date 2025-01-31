import React from "react"
import Notify from "./Notify"
import { useNavigate } from "react-router-dom";

function Navbar(){
    const navigate = useNavigate();

    const fetchUser = () => {
		fetch("http://localhost:4000/users")
			.then((res) => res.json())
			.then((data) => {
				const stringData = data.toString();
				localStorage.setItem("users", stringData);
			})
			.catch((err) => console.error(err));
	};
    
	const createPostBtn = () => {
		fetchUser();
		navigate("/post/create");
	};
    return (
        <nav className='home__navbar'>
				<h2 onClick={() => navigate("/dashboard")}>templət</h2>
				<div className='home__buttons'>
					<button className='home__createBtn' onClick={createPostBtn}>
						CREATE POST
					</button>
					<Notify />
				</div>
			</nav>
    )
}

export default Navbar