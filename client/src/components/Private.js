import React, { useState, useEffect } from "react";
import PostService from "../services/post.service";
import AuthService from "../services/auth.service";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [privatePosts, setPrivatePosts] = useState([]);
  const [fake, setFake] = useState([]);
  console.log(fake);

  const navigate = useNavigate();

  useEffect(() => {
    PostService.getAllPrivatePosts().then(
      (response) => {
        setPrivatePosts(response.data);
      },
      (error) => {
        console.log("Private page", error.response);
        // Invalid token
        if (error.response && error.response.status === 403) {
          AuthService.logout();
          navigate("/login");
          window.location.reload();
        }
      }
    );
  }, []);

  useEffect(() => {
    fakestore();
  }, []);

  const fakestore = async () => {
    const response = await fetch("https://fakestoreapi.com/products");
    const JsonData = await response.json();
    console.log(JsonData)
    setFake(JsonData);
  };

  return (

    <div>
      {fake.map(data=>{
        <div class="card" style="width: 18rem;">
        <img class="card-img-top" src="data.image" alt="Card image cap"/>
          <div class="card-body">
            <h5 class="card-title">data.title</h5>
            <p class="card-text">data.description</p>
            <h6> data.price</h6>
          </div>
      </div>
      })}
      
    </div>
  );
};

export default Home;
