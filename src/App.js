import React, { Component, Fragment } from 'react';
import Clarifai from 'clarifai';
import './App.css';

import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Rank from './components/Rank/Rank';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';

import Particles from 'react-particles-js';


const particlesOptions = {
    particles: {
      number: {
        value: 30,
        density: {
          enable: true,
          value_area: 200
        }
      }
    }
};

const app = new Clarifai.App({
  apiKey: 'KEY API'
});

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: '',
      imageUrl: '',
      boxes: [],
      route: 'signin',
      isSignedIn: false
    }
  }

  calculateFaceLocation = (data) => {
    const listOfData = data.outputs[0].data.regions;
    const image = document.getElementById('inputImage');
    const width = Number(image.width);
    const height = Number(image.height);
    const returnList = listOfData.map(item => {
      // item.id === uniqueId, item.region_info.bounding_box === coords
      const clarifaiFace = item.region_info.bounding_box;
      return {
        key: item.id,
        leftCol: clarifaiFace.left_col * width,
        topRow: clarifaiFace.top_row * height,
        rightCol: width - (clarifaiFace.right_col * width),
        bottomRow: height - (clarifaiFace.bottom_row * height)
      };
    });
    return returnList;
  }

  displayFaceBox = (boxes) => {
    this.setState({boxes: boxes});
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }
  onButtonSubmit = () => {
    this.setState({imageUrl: this.state.input});
    app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
    .then(response => this.displayFaceBox(this.calculateFaceLocation(response)))
    .catch(err => console.log(err));
  }
  onRouteChange = (route) => {
    if (route === 'signin') {
      this.setState({isSignedIn: false});
    } else if (route === 'home') { 
      this.setState({isSignedIn: true});
    }
    this.setState({route: route});
  };
  

  render() {
    return (
      <div className="App">
        <Particles 
          params={particlesOptions}
          className='particles' />
        <Navigation onRouteChange={this.onRouteChange} isSignedIn={this.state.isSignedIn}/>
        { this.state.route === 'home' 
              ? <Fragment>
                
                <Logo />
                <Rank />
                <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit}/>
                <FaceRecognition boxes={this.state.boxes} imageUrl={this.state.imageUrl} />
                </Fragment>
              : ( this.state.route === 'signin' ? <Signin onRouteChange={this.onRouteChange}/> 
                                                : <Register />)
        }
      </div>
    );
  }
};


export default App;
