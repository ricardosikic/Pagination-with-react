import React from "react";
import "./styles.css";

// Component Ui
import Pagination from "@material-ui/lab/Pagination";

export default class App extends React.Component {
  state = {
    posts: [],
    postPerPage: 12,
    currentPage: 1
  };

  componentDidMount() {
    this.getPostData();
  }
  getPostData = () => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then(response => response.json())
      .then(data => {
        this.setState({
          posts: data
        });
      });
  };

  changePage = (e, number) => {
    this.setState({
      currentPage: number
    });
  };

  pagination = () => {
    const { posts, postPerPage } = this.state;
    let totalForPagination = Math.ceil(posts.length / postPerPage);
    let pageNumber = [];
    for (let i = 1; i < totalForPagination; i++) {
      pageNumber.push(i);
    }

    return pageNumber.map((number, i) => {
      return (
        <li
          key={i}
          style={{ marginRight: ".5rem", cursor: "pointer" }}
          onClick={e => this.changePage(e, number)}
        >
          {number}
        </li>
      );
    });
  };

  render() {
    const { posts, currentPage, postPerPage } = this.state;
    const indexOfLastPost = currentPage * postPerPage;
    const indexOfFirstPost = indexOfLastPost - postPerPage;

    const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

    return (
      <div className="App">
        <h1>Lista de objetos:</h1>
        {currentPosts.map((post, ix) => {
          return <p key={ix}>{post.title}</p>;
        })}

        <div>
          <ul style={{ display: "inline-flex", listStyle: "none" }}>
            {this.pagination()}
          </ul>
        </div>
      </div>
    );
  }
}
