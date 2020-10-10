import React from "react";
import { axiosWithAuth } from "../api/axiosWithAuth.js";

class Login extends React.Component {
  state = {
    credentials: {
      username: "",
      password: ""
    }
  };

  handleChange = (e) => {
    this.setState({
      credentials: {
        ...this.state.credentials,
        [e.target.name]: e.target.value
      }
    });
  };

  login = (e) => {
    e.preventDefault();
    axiosWithAuth()
      .post("/api/login", this.state.credentials)
      .then((res) => {
        console.log("ko: Login.js: login: res: ", res);
        localStorage.setItem("token", res.data.payload);
        this.props.history.push("/BubblePage");
      })
      .catch((err) => {
        if (err.response) {
          console.error(
            "Login.js: login failed: response from server: ",
            err.response.data
          );
        } else {
          console.error("Login.js: login failed: err: ", err);
        }
      });
  };

  render() {
    return (
      <div>
        <h1>Welcome to the Bubble App!</h1>
        <form onSubmit={this.login}>
        <label>Username:
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={this.state.credentials.username}
            onChange={this.handleChange}
          />
          </label>
          <label> Password:
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={this.state.credentials.password}
            onChange={this.handleChange}
          />
          </label>
          <button>Log in</button>
        </form>
      </div>
    );
  }
}

export default Login;

