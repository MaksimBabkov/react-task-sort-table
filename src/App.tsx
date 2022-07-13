import { useState, useEffect, SetStateAction } from 'react';
import styled from 'styled-components'
import axios from "axios";
import './App.css';
import data from './data.json'

interface IPost {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
  [index: string]: number | string | boolean;
}

interface IPosts extends Array<IPost> { }

function App() {

  const [posts, setPosts] = useState<IPosts>([])

  const [order, setOrder] = useState("ASC")

  const getPosts = () => {
    axios.get("https://jsonplaceholder.typicode.com/todos")
    .then((result: { data: SetStateAction<IPosts>; }) => {
      setPosts(result.data);
    })
    .catch(error => {
      setPosts(data)
   })
  }
    
  useEffect(() => {
    getPosts()
  }, []);

  const getStateCompleted = (state: boolean): string => {
    if (state) return "Ready"
    return "Await"
  }

  const sorting = (col: string): void => {

    if (order === "ASC") {
      
      const sorted: IPosts = [...posts].sort((a, b) =>
        a[col] > b[col] ? 1 : -1
      )
      setPosts(sorted)
      setOrder("DSC")
    }
    if (order === "DSC") {
      const sorted = [...posts].sort((a, b) =>
        a[col] < b[col] ? 1 : -1
      )
      setPosts(sorted)
      setOrder("BSC")
    }
    if (order === "BSC") {
      getPosts()
      setOrder("ASC")
    }
  }

  const ContainerFluid = styled.div`
      padding: 5px 45px;
    `
  return (
    <div className="App">
      <ContainerFluid>
        <table>
          <thead>
            <tr>
              <td onClick={() => sorting("id")}>Id</td>
              <td onClick={() => sorting("userId")}>UserId</td>
              <td onClick={() => sorting("title")}>Title</td>
              <td onClick={() => sorting("completed")}>Completed</td>
            </tr>
          </thead>
          <tbody>
            {posts.map(post =>
              <tr key={post.id}>
                <td>{post.id}</td>
                <td>{post.userId}</td>
                <td>{post.title}</td>
                <td>{getStateCompleted(post.completed)}</td>
              </tr>)}
          </tbody>
        </table>
      </ContainerFluid>
    </div>
  );
}

export default App;

