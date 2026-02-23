import './Rohan.css';
import React, { useEffect, useRef, useState } from 'react';
import {
Engine,
Scene,
Color3,
StandardMaterial,
CubeTexture,
Texture,
MeshBuilder,
ArcRotateCamera,
Vector3,
DirectionalLight,
Animation,
QuadraticEase,
EasingFunction
} from 'babylonjs';
import { SceneLoader } from '@babylonjs/core/Loading/sceneLoader';
import { HemisphericLight } from '@babylonjs/core/Lights/hemisphericLight';
import '@babylonjs/loaders';
import AOS from 'aos';
import 'aos/dist/aos.css';

function Rohan() {
    const canvasRef = useRef(null);
    const engineRef = useRef(null);
    const sceneRef = useRef(null);
    const cameraRef = useRef(null);

    const [textBox1Visible, setTextBox1Visible] = useState(false);
    const [textBox2Visible, setTextBox2Visible] = useState(false);
    const [loadingProgress, setLoadingProgress] = useState(0);
    const [isLoading, setIsLoading] = useState(true); // Add loading state

    const animationSpeeds = [110, 110, 110, 110];
    const targetAlphas = [1.1, 1.3, 1.7, 1.2];
    const targetRadiuses = [100, 30, 20, 100];
    const targetXoffset = [0, 0, 30 , -20];
    const animationStates = 3;
    const scrollThresholds = [0, 200, 600, 1300]; // Example thresholds - adjust as needed
    const [currentAnimationState, setCurrentAnimationState] = useState(0);

    // Define rotation limits (in radians)
    const minAlpha = 0.8; // Example: -90 degrees
    const maxAlpha = 2.5; // Example: +90 degrees
    const minBeta = 0.47; // Prevent looking straight up
    const maxBeta = 1.7; // Example: up to almost straight down.

    // Pan Limits (adjust these based on your scene)
    const panLimitX = 50; // Example limits, adjust as needed
    const panLimitY = 30;

    const [isCollapsed, setIsCollapsed] = useState(0);
const [isClicked, setIsClicked] = useState(0);

const [isMobile, setIsMobile] = useState(false);
const [overlayVisible, setOverlayVisible] = useState(false);
    const [isScrollingInDiv, setIsScrollingInDiv] = useState(false);
    const [isTouchDevice, setIsTouchDevice] = useState(false);
    let number = 0;

const [activeOverlay, setActiveOverlay] = useState(null);
 const toggleCollapse = () => {
        setIsCollapsed(!isCollapsed);
    };

        const handleDivScrollStart = () => {
        setIsScrollingInDiv(true);
        };

    const handleDivScrollEnd = () => {
    setIsScrollingInDiv(false);
    };

const handleProjectClick = (index) => {
setActiveOverlay((prev) => (prev === index ? null : index));
};


const handleButtonClick = () => {
setOverlayVisible(!overlayVisible); // Toggle on click for mobile
};

const handleMouseEnter = () => {
setOverlayVisible(true)
};

const handleMouseLeave = () => {
setOverlayVisible(false)
};


const buttonStyle = {
backgroundColor: 'rgba(128, 128, 128, 0.5)', // Opaque grey
padding: '10px 20px',
border: 'none',
borderRadius: '5px',
color: 'white',
transition: 'background-color 0.3s',
width: '25%', // Evenly distribute the buttons
textAlign: 'center',
position: 'relative', // Add relative positioning for overlay
overflow: 'hidden', // Clip content that overflows the button (for overlay positioning)
};


    const textBoxStyle = {
        ...(isCollapsed ?
            {
                top: '80%',
                overflow: "hidden"
            } :
            {}),
    };

    const timelineStyle = {
        all: 'unset',
        position: "relative",
        ...(isCollapsed ?
            {
                display: "none"
            } :
            {}),
    };

    useEffect(() => {
        AOS.init();
    }, [])

    const animateCamera = (camera, scene, targetAlpha, targetRadius, animationSpeed = 30, easingFunction = null) => {
        // zoomFactor: A value greater than 1 zooms in, less than 1 zooms out. 1 means no change.
        // animationSpeed: How many frames the animation should take (default is 30 - increased for smoothness)
        // easingFunction: An optional easing function to control the animation's acceleration and deceleration. Defaults to a smooth 'easeOutQuad' if not provided.

        // Animation for radius (zoom)
        let animCamRadius = new Animation(
            'animCamRadius',
            'radius',
            60, // Frames per second (FPS) - don't change this, it controls interpolation
            Animation.ANIMATIONTYPE_FLOAT,
            Animation.ANIMATIONLOOPMODE_CONSTANT
        );

        let keysRadius = [];
        keysRadius.push({
            frame: 0,
            value: camera.radius
        });
        keysRadius.push({
            frame: animationSpeed,
            value: targetRadius
        });
        animCamRadius.setKeys(keysRadius);

        // Animation for alpha (rotation)
        let animCamAlpha = new Animation(
            'animCamAlpha',
            'alpha',
            60, // Frames per second (FPS) - don't change this, it controls interpolation
            Animation.ANIMATIONTYPE_FLOAT,
            Animation.ANIMATIONLOOPMODE_CONSTANT
        );

        let keysAlpha = [];
        keysAlpha.push({
            frame: 0,
            value: camera.alpha
        });
        keysAlpha.push({
            frame: animationSpeed,
            value: targetAlpha
        });
        animCamAlpha.setKeys(keysAlpha);


        // Set easing function for smoother transitions.
        if (easingFunction === null) {
            // Default to a smooth easeOutQuad easing. If you want linear (no easing) pass `null` as the easingFunction.
            easingFunction = new QuadraticEase();
            easingFunction.setEasingMode(EasingFunction.EASINGMODE_EASEINOUT);
        }


        if (easingFunction) {
            animCamRadius.setEasingFunction(easingFunction);
            animCamAlpha.setEasingFunction(easingFunction);
        }


        camera.animations = [];
        camera.animations.push(animCamRadius);
        camera.animations.push(animCamAlpha);
        scene.beginAnimation(camera, 0, animationSpeed, false);
    };

    const handleScroll = (deltaY) => {
        //console.log('deltaY', deltaY);

        const newVirtualScrollY = Math.max(0, virtualScrollY + deltaY);
        setVirtualScrollY(newVirtualScrollY);
        //console.log('virtualScrollY', virtualScrollY);

        let newState = currentAnimationState;
        if (newVirtualScrollY >= scrollThresholds[3] || number == 3) {
            setTextBox1Visible(false);
            setTextBox2Visible(false);
            newState = 3;
        } else if (newVirtualScrollY >= scrollThresholds[2] || number == 2) {
            setTextBox1Visible(false);
            setTextBox2Visible(true);
            newState = 2;
        } else if (newVirtualScrollY >= scrollThresholds[1] || number == 1) {
            setTextBox1Visible(true);
            setTextBox2Visible(false);

            newState = 1;
        } else {
            setTextBox1Visible(false);
            setTextBox2Visible(false);
            newState = 0;
        }
        //console.log('newState ' + newState);
        if (newState !== currentAnimationState) {
            setCurrentAnimationState(newState);
            if (cameraRef.current && sceneRef.current) {
                animateCamera(
                    cameraRef.current,
                    sceneRef.current,
                    targetAlphas[newState],
                    targetRadiuses[newState],
                    animationSpeeds[newState]
                );
            }
        }


    };

    const [virtualScrollY, setVirtualScrollY] = useState(0);

    useEffect(() => {
        const handleWheel = (event) => {
            handleScroll(event.deltaY);
        };

        window.addEventListener('wheel', handleWheel);

        return () => {
            window.removeEventListener('wheel', handleWheel);
        };
    }, [currentAnimationState, virtualScrollY]);

    useEffect(() => {

        const canvas = canvasRef.current;
        if (!canvas) return;

        // Initialize js engine
        engineRef.current = new Engine(canvas, true);
        const engine = engineRef.current;

        // Create scene
        sceneRef.current = new Scene(engine);
        const scene = sceneRef.current;

        //Camera and light
        var camera = new ArcRotateCamera('Camera', 0, 0, 0, new Vector3(0, 0, 0), scene);        
        camera.setPosition(new Vector3(-10,10,50));
        //camera.fov = 0.8;
        cameraRef.current = camera;



cameraRef.current = camera;
const directionalLight = new DirectionalLight('dir01', new Vector3(0, -1, 0), scene); // Direction: from top-right-back down to center
directionalLight.intensity = 2.5; // Stronger for sunset effect
directionalLight.diffuse = new Color3(1, 1, 1); // Deep, intense orange color (R=1, G=0.4, B=0)
//directionalLight.specular = new Color3(0.5, 0.5, 0.5); // Very little specular highlight, and tinted orange to match. This is important for realism.

// Directional Light (Sunset)
const directionalLight2 = new DirectionalLight('dir01', new Vector3(0, 0, -1), scene); // Direction: from top-right-back down to center
directionalLight2.intensity = 2.5; // Stronger for sunset effect
directionalLight2.diffuse = new Color3.FromHexString("#c2b080"); // Deep, intense orange color (R=1, G=0.4, B=0)
directionalLight2.specular = new Color3(1, 0.4, 0.05); // Very little specular highlight, and tinted orange to match. This is important for realism.


var skybox = MeshBuilder.CreateBox('skyBox', { size: 700.0 }, scene);
skybox.isPickable = false;
skybox.position.y = -1;
var skyboxMaterial = new StandardMaterial('skyBox', scene);
skyboxMaterial.backFaceCulling = false;
skyboxMaterial.reflectionTexture = new CubeTexture.CreateFromPrefilteredData('./textures/snow_field_puresky_16k.env', scene);
skyboxMaterial.reflectionTexture.gammaSpace = false;
skyboxMaterial.reflectionTexture.coordinatesMode = Texture.SKYBOX_MODE;
skyboxMaterial.disableLighting = false;
skybox.material = skyboxMaterial;
scene.environmentTexture = skyboxMaterial.reflectionTexture;


        // Load the GLB model
        SceneLoader.LoadAssetContainer(
            process.env.PUBLIC_URL + '/edoras_compressed.glb', // Path to your GLB file
            '', // Base URL (optional, usually empty)
            scene, // The scene to load into
            (container) => {
                // Success callback
                container.addAllToScene();

                container.rootNodes.forEach(rootNode => {
                    rootNode.position.y -= 5;
                    rootNode.position.x += 20;
                });


                container.materials.forEach(material => {

  if (material.name === 'Roof') { // Check if the material name matches
    // Convert the hex color to a Babylon.js Color3
    const hexColor = "#9C9C9C";
    const color = Color3.FromHexString(hexColor);
    
    // Check if the material has the _albedoColor property and set it if it exists
    if (material.hasOwnProperty('_emissiveColor')) { // Using hasOwnProperty for safety
    material._emissiveColor = color;
    }   
}
else if (material.name === 'Rock 1' || material.name === 'Rock 2') { // Check if the material name matches
    // Convert the hex color to a Babylon.js Color3
    const hexColor = "#535353";
    const color = Color3.FromHexString(hexColor);
    
    // Check if the material has the _albedoColor property and set it if it exists
    if (material.hasOwnProperty('_emissiveColor')) { // Using hasOwnProperty for safety
    material._emissiveColor = color;
    }   
}
else if (material.name === 'Wall') { // Check if the material name matches
    // Convert the hex color to a Babylon.js Color3
    const hexColor = "#614F4F";
    const color = Color3.FromHexString(hexColor);
    
    // Check if the material has the _albedoColor property and set it if it exists
    if (material.hasOwnProperty('_emissiveColor')) { // Using hasOwnProperty for safety
    material._emissiveColor = color;
    }   }

    else if (material.name === 'Wood 1') { // Check if the material name matches
      // Convert the hex color to a Babylon.js Color3
      const hexColor = "#9A9999";
      const color = Color3.FromHexString(hexColor);
      
      // Check if the material has the _albedoColor property and set it if it exists
      if (material.hasOwnProperty('_emissiveColor')) { // Using hasOwnProperty for safety
      material._emissiveColor = color;
      }   }
  });

                setIsLoading(false);
            },
            (event) => {
                // Progress callback
                if (event.total === 0) {
                    //Total size not provided
                    const estimatedTotal = 12.4 * 1024 * 1024; // 5MB example
                    const percentLoaded = Math.round(Math.min((event.loaded / estimatedTotal) * 100, 100));
                    setLoadingProgress(percentLoaded);
                    //console.log('Loading Progress (Estimated):', percentLoaded + '%');
                } else {
                    const percentLoaded = Math.round((event.loaded / event.total) * 100);
                    setLoadingProgress(percentLoaded);
                    //console.log('Loading Progress:', percentLoaded + '%');
                }

            },
            (scene, message, exception) => {
                // Error callback
                console.error('Error loading GLB: ', message, exception);
                setIsLoading(false);
            },
            '.glb'
        );

        engine.runRenderLoop(() => {
            scene.render();
        });

        const resize = () => {
            setIsMobile(window.innerWidth <= 768);
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            engine.resize();
        };

        window.addEventListener('resize', resize);

        resize();

        // Disable default camera behaviors
        camera.inputs.clear();


        // Custom camera controls (drag to rotate/pan)
        let lastX = 0;
        let lastY = 0;
        let isDragging = false;

        canvas.addEventListener('pointerdown', (event) => {
            isDragging = true;
            lastX = event.clientX;
            lastY = event.clientY;

            // Prevent default behavior to avoid conflicts
            event.preventDefault();
        });

        canvas.addEventListener('pointerup', (event) => {
            isDragging = false;
            event.preventDefault();
        });

        canvas.addEventListener('pointerout', (event) => { //Optional: stop dragging when mouse leaves canvas
            isDragging = false;
            event.preventDefault();
        });

        canvas.addEventListener('pointermove', (event) => {
            if (!isDragging) return;

            const deltaX = (event.clientX - lastX) * 0.005; // Adjust sensitivity as needed
            const deltaY = (event.clientY - lastY) * 0.005;

            camera.alpha -= deltaX;
            camera.beta -= deltaY;
            // Clamp alpha and beta values to defined limits
            camera.alpha = Math.max(minAlpha, Math.min(maxAlpha, camera.alpha));
            camera.beta = Math.max(minBeta, Math.min(maxBeta, camera.beta));
            console.log(camera.alpha + " " + camera.beta);


            lastX = event.clientX;
            lastY = event.clientY;

            event.preventDefault(); //Prevent Default

        });


        return () => {
            scene.dispose();
            engine.dispose();
            window.removeEventListener('resize', resize);
        };
    }, []);

     const phoneTouch = () => {
        if ('ontouchstart' in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0) {
        number++; // Increment the number if it's a touchscreen
        handleScroll(0);
        } 
        };

    const handleClose = () => {
        // Simulate back button behavior
        window.history.back();
    };
return (
      <div className="app-container" onClick={phoneTouch}>
   {isLoading && (
   <div className="loader-container">
      <div className="close-button" onClick={handleClose}>X</div>
      <div className="loader">
         <div>
            <svg fill="#404040" height="215px" width="200px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512" xmlSpace="preserve" stroke="#404040">
               <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
               <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" stroke="#e0c39a" strokeWidth="33.792">
                  <g transform="translate(1)">
                     <g>
                        <g>
                           <path d="M319.839,316.587c-6.277-5.65-14.862-8.051-23.04-6.216V85.333c0-0.853,0-2.56-0.853-3.413l-34.133-76.8 c-0.853-3.413-4.267-5.12-7.68-5.12s-6.827,1.707-7.68,5.12l-34.133,76.8c-0.853,0.853-0.853,2.56-0.853,3.413v224.478 c-7.523-1.218-15.588,1.03-21.333,6.776c-5.12,5.12-8.533,12.8-7.68,20.48c0,7.68,4.267,15.36,11.093,19.627 c10.636,7.091,22.481,12.36,34.987,15.487v88.941c-9.536,1.676-17.067,10.138-17.067,19.306v11.093 c0,11.093,9.387,20.48,20.48,20.48h44.373c11.093,0,20.48-9.387,21.333-19.627V481.28c0-10.227-7.982-18.984-17.92-20.293 v-88.416c13.231-3.136,25.883-8.779,37.547-16.731c5.973-4.267,9.387-11.093,10.24-18.773 C328.372,329.387,325.812,321.707,319.839,316.587z M254.132,29.013l25.6,58.027v231.253c-3.975,2.208-8.181,3.726-12.614,4.681 c-3.358,0.694-6.83,1.112-10.44,1.244c-0.102,0.004-0.204,0.008-0.306,0.011c-0.741,0.024-1.488,0.038-2.241,0.038 c-8.256,0-17.305-2.399-24.84-5.646c-0.255-0.126-0.507-0.259-0.76-0.389V87.04L254.132,29.013z M280.585,491.52 c0,1.707-1.707,3.413-3.413,3.413h-45.227c-1.707,0-3.413-1.707-3.413-2.56V481.28c0-1.707,1.707-3.413,3.413-3.413v-0.853h1.085 c1.169,0.55,2.525,0.853,4.035,0.853h34.133c1.51,0,2.865-0.304,4.035-0.853h1.939c1.707,0,3.413,1.707,3.413,3.413V491.52z M262.665,375.467V460.8h-17.067v-85.333H262.665z M307.892,342.187c-15.36,10.24-34.133,16.213-52.907,16.213h-0.853 c-18.773,0-35.84-5.973-51.2-15.36c-2.56-1.707-4.267-4.267-4.267-6.827c0-1.707,0-4.267,2.56-6.827 c1.707-1.707,4.267-2.56,5.973-2.56s3.413,0,5.12,1.707c11.947,8.533,26.453,12.8,41.813,12.8c0.977,0,1.948-0.022,2.916-0.057 c0.119-0.005,0.237-0.012,0.356-0.017c6.699-0.272,13.189-1.381,19.469-3.33c7.506-2.245,14.681-5.486,21.632-9.396 c3.413-2.56,7.68-1.707,10.24,0.853c1.707,1.707,2.56,4.267,2.56,6.827C311.305,337.92,310.452,340.48,307.892,342.187z"></path>
                           <path d="M254.132,290.133c5.12,0,8.533-3.413,8.533-8.533V104.96c0-5.12-3.413-8.533-8.533-8.533s-8.533,3.413-8.533,8.533V281.6 C245.599,286.72,249.012,290.133,254.132,290.133z"></path>
                        </g>
                     </g>
                  </g>
               </g>
               <g id="SVGRepo_iconCarrier">
                  <g transform="translate(1)">
                     <g>
                        <g>
                           <path d="M319.839,316.587c-6.277-5.65-14.862-8.051-23.04-6.216V85.333c0-0.853,0-2.56-0.853-3.413l-34.133-76.8 c-0.853-3.413-4.267-5.12-7.68-5.12s-6.827,1.707-7.68,5.12l-34.133,76.8c-0.853,0.853-0.853,2.56-0.853,3.413v224.478 c-7.523-1.218-15.588,1.03-21.333,6.776c-5.12,5.12-8.533,12.8-7.68,20.48c0,7.68,4.267,15.36,11.093,19.627 c10.636,7.091,22.481,12.36,34.987,15.487v88.941c-9.536,1.676-17.067,10.138-17.067,19.306v11.093 c0,11.093,9.387,20.48,20.48,20.48h44.373c11.093,0,20.48-9.387,21.333-19.627V481.28c0-10.227-7.982-18.984-17.92-20.293 v-88.416c13.231-3.136,25.883-8.779,37.547-16.731c5.973-4.267,9.387-11.093,10.24-18.773 C328.372,329.387,325.812,321.707,319.839,316.587z M254.132,29.013l25.6,58.027v231.253c-3.975,2.208-8.181,3.726-12.614,4.681 c-3.358,0.694-6.83,1.112-10.44,1.244c-0.102,0.004-0.204,0.008-0.306,0.011c-0.741,0.024-1.488,0.038-2.241,0.038 c-8.256,0-17.305-2.399-24.84-5.646c-0.255-0.126-0.507-0.259-0.76-0.389V87.04L254.132,29.013z M280.585,491.52 c0,1.707-1.707,3.413-3.413,3.413h-45.227c-1.707,0-3.413-1.707-3.413-2.56V481.28c0-1.707,1.707-3.413,3.413-3.413v-0.853h1.085 c1.169,0.55,2.525,0.853,4.035,0.853h34.133c1.51,0,2.865-0.304,4.035-0.853h1.939c1.707,0,3.413,1.707,3.413,3.413V491.52z M262.665,375.467V460.8h-17.067v-85.333H262.665z M307.892,342.187c-15.36,10.24-34.133,16.213-52.907,16.213h-0.853 c-18.773,0-35.84-5.973-51.2-15.36c-2.56-1.707-4.267-4.267-4.267-6.827c0-1.707,0-4.267,2.56-6.827 c1.707-1.707,4.267-2.56,5.973-2.56s3.413,0,5.12,1.707c11.947,8.533,26.453,12.8,41.813,12.8c0.977,0,1.948-0.022,2.916-0.057 c0.119-0.005,0.237-0.012,0.356-0.017c6.699-0.272,13.189-1.381,19.469-3.33c7.506-2.245,14.681-5.486,21.632-9.396 c3.413-2.56,7.68-1.707,10.24,0.853c1.707,1.707,2.56,4.267,2.56,6.827C311.305,337.92,310.452,340.48,307.892,342.187z"></path>
                           <path d="M254.132,290.133c5.12,0,8.533-3.413,8.533-8.533V104.96c0-5.12-3.413-8.533-8.533-8.533s-8.533,3.413-8.533,8.533V281.6 C245.599,286.72,249.012,290.133,254.132,290.133z"></path>
                        </g>
                     </g>
                  </g>
               </g>
            </svg>
         </div>
         <p className="load">{loadingProgress}%</p>
      </div>
   </div>
   )}
   {textBox1Visible && <div className="buttonContainerStyle">
    <button style={buttonStyle}>
      Project 1
      <div className="overlay">
        <img src="../gif/boruju.gif" alt="Button 1 GIF"/>
        <ul class="content-skills">
                  <li>Art Portfolio Site</li>
                  <li>Angular</li>
                  <li>Typescript</li>
                  <li>HTML5</li>
                  <li>CSS3</li>
                  <li>S3</li>
                  <li>Cloudfront</li>
               </ul>
      </div>
    </button>
    <button style={buttonStyle}>
      Project 2
      <div className="overlay">
        <img src="../gif/word.gif" alt="Button 2 GIF"/>
        <ul class="content-skills">
                <li>Bible Verse Suggestion Site</li>
                  <li>Java</li>
                  <li>Springboot</li>
                  <li>IBM watsonx.ai</li>
                  <li>Angular</li>
                  <li>HTML5</li>
                  <li>CSS3</li>
                  <li>EC2</li>
                  <li>S3</li>
                  <li>Cloudfront</li>
                  <li>RDS</li>
                  <li>Putty</li>
                  <li>WinSCP</li>
               </ul>
      </div>
    </button>
    <button style={buttonStyle}>
      Project 3
      <div className="overlay">
        <img className="img3" src="../gif/blender.gif" alt="Button 3 GIF"/>
        <ul class="content-skills">
                 <li>3D Models Viewer Site</li>
                  <li>React</li>
                  <li>HTML5</li>
                  <li>CSS3</li>
                  <li>Blender</li>
                  <li>Babylonjs</li>
                  <li>S3</li>
                  <li>Cloudfront</li>
               </ul>
      </div>
    </button>
    <button style={buttonStyle}>
      Project 4
      <div className="overlay">
        <img className="img4" src="../gif/wings.gif" alt="Button 4 GIF"/>
        <ul class="content-skills">
                <li>Choose You Own Adventure Game</li>
                  <li>Python 3</li>
                  <li>PyGame</li>
                  <li>Canva</li>
               </ul>
      </div>
    </button>
  </div>}

  {textBox2Visible && (
   <div className="text-box top-left">
      <div class="info-header">Code:</div>
      <div class="box-text">All my code and project details 
        can be found on my 
        <a
        href="https://github.com/HongVoDev?tab=repositories" 
        target="_blank"> GitHub</a>
      </div>
   </div>
   )}
   
   <canvas id="canv" ref={canvasRef} className="babylon-canvas">
    
   </canvas>
   <div className="close-button" onClick={handleClose}>X</div>
    
</div>
    );
}

export default Rohan;
