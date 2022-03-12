import React, { Component } from 'react';
// import Clarifai from "clarifai";
import Particles from "react-tsparticles";
import Navigation from './components/Navigation/Navigation.js';
import Signin from './components/Signin/Signin.js';
import Register from './components/Register/Register.js';
import FaceTracking from './components/FaceTracking/FaceTracking.js';
import Logo from './components/Logo/Logo.js';
import Rank from './components/Rank/Rank.js';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm.js';
import './App.css';

// const deployAddr = "https://obscure-everglades-16133.herokuapp.com";
// All API parts were moved to backend
/*const app = new Clarifai.App({ 
  apiKey: "ab6fd89488f84c819c6bc2290348950f",
});*/

const particlesOptions = {
  fpsLimit: 30,
  
  particles: {
    number: {
      value: 30,
      density: {
        enable: true,
        value_area: 800,//area: 800,
      }
    },

    color: {
      value: "#ffffff",
    },

    shape: {
      type: "circle"
    },

    opacity: {
      value: 1,
      random: false
    },

    size: {
      value: 50,
      random: true
    },

    lineLinked: {//links:
      enable: true,
      distance: 150,
      color: "#ffffff",
      opacity: 1,
      width: 1
    },

    move: {
      enable: true,
      speed: 1,
      direction: "none",
      random: false,
      straight: false,
      out_mode: "bounce"//"out" //outMode: "bounce",
    }
  },

  interactivity: {
    detect_on: "window",
    events: {
      onHover: {
        enable: true,
        mode: "bubble",
        // parallax: {
        //   enable: true,
        //   force: 60,
        //   smooth: 10,
        // },
      },
      onClick: {
        enable: false,
        mode: "push"
      },
      resize: true
    },
    modes: {
      grab: {
        distance: 400,
        lineLinked: {
          opacity: 1
        }
      },
      bubble: {
        distance: 300,
        size: 100,
        duration: 2,
        opacity: 1,
        speed: 1,
        mix: false,
      },
      repulse: {
        distance: 200,
        duration: 0.4,
      },
      push: {
        particles_nb: 4 //quantity: 4,
      },
      remove: {
        particles_nb: 2 //quantity: 2,
      },
      trail: {
        delay: 0.005,
        quantity: 5
      },
    }
  },

  backgroundMask: {
    enable: true,
    cover: {
      value: {
        r: 21,
        g: 13,
        b: 66
      }
    }
  },

  retina_detect: true,

  background: {
    // image: "url('https://cdn.pixabay.com/photo/2020/09/22/07/54/people-5592232_960_720.jpg')",
  }
}
const initialState = {
  input:'',
  imageUrl:'',
  box:{},
  route:'signin',
  isSignedIn: false,
  user:{
    id: '',
    name: '',
    email: '',
    entries: 0,
    joined: ''
  }
}

class App extends Component {
  
  constructor() {
    super();
    this.state = initialState;
    /*this.state = {
      input:'',
      imageUrl:'',
      box:{},
      route:'signin',
      isSignedIn: false,
      user:{
        id: '',
        name: '',
        email: '',
        entries: 0,
        joined: ''
      }
    }*/
  }

  loadUser = (data) => {
    this.setState(
      {
        user: {
          id: data.id,
          name: data.name,
          email: data.email,
          entries: data.entries,
          joined: data.joined
        }
    })
  }
  // componentDidMount(){
  //   fetch('http://localhost:3000')
  //     .then(response => response.json())
  //     .then(console.log)
  // }

  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputImage');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * width,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }
  }

  displayFaceBox = (box) => {
    this.setState({box: box})
  }

  onInputChange = (event) => {
    // console.log(event.target.value);
    this.setState({input: event.target.value});
  }

  onButtonSubmit = () => {
    this.setState({imageUrl: this.state.input});
    // All API parts were moved to backend
    /*app.models
    .predict(
      Clarifai.FACE_DETECT_MODEL,
      // Clarifai.COLOR_MODEL,
      // THE JPG
      // "https://i.insider.com/5d321d4ea209d3146d650b4a?width=1100&format=jpeg&auto=webp"
      this.state.input
      //This next fetch is included after removing the API
    )*/
    
    /*fetch('http://localhost:3000/imageurl',*/
    /*fetch('https://obscure-everglades-16133.herokuapp.com/imageurl',*/ 
    fetch(`${deployAddr}/imageurl`, 
    {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        input: this.state.input
      })
    })
    .then(response => response.json())
    .then((response) => {
      if(response){
        /*fetch('http://localhost:3000/image',*/ 
        fetch('https://obscure-everglades-16133.herokuapp.com/image', 
          {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              id: this.state.user.id
            })
        })
          .then(response => response.json())
          .then(count => {
            this.setState(Object.assign(this.state.user, {entries: count}))
          })
          .catch(console.log)
      }
      this.displayFaceBox(this.calculateFaceLocation(response));
      // console.log(response.outputs[0].data.regions[0].region_info.bounding_box);
    })
    .catch((err) => {
      console.log(err);
    });    
  }

  onRouteChange = (route) => {
    if (route === 'signout') {
      /*this.setState({isSignedIn:false})*/
      this.setState(initialState)
    } else if(route==='home') {
      this.setState({isSignedIn:true})
    }
    this.setState({route:route})
  }

  render() {
    const {isSignedIn, imageUrl, route, box, user} = this.state;
    return (
      <div className="App">
        <Particles className='particles'
          params={particlesOptions}
        />
        <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange}/>
        { route === 'home' 
          ? <div>
              <Logo />
              <Rank name={user.name} entries={user.entries} />
              <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit}/>
              <FaceTracking box={box} imageUrl={imageUrl}/>
            </div>
          : (
              this.state.route === 'signin' 
              ? <Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
              : <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
            ) 
        }
      </div>
    );
  }
}

export default App;
