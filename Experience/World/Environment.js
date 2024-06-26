import * as THREE from "three";
import Experience from "../Experience.js";
import GSAP  from "gsap";
import GUI from 'lil-gui'; 


export default class Environment {
    constructor() {
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.resources = this.experience.resources;

        //For light/color changes
        //this.gui = new GUI({ container: document.querySelector(".hero-main")}); 
        this.obj = {
            colorObj: {r: 0, g: 0, b: 0},
            intensity: 3,
        }


        this.setSunlight();
        //this.setGUI();
    }

    setGUI(){
        this.gui.addColor(this.obj, "colorObj").onChange(()=>{
            this.sunLight.color.copy(this.obj.colorObj);
            this.ambientLight.color.copy(this.obj.colorObj);
            console.log(this.obj.colorObj);
        });
        this.gui.add(this.obj, "intensity", 0, 10).onChange(()=>{
            this.sunLight.intensity = this.obj.intensity;
            this.ambientLight.intensity = this.obj.intensity;
        });
    }

    setSunlight(){
        //Main Light
        this.sunLight = new THREE.DirectionalLight("#ffffff", 3);
        this.sunLight.castShadow = true;
        this.sunLight.shadow.camera.far = 20;
        this.sunLight.shadow.mapSize.set(1024, 1024); //if too pixeladed, increase it
        this.sunLight.shadow.normalBias = 0.05;
        //Light & shadow explain : 3h16
        //Sun helper
        //const helper = new THREE.CameraHelper(this.sunLight.shadow.camera);
        //this.scene.add(helper);


        this.sunLight.position.set(-1.5, 7, 3);
        this.scene.add(this.sunLight);

        //Ambient Light
        this.ambientLight = new THREE.AmbientLight("#ffffff", 1);
        this.scene.add(this.ambientLight);

        
    }

    switchTheme(theme){
        if(theme === "dark"){
            GSAP.to(this.sunLight.color,{
                r: 0.07058823529411765, 
                g: 0.08235294117647059, 
                b: 0.23137254901960785,
            });
            GSAP.to(this.ambientLight.color,{
                r: 0.07058823529411765, 
                g: 0.08235294117647059, 
                b: 0.23137254901960785,
            });
            GSAP.to(this.sunLight, {
                intensity: 1.7,
            });
            GSAP.to(this.ambientLight, {
                intensity: 1,
            });
        } else {
            GSAP.to(this.sunLight.color,{
                r: 255/255,
                g: 255/255,
                b: 255/255,
            });
            GSAP.to(this.ambientLight.color,{
                r: 255/255,
                g: 255/255,
                b: 255/255,
            });
            GSAP.to(this.sunLight, {
                intensity: 2,
            });
            GSAP.to(this.ambientLight, {
                intensity: 1,
            });
        }
    }

    resize(){

    }

    update(){
        
    }

}