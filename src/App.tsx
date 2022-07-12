import { useState, useEffect } from 'react';
import styled from 'styled-components'
import axios from "axios";
import './App.css';

interface IPost {
  userId: number,
  id: number,
  title: string,
  completed: boolean
}

interface IPosts extends Array<IPost> { }

function App() {

  const [posts, setPosts] = useState<IPosts>([])

  const getPosts = () => 
    axios.get("https://jsonplaceholder.typicode.com/todos")
      .then((result) => {
        setPosts(result.data);
    });
  
  useEffect(() => {
    getPosts()
  }, []);

  const getStateCompleted = (state: boolean): string => {
    if (state) return "true"
    return "false"
  }

  const ContainerFluid = styled.div`
      padding: 5px 45px;
    `
  return (
    <div className="App">
      <ContainerFluid>
        <table>
          <tr>
            <td>userId</td>
            <td>id</td>
            <td>title</td>
            <td>completed</td>
          </tr>
          {posts.map(post => <tr>
            <td>{post.userId}</td>
            <td>{post.id}</td>
            <td>{post.title}</td>
            <td>{getStateCompleted(post.completed)}</td>
          </tr>)}
        </table>
      </ContainerFluid>
    </div>
  );
}

export default App;
