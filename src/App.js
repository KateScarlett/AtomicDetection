import './App.css';
import Navigation from "./components/Navigation/Navigation";
import Logo from "./components/Logo/Logo";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import FaceRecognition from "./components/FaceRecognition/FaceRecognition";
import Rank from "./components/Rank/Rank";
import Particles from "react-particles";
import {loadSlim} from "tsparticles-slim";
import React, {Component} from "react";
import SignInRegister from "./components/SignInRegister/SignInRegister";

const particlesInit = (async engine => {
    // console.log(engine);
    // you can initiate the tsParticles instance (engine) here, adding custom shapes or presets
    // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
    // starting from v2 you can add only the features you need reducing the bundle size
    //await loadFull(engine);
    await loadSlim(engine);
});

const particlesLoaded = (async container => {
    // await console.log(container);
});

const particleOptions = {
    // background: {
    //     color: {
    //         value: "#9207a7",
    //     },
    // },
    fpsLimit: 60,
    particles: {
        color: {
            value: "#ffffff",
        },
        links: {
            color: "#ffffff",
            distance: 150,
            enable: true,
            opacity: 0.5,
            width: 1,
        },
        move: {
            direction: "none",
            enable: true,
            outModes: {
                default: "bounce",
            },
            random: true,
            speed: 2,
            straight: false,
        },
        number: {
            density: {
                enable: true,
                area: 800,
            },
            value: 120,
        },
        opacity: {
            value: 0.5,
        },
        shape: {
            type: "circle",
        },
        size: {
            value: {min: 2, max: 10},
        },
    },
    interactivity: {
        events: {
            // onClick: {
            //     enable: true,
            //     mode: "push",
            // },
            onHover: {
                enable: true,
                mode: "repulse",
            },
            resize: true,
        },
        modes: {
            push: {
                quantity: 5,
            },
            repulse: {
                distance: 100,
                duration: 0.4,
            },
        },
    },
    detectRetina: true,
}

const initialState = {
    input: '',
    imageUrl: '',
    box: {},
    route: 'signin',
    isSignedIn: false,
    user: {
        id: '',
        name: '',
        email: '',
        entries: 0,
        joined: '',
    }
}

class App extends Component {

    constructor() {
        super();
        this.state = initialState;
    }

    loadUser = (data) => {
        this.setState({
            user: {
                id: data.id,
                name: data.name,
                email: data.email,
                entries: data.entries,
                joined: data.joined,
            }
        })
    };

    calculateFaceLocation = (data) => {
        const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
        const image = document.getElementById('inputImage');
        const width = Number(image.width);
        const height = Number(image.height);
        return {
            leftCol: clarifaiFace.left_col * width,
            topRow: clarifaiFace.top_row * height,
            rightCol: width - (clarifaiFace.right_col * width),
            bottomRow: height - (clarifaiFace.bottom_row * height)
        }
    }

    displayFaceBox = (box) => {
        //console.log(box);
        this.setState({box: box});
    }

    onInputChange = (event) => {
        this.setState({input: event.target.value});
    }

    getClarifaiData = async () => {
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                url: this.state.input
            })
        };
        const response = await fetch('http://localhost:3000/api', requestOptions);
        return await response.json();
    }

    updateProfile = async () => {
        const requestOptions = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: this.state.user.id
            })
        };
        const response = await fetch('http://localhost:3000/image', requestOptions);
        const countEntries = await response.json();
        if(countEntries){
           this.setState(Object.assign(this.state.user, {entries: countEntries}));
        }
    }

    onButtonSubmit = async (event) => {
        this.setState({imageUrl: this.state.input});
        const data = await this.getClarifaiData();
        await this.updateProfile();
        this.displayFaceBox(this.calculateFaceLocation(data));
    }

    onRouteChange = (route) => {
        if (route === 'signout') {
            this.setState({isSignedIn: false}, () => {
                this.setState(initialState);
            });
            this.setState({route: 'signin'});
        } else if (route === 'home') {
            this.setState({isSignedIn: true});
            this.setState({route: route})
        } else {
            this.setState({route: route})
        }
    };

    render() {

        const {route, isSignedIn, box, imageUrl} = this.state;
        return (
            <div className="App">
                <Particles
                    id="tsparticles"
                    init={particlesInit}
                    loaded={particlesLoaded}
                    options={particleOptions}
                />
                <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange}/>
                {route === 'home'
                    ? <div>
                        <Logo/>
                        <Rank name={this.state.user.name} entries={this.state.user.entries}/>
                        <ImageLinkForm
                            onInputChange={this.onInputChange}
                            onButtonSubmit={this.onButtonSubmit}
                        />
                        <FaceRecognition
                            imageUrl={imageUrl}
                            box={box}
                        />
                    </div>
                    :
                    <SignInRegister loadUser={this.loadUser} route={this.state.route} onRouteChange={this.onRouteChange}/>
                }
            </div>
        );
    }
}

export default App;
