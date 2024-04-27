import * as THREE from "three";
import Experience from "../Experience.js";
import GSAP from "gsap";
import { PointLightHelper, RectAreaLight } from "three";
import { RectAreaLightHelper } from 'three/examples/jsm/helpers/RectAreaLightHelper.js';

export default class Room {
    constructor() {
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.resources = this.experience.resources;
        this.time = this.experience.time;
        this.room = this.resources.items.room;
        this.actualRoom = this.room.scene;
        this.roomChildren = {}

        this.lerp = {
            current: 0,
            target: 0,
            ease: 0.1, //Smoothness
        };
        
        this.setModel();
        //this.setPointsOfLight();
        this.setAnimation();
        this.onMouseMove();
        
        //control + shift + i : console web
    }

    setModel(){
        //SHADOWS initialisation on each objects
        this.actualRoom.children.forEach(child => {
            child.castShadow = true;
            child.receiveShadow = true;

            if(child instanceof THREE.Group){
                child.children.forEach((groupchild) =>{
                    groupchild.castShadow = true;
                    groupchild.receiveShadow = true;
                });
            }

            //Apply transparent material
            if(child.name === "Aquarium"){
                child.material = new THREE.MeshPhysicalMaterial();
                child.material.roughness = 0;
                child.material.color.set(0x4d94d9);
                child.material.ior = 3;
                child.material.transparent = true;
                //child.material.transmission = 1;
                child.material.opacity = 0.5;
            }

            if(child.name === "LavaLampGlass"){
                child.material = new THREE.MeshPhysicalMaterial();
                child.material.roughness = 0;
                child.material.color.set(0x4a0fd2);
                child.material.ior = 3;
                child.material.transparent = true;
                //child.material.transmission = 1;
                child.material.opacity = 0.5;
            }

            /*
            if(child.name === "window"){
                child.material = new THREE.MeshPhysicalMaterial();
                child.material.roughness = 0;
                child.material.color.set(0x4a0fd2);
                child.material.ior = 3;
                child.material.transparent = true;
                //child.material.transmission = 1;
                child.material.opacity = 0.5;
            }
            */

            if(child.name === "Curtain" || child.name === "Curtain2"){
                child.material = new THREE.MeshPhysicalMaterial();
                child.material.roughness = 0.5;
                child.material.color.set(0x7254b5);
                child.material.ior = 3;
                child.material.transparent = true;
                //child.material.transmission = 1;
                child.material.opacity = 0.95;
            }

            //Apply Video Screen
            if(child.name === "Ecran"){
                child.material = new THREE.MeshBasicMaterial({
                    map: this.resources.items.screen,
                }); 
            }

            child.scale.set(0, 0, 0);
            
            this.roomChildren[child.name.toLowerCase()] = child;
            //7:13

        });

        this.setPointsOfLight();


        this.scene.add(this.actualRoom);
        //RESIZE THE ROOM
        this.actualRoom.scale.set(0.7,0.7,0.7); //0.7 desktop
        //Rotate the room (but i have it right)
        //this.actualRoom.rotation.y = Math.PI;
    }

    //PointLights At Night
    setPointsOfLight(){
        
        //Console Light
        const consoleLight_width = 0.5;
        const consoleLight_height = 1;
        const consoleLight_intensity = 0.5;
        const consoleLight = new THREE.RectAreaLight(
            0xD8AAFF,
            consoleLight_intensity,
            consoleLight_width,
            consoleLight_height
        );
        consoleLight.position.set(1.5,1.36901,0.06);
        consoleLight.rotation.x = Math.PI / 2;
        consoleLight.rotation.z = -Math.PI / 4;
        consoleLight.name = "consoleLight";
        this.actualRoom.add(consoleLight);
        this.roomChildren["consoleLight"] = consoleLight;

        //Neon Light
        const neonLight_width = 0.4;
        const neonLight_height = 0.9;
        const neonLight_intensity = 2;
        const neonLight = new THREE.RectAreaLight(
            0xAB3DFF,
            neonLight_intensity,
            neonLight_width,
            neonLight_height
        );
        neonLight.position.set(0.3,2.73291,-0.9);
        neonLight.rotation.x = -Math.PI / 2;
        neonLight.rotation.z = Math.PI / 3.9;
        neonLight.name = "neonLight";
        this.actualRoom.add(neonLight);
        this.roomChildren["neonLight"] = neonLight;


        //Neon 2 
        const neon2Light_width = 0.4;
        const neon2Light_height = 0.9;
        const neon2Light_intensity = 2;
        const neon2Light = new THREE.RectAreaLight(
            0xAB3DFF,
            neon2Light_intensity,
            neon2Light_width,
            neon2Light_height
        );
        neon2Light.position.set(0.3,2.73291,-0.9);
        neon2Light.rotation.x = Math.PI / 2;
        neon2Light.rotation.z = -Math.PI / 3.9;
        neon2Light.name = "neon2Light";
        this.actualRoom.add(neon2Light);
        this.roomChildren["neon2Light"] = neon2Light;

        //Desk Light
        const deskLight_width = 0.2;
        const deskLight_height = 0.2;
        const deskLight_intensity = 1.2;
        const deskLight = new THREE.RectAreaLight(
            0xffffff,
            deskLight_intensity,
            deskLight_width,
            deskLight_height
        );
        deskLight.position.set(-1.8,1.5 ,0.7);
        deskLight.rotation.x = -Math.PI / 3;
        deskLight.rotation.y = -Math.PI / 2.5;
        deskLight.rotation.z = Math.PI / 8;
        deskLight.name = "deskLight";
        this.actualRoom.add(deskLight);
        this.roomChildren["deskLight"] = deskLight;

        //Lava Light
        const lavaLight_width = 0.2;
        const lavaLight_height = 0.2;
        const lavaLight_intensity = 0.2;
        const lavaLight_distance = 5;
        const lavaLight = new THREE.PointLight(
            0x9463FF,
            lavaLight_intensity,
            lavaLight_distance, 
            1
        );
        lavaLight.position.set(-1.4,2.5 ,-0.25);
        lavaLight.rotation.x = Math.PI / 2;
        lavaLight.rotation.y = -Math.PI / 2;
        lavaLight.rotation.z = Math.PI / 6;
        lavaLight.name = "lavaLight";
        this.actualRoom.add(lavaLight);
        this.roomChildren["lavaLight"] = lavaLight;


    }

    setAnimation(){

        //POISSON
        this.mixer = new THREE.AnimationMixer(this.actualRoom);
        const clips = this.room.animations;
        const clip = THREE.AnimationClip.findByName( clips, 'PoissonAction' ); //Get animation by name
        this.swim = this.mixer.clipAction(clip);
        //console.log(this.room); //affiche toutes les animations
        this.swim.play();


    }

    onMouseMove(){
        window.addEventListener("mousemove", (e) => {
            this.rotation = ((e.clientX - window.innerWidth / 2)*2)/window.innerWidth; //For having [-1,1] values
            this.lerp.target = this.rotation * 0.1;
            
        });
    }


    resize(){

    }

    update(){

        this.lerp.current = GSAP.utils.interpolate(
            this.lerp.current,
            this.lerp.target,
            this.lerp.ease
        );

        this.actualRoom.rotation.y = this.lerp.current;

        this.mixer.update(this.time.delta * 0.0009);  //animation speed
    }

}