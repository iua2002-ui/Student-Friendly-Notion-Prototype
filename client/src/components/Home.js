import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

const Home = ({ socket }) => {
	const navigate = useNavigate();

	
	const readMoreBtn = (postID) => {
		socket.emit("findPost", postID);
		navigate(`/post/${postID}`);
	};
	const [posts, setPosts] = useState([]);

	useEffect(() => {
		function fetchPosts() {
			fetch("http://localhost:4000/api")
				.then((res) => res.json())
				.then((data) => setPosts(data))
				.catch((err) => console.error(err));
		}
		fetchPosts();
	}, []);

	useEffect(() => {
		socket.on("updatePosts", (posts) => setPosts(posts));
	}, [socket]);

	return (
		<div className='home'>
			<Navbar />
			
			<div className='posts__container'>
				{posts.map((post) => (
					<div className='post' key={post.id}>
						<h3>{post.title}</h3>
						<button className='post__cta' onClick={() => readMoreBtn(post.id)}>
							READ MORE
						</button>
					</div>
				))}
			</div>
		</div>
	);
};

export default Home;
