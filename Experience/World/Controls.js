import * as THREE from "three";
import Experience from "../Experience.js";
import GSAP from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger.js";
import ASScroll from "@ashthornton/asscroll";
import Renderer from "../Renderer.js";
import { InteractionManager } from 'three.interactive';
import { TrackballControls } from 'three/addons/controls/TrackballControls.js';


export default class Controls {
    constructor() {
        
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.sizes = this.experience.sizes;
        this.resources = this.experience.resources;
        this.time = this.experience.time;
        this.camera = this.experience.camera;
        this.room = this.experience.world.room.actualRoom;
        this.room.children.forEach((child) => {
            if(child.type === "RectAreaLight"){
                if(child.name === "consoleLight"){
                    this.consoleLight = child;
                }
                if(child.name === "neonLight"){
                    this.neonLight = child;
                }
                if(child.name === "neon2Light"){
                    this.neon2Light = child;
                }
                if(child.name === "deskLight"){
                    this.deskLight = child;
                }
            }
            if(child.type === "PointLight" && child.name === "lavaLight"){
                this.lavaLight = child;
            }
        });
        this.sunLight = this.experience.world.environment.sunLight;
        GSAP.registerPlugin(ScrollTrigger);

        this.setSmoothScroll();
        this.setScrollTrigger();
        //this.userInteractions();


    }

 
/*
    userInteractions(){
        const container = document.createElement('div');
        container.setAttribute('id', 'container');
        document.body.appendChild(container);

        const renderer = new THREE.WebGLRenderer();
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(window.innerWidth, window.innerHeight);
        container.appendChild(renderer.domElement);

        
        const interactionManager = new InteractionManager(
            renderer,
            this.camera.orthographicCamera,
            renderer.domElement
        );
        this.room.children.forEach((child) => {
            if(child.name === "Veste"){
                this.veste = child;
            }
            if(child.name === "Ecran"){
                this.ecran = child;
            }
            if(child.name === "EcranSupport"){
                this.ecranSupport = child;
            }
            if(child.name === "Ordi"){
                this.ordi = child;
            }
            if(child.name === "Aquarium"){
                this.aquarium = child;
            }
            if(child.name === "Chaise"){
                this.chaise = child;
            } 
        });
        
        this.veste.addEventListener('mousedown', (event) => {
            event.target.material.color.set(0xff0000);
            console.log("lalal");
        })
        
        
        
        this.veste.addEventListener('mouseover', (event) => {
            event.target.scale.set(0.318, 0.268, 0.244);
            document.body.style.cursor = 'pointer';
            
        });
        
        this.veste.addEventListener('mouseout', (event) => {
            event.target.scale.set(0.268, 0.218, 0.194);
            document.body.style.cursor = 'default';
        });

        this.ecran.addEventListener('mouseover', (event) => {
            event.target.scale.set(0.176, 0.06, 0.241);
            this.ecranSupport.scale.set(0.172, 0.059, 0.231);
            this.ordi.scale.set(0.188, 0.061, 0.233);
            document.body.style.cursor = 'pointer';
            
        });
       
        this.ecran.addEventListener('mouseout', (event) => {
            event.target.scale.set(0.126, 0.01, 0.191);
            this.ecranSupport.scale.set(0.122, 0.009, 0.181);
            this.ordi.scale.set(0.138, 0.011, 0.183);
            document.body.style.cursor = 'default';
            
        });

        addEventListener("click", ()=>{
            console.log(this.veste.scale.x);
            if(this.veste.scale.x === 0.318){
                console.log("lalal");
            }
        });
        
        
        interactionManager.add(this.veste);
        interactionManager.add(this.ecran);

        const animate = (time) => {
            requestAnimationFrame(animate);
          
            interactionManager.update();
          
            renderer.render(this.scene, this.camera.orthographicCamera);
        };
          
        animate();
    }
    */


    setupASScroll(){
        const asscroll = new ASScroll({
            disableRaf: true,
        });

        GSAP.ticker.add(asscroll.update);

        ScrollTrigger.defaults({
            scroller: asscroll.containerElement,
        });

        ScrollTrigger.scrollerProxy(asscroll.containerElement, {
            scrollTop(value){
                if(arguments.length){
                    asscroll.currentPos = value;
                    return;
                }
                return asscroll.currentPos;
            },
            getBoundingClientRect(){
                return {
                    top: 0,
                    left: 0,
                    width: window.innerWidth,
                    height: window.innerHeight
                };
            },
            fixedMarkers: true
        });

        asscroll.on("update", ScrollTrigger.update);
        ScrollTrigger.addEventListener("refresh", asscroll.resize);

        requestAnimationFrame(() => {
            asscroll.enable({
                newScrollElements: document.querySelectorAll(".gsap-marker-start, .gsap-marker-end, [asscroll]")
            });
        });
        return asscroll;
    }

    setSmoothScroll(){
        this.asscroll = this.setupASScroll();
    }
   
    setScrollTrigger(){

        ScrollTrigger.matchMedia({
            //Desktop Timeline
            "(min-width: 969px)": () => {

                //Resets
                this.room.scale.set(0.7, 0.7, 0.7);
                this.room.position.set(0,0,0);
                this.consoleLight.width = 0.5;
                this.consoleLight.height = 1;
                this.neonLight.width = 0.4;
                this.neonLight.height = 0.9;
                this.neon2Light.width = 0.4;
                this.neon2Light.height = 0.9;
                this.deskLight.width = 0.2;
                this.deskLight.height = 0.2;
                this.lavaLight.width = 0.2;
                this.lavaLight.height = 0.2;

                //First Section : Me --------------------------------------------
                this.firstMoveTimeline = new GSAP.timeline({
                    scrollTrigger:{
                        trigger: ".first-move",
                        start: "top top",
                        end: "bottom bottom",
                        scrub: 0.6,
                        invalidateOnRefresh: true,
                    },
                });
                //Room goes to right
                this.firstMoveTimeline.to(this.room.position, {
                    x: () => {
                        return this.sizes.width * 0.0014;
                    },
                });
                

                //Second Section : Work & Projects --------------------------------------------
                this.secondMoveTimeline = new GSAP.timeline({
                    scrollTrigger:{
                        trigger: ".second-move",
                        start: "top top",
                        end: "bottom bottom",
                        scrub: 0.6,
                        invalidateOnRefresh: true,
                    },
                });
                this.secondMoveTimeline.to(
                    this.room.position, 
                    {
                        x: () => {
                            return 2.5;
                        },
                        y: () => {
                            return -1;
                        },
                        z: () => {
                            return this.sizes.height * 0.0032;
                        },
                    }, 
                    "same"
                );
                this.secondMoveTimeline.to(
                    this.room.scale, 
                    {
                    x: 2.8,
                    y: 2.8, 
                    z: 2.8,
                    },
                    "same"
                ); 
                this.secondMoveTimeline.to(
                    this.room.rotation, 
                    {

                        x: () => {
                            return -Math.PI/20;
                        },

                    },
                    "same"
                );
                //Lights
                this.secondMoveTimeline.to(
                    this.consoleLight, 
                    {
                        width: 0.5 * 4, //same as room * room scale factor
                        height: 1 * 4,
                    },
                    "same"
                );
                this.secondMoveTimeline.to(
                    this.neonLight, 
                    {
                        width: 0.4 * 4, //same as room * room scale factor
                        height: 0.9 * 4,
                    },
                    "same"
                );
                this.secondMoveTimeline.to(
                    this.neon2Light, 
                    {
                        width: 0.4 * 4, //same as room * room scale factor
                        height: 0.9 * 4,
                    },
                    "same"
                );
                this.secondMoveTimeline.to(
                    this.deskLight, 
                    {
                        width: 0.2 * 4, //same as room * room scale factor
                        height: 0.2 * 4,
                    },
                    "same"
                );
                this.secondMoveTimeline.to(
                    this.lavaLight, 
                    {
                        width: 0.2 * 4, //same as room * room scale factor
                        height: 0.2 * 4,
                    },
                    "same"
                );
                //Sun Light
                this.secondMoveTimeline.to(
                    this.sunLight.position, 
                    {
                        x: () => {
                            return -2;
                        },
                        y: () => {
                            return 8;
                        },
                        z: () => {
                            return 3;
                        },
                    },
                    "same"
                );

                //Third Section : Asso --------------------------------------------
                this.thirdMoveTimeline = new GSAP.timeline({
                    scrollTrigger:{
                        trigger: ".third-move",
                        start: "top top",
                        end: "bottom bottom",
                        scrub: 0.6,
                        invalidateOnRefresh: true,
                    },
                });
                this.thirdMoveTimeline.to(
                    this.room.position, 
                    {
                        y: () => {
                            return -3;
                        },
                       
                    },
                    "same"
                );
                this.thirdMoveTimeline.to(
                    this.room.rotation, 
                    {
                        x: () => {
                            return -Math.PI/6;
                        },
                       

                    },
                    "same"
                );
                this.thirdMoveTimeline.to(
                    this.camera.orthographicCamera.rotation, 
                    {
                        y: () => {
                            return -Math.PI/5;
                        },
                       

                    },
                    "same"
                );
                //Sun Light
                this.thirdMoveTimeline.to(
                    this.sunLight.position, 
                    {
                        x: () => {
                            return -1;
                        },
                        y: () => {
                            return 4;
                        },
                        z: () => {
                            return 0;
                        },
                    },
                    "same"
                );

                //Forth Section : Bonus & Hobbies --------------------------------------------
                this.forthMoveTimeline = new GSAP.timeline({
                    scrollTrigger:{
                        trigger: ".forth-move",
                        start: "top top",
                        end: "bottom bottom",
                        scrub: 0.6,
                        invalidateOnRefresh: true,
                    },
                });
                this.forthMoveTimeline.to(
                    this.room.position, 
                    {
                        x: () => {
                            return 3.5;
                        },
                        y: () => {
                            return -5;
                        },
                        z: () => {
                            return this.sizes.height * 0.0042;
                        },
                       
                    },
                    "same"
                );
                this.forthMoveTimeline.to(
                    this.camera.orthographicCamera.rotation, 
                    {
                        x: () => {
                            return -Math.PI/3;
                        },
                        z: () => {
                            return -Math.PI/10;
                        },
                       

                    },
                    "same"
                );
                //Sun Light
                this.forthMoveTimeline.to(
                    this.sunLight.position, 
                    {
                        x: () => {
                            return -1;
                        },
                        y: () => {
                            return 2;
                        },
                        z: () => {
                            return 0;
                        },
                    },
                    "same"
                );

            },
            

            //Mobile Timeline -----------------------------------------------------------------------------------------------------------------------------------------
            "(max-width: 968px)": () => {

                //Resets
                this.room.scale.set(0.4, 0.4, 0.4);
                this.room.position.set(0,0,0);
                this.consoleLight.width = 0.5 * 0.57;//same as room * room scale factor
                this.consoleLight.height = 1 * 0.57;
                this.neonLight.width = 0.4 * 0.57;
                this.neonLight.height = 0.9 * 0.57;
                this.neon2Light.width = 0.4 * 0.57;
                this.neon2Light.height = 0.9 * 0.57;
                this.deskLight.width = 0.2 * 0.57;
                this.deskLight.height = 0.2 * 0.57;
                this.lavaLight.width = 0.2 * 0.57;
                this.lavaLight.height = 0.2 * 0.57;

               //First Section : Me ---------------------------------------
               this.firstMoveTimeline = new GSAP.timeline({
                scrollTrigger:{
                        trigger: ".first-move",
                        start: "top top",
                        end: "bottom bottom",
                        scrub: 0.6,
                        invalidateOnRefresh: true,
                    },
                });
                //Room zoom
                this.firstMoveTimeline.to(this.room.scale, {
                    x: 0.45,
                    y: 0.45,
                    z: 0.45,
                });

                //Second Section : Work & Projects --------------------------------------------
                this.secondMoveTimeline = new GSAP.timeline({
                    scrollTrigger:{
                        trigger: ".second-move",
                        start: "top top",
                        end: "bottom bottom",
                        scrub: 0.6,
                        invalidateOnRefresh: true,
                    },
                });
                this.secondMoveTimeline.to(
                    this.room.position, 
                    {
                        x: () => {
                            return 4.5;
                        },
                        y: () => {
                            return -1;
                        },
                        z: () => {
                            return this.sizes.height * 0.0032;
                        },
                    }, 
                    "same"
                );
                this.secondMoveTimeline.to(
                    this.room.scale, 
                    {
                    x: 2.8,
                    y: 2.8, 
                    z: 2.8,
                    },
                    "same"
                ); 
                this.secondMoveTimeline.to(
                    this.room.rotation, 
                    {

                        x: () => {
                            return -Math.PI/20;
                        },

                    },
                    "same"
                );
                //Lights
                this.secondMoveTimeline.to(
                    this.consoleLight, 
                    {
                        width: 0.5 * 4, //same as room * room scale factor
                        height: 1 * 4,
                    },
                    "same"
                );
                this.secondMoveTimeline.to(
                    this.neonLight, 
                    {
                        width: 0.4 * 4, //same as room * room scale factor
                        height: 0.9 * 4,
                    },
                    "same"
                );
                this.secondMoveTimeline.to(
                    this.neon2Light, 
                    {
                        width: 0.4 * 4, //same as room * room scale factor
                        height: 0.9 * 4,
                    },
                    "same"
                );
                this.secondMoveTimeline.to(
                    this.deskLight, 
                    {
                        width: 0.2 * 4, //same as room * room scale factor
                        height: 0.2 * 4,
                    },
                    "same"
                );
                this.secondMoveTimeline.to(
                    this.lavaLight, 
                    {
                        width: 0.2 * 4, //same as room * room scale factor
                        height: 0.2 * 4,
                    },
                    "same"
                );
                //Sun Light
                this.secondMoveTimeline.to(
                    this.sunLight.position, 
                    {
                        x: () => {
                            return -2;
                        },
                        y: () => {
                            return 8;
                        },
                        z: () => {
                            return 3;
                        },
                    },
                    "same"
                );
                
                //Third Section : Asso --------------------------------------------
                this.thirdMoveTimeline = new GSAP.timeline({
                    scrollTrigger:{
                        trigger: ".third-move",
                        start: "top top",
                        end: "bottom bottom",
                        scrub: 0.6,
                        invalidateOnRefresh: true,
                    },
                });
                this.thirdMoveTimeline.to(
                    this.room.position, 
                    {
                        y: () => {
                            return -3;
                        },
                       
                    },
                    "same"
                );
                this.thirdMoveTimeline.to(
                    this.room.rotation, 
                    {
                        x: () => {
                            return -Math.PI/6;
                        },
                       

                    },
                    "same"
                );
                this.thirdMoveTimeline.to(
                    this.camera.orthographicCamera.rotation, 
                    {
                        y: () => {
                            return -Math.PI/5;
                        },
                       

                    },
                    "same"
                );
                //Sun Light
                this.thirdMoveTimeline.to(
                    this.sunLight.position, 
                    {
                        x: () => {
                            return -1;
                        },
                        y: () => {
                            return 4;
                        },
                        z: () => {
                            return 0;
                        },
                    },
                    "same"
                );
                //Third Section : Asso --------------------------------------------
                this.thirdMoveTimeline = new GSAP.timeline({
                    scrollTrigger:{
                        trigger: ".third-move",
                        start: "top top",
                        end: "bottom bottom",
                        scrub: 0.6,
                        invalidateOnRefresh: true,
                    },
                });
                this.thirdMoveTimeline.to(
                    this.room.position, 
                    {
                        y: () => {
                            return -3;
                        },
                       
                    },
                    "same"
                );
                this.thirdMoveTimeline.to(
                    this.room.rotation, 
                    {
                        x: () => {
                            return -Math.PI/6;
                        },
                       

                    },
                    "same"
                );
                this.thirdMoveTimeline.to(
                    this.camera.orthographicCamera.rotation, 
                    {
                        y: () => {
                            return -Math.PI/5;
                        },
                       

                    },
                    "same"
                );
                //Sun Light
                this.thirdMoveTimeline.to(
                    this.sunLight.position, 
                    {
                        x: () => {
                            return -1;
                        },
                        y: () => {
                            return 4;
                        },
                        z: () => {
                            return 0;
                        },
                    },
                    "same"
                );

                //Forth Section : Bonus & Hobbies --------------------------------------------
                this.forthMoveTimeline = new GSAP.timeline({
                    scrollTrigger:{
                        trigger: ".forth-move",
                        start: "top top",
                        end: "bottom bottom",
                        scrub: 0.6,
                        invalidateOnRefresh: true,
                    },
                });
                this.forthMoveTimeline.to(
                    this.room.position, 
                    {
                        x: () => {
                            return 1;
                        },
                        y: () => {
                            return -5;
                        },
                        z: () => {
                            return this.sizes.height * 0.0032;
                        },
                       
                    },
                    "same"
                );
                this.forthMoveTimeline.to(
                    this.camera.orthographicCamera.rotation, 
                    {
                        x: () => {
                            return -Math.PI/3.1;
                        },
                        z: () => {
                            return -Math.PI/10;
                        },
                       

                    },
                    "same"
                );
                //Sun Light
                this.forthMoveTimeline.to(
                    this.sunLight.position, 
                    {
                        x: () => {
                            return -1;
                        },
                        y: () => {
                            return 2;
                        },
                        z: () => {
                            return 0;
                        },
                    },
                    "same"
                );

            },
            all: () => {

                //Progress Bar ---- 
                this.sections = document.querySelectorAll(".section");
                this.sections.forEach((section) => {
                    this.progressWrapper = section.querySelector(".progress-wrapper");
                    this.progressBar = section.querySelector(".progress-bar");

                    if(section.classList.contains("right")){
                        GSAP.to(section, {
                            borderTopLeftRadius: 10,
                            scrollTrigger: {
                                trigger: section, 
                                start: "top bottom", 
                                end: "top top", 
                                //markers: true,
                                scrub: 0.6,
                            },
                        });
                        GSAP.to(section, {
                            borderBottomLeftRadius: 700,
                            scrollTrigger: {
                                trigger: section, 
                                start: "bottom bottom", 
                                end: "bottom top", 
                                scrub: 0.6,
                            },
                        });
                    }else{
                        GSAP.to(section, {
                            borderTopRightRadius: 10,
                            scrollTrigger: {
                                trigger: section, 
                                start: "top bottom", 
                                end: "top top", 
                                scrub: 0.6,
                            },
                        });
                        GSAP.to(section, {
                            borderBottomRightRadius: 700,
                            scrollTrigger: {
                                trigger: section, 
                                start: "bottom bottom", 
                                end: "bottom top", 
                                scrub: 0.6,
                            },
                        });
                    }

                    GSAP.from(this.progressBar, {
                        scaleY: 0,
                        scrollTrigger: {
                            trigger: section, 
                            start: "top top",
                            end: "bottom bottom", 
                            scrub: 0.4,
                            pin: this.progressWrapper,
                            pinSpacing: false,
                        },
                    });

                });




            },
        });

 
    }
    

    resize(){

    }

    update(){

  
    }



}