import { useReducer, useState } from 'react';
import '../App.css';

const initialState = {
  name: "",
  email: "",
  password: "",
  confirm: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "input":
      return {
        ...state,
        [action.name]: action.value
      };
    case "checkbox":
      return {
        ...state,
        confirm: action.value
      };
    case "reset":
      return initialState;
    default:
      return state;
  }
};

const SignUp = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [showData, setShowData] = useState(false);
  const [users, setUsers] = useState([]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setUsers([...users, state]);
    setShowData(true);
    dispatch({ type: "reset" });
  };

  const handleOnChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      dispatch({ type: "checkbox", value: checked });
    } else {
      dispatch({ type: "input", name, value });
    }
  };

  return (
    <div>
    
        <form onSubmit={handleFormSubmit}>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            placeholder="Enter your name"
            name="name"
            id="name"
            onChange={handleOnChange}
            value={state.name}
            required
          />

          <label htmlFor="email">Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            id="email"
            name="email"
            onChange={handleOnChange}
            value={state.email}
            required
          />

          <label htmlFor="password">Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            id="password"
            name="password"
            onChange={handleOnChange}
            value={state.password}
            required
          />

          <div>
            <input
              type="checkbox"
              id="checkbox"
              checked={state.confirm}
              onChange={handleOnChange}
            />
            <label htmlFor="checkbox">Are you ready to confirm?</label>
          </div>

          <button type="submit">SignUp</button>
        </form>
      {
        users && (
          <div>
          {users.map((user, index) => (
            <div key={index}>
              <h1>Name: {user.name}</h1>
              <h1>Email: {user.email}</h1>
              <h1>Password: {user.password}</h1>
              <h1>Confirmed: {user.confirm ? "Yes" : "No"}</h1>
            </div>
          ))}
          <button onClick={() => setShowData(false)}>Go To Form</button>
        </div>
        )
      }
    </div>
  );
};

export default SignUp;
