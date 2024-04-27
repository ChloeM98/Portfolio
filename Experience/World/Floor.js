import * as THREE from "three";
import Experience from "../Experience.js";
import GSAP from "gsap";

export default class Floor {
    constructor() {
        this.experience = new Experience();
        this.scene = this.experience.scene;

        this.setFloor();
    }

    setFloor(){
        this.geometry = new THREE.PlaneGeometry(400, 400);
        this.material = new THREE.MeshStandardMaterial({
            color: 0xffffff,
            side: THREE.BackSide,
        });
        this.plane = new THREE.Mesh(this.geometry, this.material);
        this.scene.add(this.plane);
        this.plane.rotation.x = Math.PI/2;
        this.plane.position.y = -7;
        this.plane.receiveShadow = false;

    } 


    resize(){

    }

    update(){

    }

}