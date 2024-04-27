import * as THREE from "three";
import Experience from "../Experience.js";
import GSAP from "gsap";
import Renderer from "../Renderer.js";
import { InteractionManager } from 'three.interactive';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/dist/ScrollToPlugin';
import { TrackballControls } from 'three/addons/controls/TrackballControls.js';



export default class Interactions {
    constructor() {
        GSAP.registerPlugin(ScrollToPlugin);
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.sizes = this.experience.sizes;
        this.resources = this.experience.resources;
        this.camera = this.experience.camera;
        this.room = this.experience.world.room.actualRoom;

        this.container = document.createElement('div');
        this.container.setAttribute('id', 'container');
        document.body.appendChild(this.container);
        
        this.chloeTitle = document.getElementById("chloeTitle");

        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.container.appendChild(this.renderer.domElement);
        
        
        this.interactionManager = new InteractionManager(
            this.renderer,
            this.camera.orthographicCamera,
            this.renderer.domElement
        );
        this.userInteractions();
    }

 

    userInteractions(){
        
        this.room.children.forEach((child) => {
            if(child.name === "Veste"){
                this.veste = child;
            }
            if(child.name === "Biblioteque"){
                this.biblio = child;
            }
            if(child.name === "Bureau"){
                this.bureau = child;
            }
            if(child.name === "Bureau2"){
                this.bureau2 = child;
            }
           
        });
        
        this.veste.addEventListener('mouseover', (event) => {
            event.target.scale.set(0.318, 0.268, 0.244);
            document.body.style.cursor = 'pointer';
            
        });
        
        this.veste.addEventListener('mouseout', (event) => {
            event.target.scale.set(0.268, 0.218, 0.194);
            document.body.style.cursor = 'default';
        });

        this.biblio.addEventListener('mouseover', (event) => {
            event.target.scale.set(0.808, 0.474, 0.401);
            document.body.style.cursor = 'pointer';
            
        });
        
        this.biblio.addEventListener('mouseout', (event) => {
            event.target.scale.set(0.758, 0.474, 0.351);
            document.body.style.cursor = 'default';
        });

        this.bureau.addEventListener('mouseover', (event) => {
            event.target.scale.set(0.939, 0.939, 0.939);
            this.bureau2.scale.set(0.939, 0.939, 0.939);
            document.body.style.cursor = 'pointer';
            
        });
        
        this.bureau.addEventListener('mouseout', (event) => {
            event.target.scale.set(0.889, 0.889, 0.889);
            this.bureau2.scale.set(0.889, 0.889, 0.889);
            document.body.style.cursor = 'default';
        });
        
       
        this.chloeTitle.addEventListener('mouseover', (event) => {
            document.body.style.cursor = 'pointer';
            this.chloeTitle.style.fontSize = "66px";
            
        });

        this.chloeTitle.addEventListener('mouseout', (event) => {
            document.body.style.cursor = 'default';
            this.chloeTitle.style.fontSize = "64px";
        });

        document.body.addEventListener('click', function(element) {
            if (element.target.id === 'chloeTitle') {
                GSAP.to(window, {duration: 1, scrollTo:"#first-section-scroll"});
            }
        });
        
        
        addEventListener("click", ()=>{
            if(this.veste.scale.x === 0.318){
                GSAP.to(window, {duration: 1, scrollTo:"#third-section-scroll"});
            }
            else if(this.bureau.scale.x === 0.939){
                GSAP.to(window, {duration: 1, scrollTo:"#second-section-scroll"});
            }
            else if(this.biblio.scale.x === 0.808){
                GSAP.to(window, {duration: 1, scrollTo:"#forth-section-scroll"});
            }
        });
        
        
        this.interactionManager.add(this.veste);
        this.interactionManager.add(this.ecran);
        this.interactionManager.add(this.biblio);
        this.interactionManager.add(this.bureau);

        const animate = (time) => {
            requestAnimationFrame(animate);
          
            this.interactionManager.update();
          
            this.renderer.render(this.scene, this.camera.orthographicCamera);
        };
          
        animate();
    }

    resize(){

    }

    update(){
        this.interactionManager.update();
    }



}