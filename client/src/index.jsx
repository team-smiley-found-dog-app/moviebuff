import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

// react router imports
// import { Route, Switch } from 'react-router-dom';
// import { BrowserRouter } from 'react-router-dom';
// import '../App.css';
import LoginCard from './Components/LoginCard.jsx'
import Main from './Pages/Main.jsx';
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
// import MovieDescript from './Pages/MovieDescript.jsx';
// import UserAccount from './Pages/UserAccount.jsx';
// import SearchResults from './Pages/SearchResults.jsx';

//firebase imports
import firebase, { auth, provider } from '../firebaseConfig.js';

// hoping firebase works deployed
class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: null,
      users: [],
      isLoggedIn: false,
      theme: {
        palette: {
          canvasColor: "rgba(0, 0, 0, 0.87)"
        }
      }
    };

    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.toggleDark = this.toggleDark.bind(this);
  }

  toggleDark() {
    let newPaletteType =
      this.state.theme.palette.type === "light"
        ? "rgba(0, 0, 0, 0.87)"
        : "rgba(255, 255, 255, 0.3)";
  // console.log(newpaletteType);
    this.setState({ theme: { palette: { canvasColor: newPaletteType } }});
  }

  login() {
    auth
      .signInWithPopup(provider)
      .then(result => {
        this.setState({
          user: result.user
        });
      })
      .then(() => {
        axios.post("/users", {
          user: this.state.user
        });
      });
  }

  logout() {
    auth.signOut().then(() => {
      this.setState({
        user: null
      });
    });
  }

  componentDidMount() {
    auth.onAuthStateChanged(user => {
      if (user) {
        this.setState({ user });
      }
    });
  }

  render() {
    const appStyle = {
      display: "flex",
      justifyContent: "center",
      alignItems: "center"
    };
const muiTheme = createMuiTheme(this.state.theme);
    return (
      <div style={appStyle}>
        {!this.state.user ? (
          <LoginCard loginClick={this.login} />
        ) : (
          <MuiThemeProvider theme={muiTheme}>
          <Main user={this.state.user} logoutClick={this.logout} />
          <Navbar onToggleDark={this.onToggleDark}/>
          </MuiThemeProvider>
        )}
      </div>
    );
  }
}

// const App = () => (
//   <div>
//     <Switch>
//       <Route exact path='/' component={Main} />
//       <Route path='/movie' component={MovieDescript} />
//       <Route path='/account' component={UserAccount} />
//       <Route path='/results' component={SearchResults} />
//     </Switch>
//   </div>
// )
ReactDOM.render(<App />, document.getElementById('app'));