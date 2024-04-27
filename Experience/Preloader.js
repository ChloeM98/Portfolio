import {EventEmitter} from "events";
import Experience from "./Experience";
import GSAP from "gsap";

export default class Preloader extends EventEmitter{
    constructor(){
        super();

        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.sizes = this.experience.sizes;
        this.resources = this.experience.resources;
        this.camera = this.experience.camera;
        this.world = this.experience.world;
        this.device = this.sizes.device;

        this.sizes.on("switchdevice", (device) => {
            this.device = device;
        })
        

        this.world.on("worldready", () => {
            this.setAssets();
            this.playIntro();
        });
    }

    setAssets(){
        this.room = this.experience.world.room.actualRoom;
        this.roomChildren = this.experience.world.room.roomChildren;
    }

    firstIntro(){
        return new Promise((resolve) => {
            this.timeline1 = new GSAP.timeline();
            this.timeline1.to(".preloader", {
                opacity: 0,
                onComplete: ()=>{
                    document.querySelector(".preloader").classList.add("hidden");
                },
            });
        });
        
    }

    secondIntro(){
        this.timeline = new GSAP.timeline();

        this.timeline.to(this.roomChildren.walls.scale, {
            x: 1,
            y: 1,
            z: 1,
            ease: "back.out(2.5)",
            duration: 0.7,
        }, "same1").to(this.roomChildren.window.scale, {
            x: 1,
            y: 1,
            z: 1,
            ease: "back.out(2.5)",
            duration: 0.7,
        }, "same1").to(this.roomChildren.floor.scale, {
            x: 1,
            y: 1,
            z: 1,
            ease: "back.out(2.5)",
            duration: 0.7,
        }, "same1").to(this.roomChildren.rug.scale, {
            x: 1,
            y: 1,
            z: 1,
            ease: "back.out(2.5)",
            duration: 0.7,
        }, "same").to(this.roomChildren.curtain.scale, {
            x: 1,
            y: 1,
            z: 1,
            ease: "back.out(2.5)",
            duration: 0.7,
        }, "same").to(this.roomChildren.curtain2.scale, {
            x: 1,
            y: 1,
            z: 1,
            ease: "back.out(2.5)",
            duration: 0.7,
        }, "same").to(this.roomChildren.curtainholder.scale, {
            x: 0.036,
            y: 0.036,
            z: 0.036,
            ease: "back.out(2.5)",
            duration: 0.7,
        }, "same").to(this.roomChildren.curtainholder2.scale, {
            x: 0.036,
            y: 0.036,
            z: 0.036,
            ease: "back.out(2.5)",
            duration: 0.7,
        }, "same").to(this.roomChildren.curtainrod.scale, {
            x: 0.037,
            y: 0.037,
            z: 0.037,
            ease: "back.out(2.5)",
            duration: 0.7,
        }, "same").to(this.roomChildren.etagere1.scale, {
            x: 0.195,
            y: 0.016,
            z: 0.78,
            ease: "back.out(2.5)",
            duration: 0.7,
        }, "same").to(this.roomChildren.etagere2.scale, {
            x: 0.195,
            y: 0.016,
            z: 0.78,
            ease: "back.out(2.5)",
            duration: 0.7,
        }, "same").to(this.roomChildren.neon.scale, {
            x: 0.036,
            y: 0.579,
            z: 0.035,
            ease: "back.out(2.5)",
            duration: 0.7,
        }, "same").to(this.roomChildren.biblioteque.scale, {
            x: 0.758,
            y: 0.474,
            z: 0.351,
            ease: "back.out(2.5)",
            duration: 0.7,
        }, "same").to(this.roomChildren.bureau.scale, {
            x: 0.889,
            y: 0.889,
            z: 0.889,
            ease: "back.out(2.5)",
            duration: 0.7,
        }, "same").to(this.roomChildren.bureau2.scale, {
            x: 0.889,
            y: 0.889,
            z: 0.889,
            ease: "back.out(2.5)",
            duration: 0.7,
        }, "same").to(this.roomChildren.chaise.scale, {
            x: 0.186,
            y: 0.186,
            z: 0.211,
            ease: "back.out(2.5)",
            duration: 0.7,
        }, "same").to(this.roomChildren.table2.scale, {
            x: 0.91,
            y: 0.91,
            z: 0.91,
            ease: "back.out(2.5)",
            duration: 0.7,
        }, "same").to(this.roomChildren.pot.scale, {
            x: 0.129,
            y: 0.097,
            z: 0.129,
            ease: "back.out(2.5)",
            duration: 0.7,
        }, "same2").to(this.roomChildren.abatjour.scale, {
            x: 0.043,
            y: -0.045,
            z: 0.043,
            ease: "back.out(2.5)",
            duration: 0.7,
        }, "same2").to(this.roomChildren.lampe.scale, {
            x: 0.107,
            y: 0.017,
            z: 0.107,
            ease: "back.out(2.5)",
            duration: 0.7,
        }, "same2").to(this.roomChildren.ordi.scale, {
            x: 0.138,
            y: 0.011,
            z: -0.183,
            ease: "back.out(2.5)",
            duration: 0.7,
        }, "same2").to(this.roomChildren.ecransupport.scale, {
            x: 0.122,
            y: 0.009,
            z: -0.181,
            ease: "back.out(2.5)",
            duration: 0.7,
        }, "same2").to(this.roomChildren.ecran.scale, {
            x: 0.126,
            y: 0.01,
            z: 0.191,
            ease: "back.out(2.5)",
            duration: 0.7,
        }, "same2").to(this.roomChildren.souris.scale, {
            x: 0.035,
            y: 0.035,
            z: 0.035,
            ease: "back.out(2.5)",
            duration: 0.7,
        }, "same2").to(this.roomChildren.chouetteefrei.scale, {
            x: 0.029,
            y: 0.037,
            z: 0.037,
            ease: "back.out(2.5)",
            duration: 0.7,
        }, "same2").to(this.roomChildren.badge.scale, {
            x: 0.024,
            y: 0.039,
            z: 0.039,
            ease: "back.out(2.5)",
            duration: 0.7,
        }, "same2").to(this.roomChildren.casquette.scale, {
            x: 0.098,
            y: 0.113,
            z: 0.113,
            ease: "back.out(2.5)",
            duration: 0.7,
        }, "same2").to(this.roomChildren.clap.scale, {
            x: 0.018,
            y: 0.154,
            z: 0.169,
            ease: "back.out(2.5)",
            duration: 0.7,
        }, "same2").to(this.roomChildren.lampealave.scale, {
            x: 1,
            y: 1,
            z: 1,
            ease: "back.out(2.5)",
            duration: 0.7,
        }, "same2").to(this.roomChildren.lavalampglass.scale, {
            x: 1,
            y: 1,
            z: 1,
            ease: "back.out(2.5)",
            duration: 0.7,
        }, "same2").to(this.roomChildren.veste.scale, {
            x: 0.268,
            y: 0.218,
            z: 0.194,
            ease: "back.out(2.5)",
            duration: 0.7,
        }, "same2").to(this.roomChildren.portemanteau.scale, {
            x: 0.024,
            y: 0.024,
            z: 0.024,
            ease: "back.out(2.5)",
            duration: 0.7,
        }, "same2").to(this.roomChildren.affiche1.scale, {
            x: 0.149,
            y: 0.269,
            z: 0.21,
            ease: "back.out(2.5)",
            duration: 0.7,
        }, "same2").to(this.roomChildren.affiche2.scale, {
            x: 0.149,
            y: 0.269,
            z: 0.21,
            ease: "back.out(2.5)",
            duration: 0.7,
        }, "same2").to(this.roomChildren.tableaudiplome.scale, {
            x: 0.164,
            y: 0.120,
            z: 0.026,
            ease: "back.out(2.5)",
            duration: 0.7,
        }, "same2").to(this.roomChildren.livres.scale, {
            x: 0.015,
            y: 0.119,
            z: 0.096,
            ease: "back.out(2.5)",
            duration: 0.7,
        }, "same2").to(this.roomChildren.appareilphoto.scale, {
            x: 0.038,
            y: 0.045,
            z: 0.075,
            ease: "back.out(2.5)",
            duration: 0.7,
        }, "same2").to(this.roomChildren.baguettes.scale, {
            x: 0.016,
            y: 0.193,
            z: 0.016,
            ease: "back.out(2.5)",
            duration: 0.7,
        }, "same2").to(this.roomChildren.baguettes2.scale, {
            x: 0.016,
            y: 0.193,
            z: 0.016,
            ease: "back.out(2.5)",
            duration: 0.7,
        }, "same2").to(this.roomChildren.medaillechamois.scale, {
            x: 0.025,
            y: 0.004,
            z: 0.025,
            ease: "back.out(2.5)",
            duration: 0.7,
        }, "same2").to(this.roomChildren.medaillefleche.scale, {
            x: 0.025,
            y: 0.003,
            z: 0.025,
            ease: "back.out(2.5)",
            duration: 0.7,
        }, "same2").to(this.roomChildren.medailleor.scale, {
            x: 0.009,
            y: 0.002,
            z: 0.01,
            ease: "back.out(2.5)",
            duration: 0.7,
        }, "same2").to(this.roomChildren.aquarium.scale, {
            x: 1,
            y: 1,
            z: 1,
            ease: "back.out(2.5)",
            duration: 0.7,
        }, "same2").to(this.roomChildren.enceinte.scale, {
            x: 0.029,
            y: 0.134,
            z: 0.029,
            ease: "back.out(2.5)",
            duration: 0.7,
        }, "same2").to(this.roomChildren.telephone.scale, {
            x: 0.042,
            y: 0.075,
            z: 0.01,
            ease: "back.out(2.5)",
            duration: 0.7,
        }, "same2").to(this.roomChildren.oculus.scale, {
            x: 0.057,
            y: 0.048,
            z: 0.057,
            ease: "back.out(2.5)",
            duration: 0.7,
        }, "same2").to(this.roomChildren.manette1.scale, {
            x: 0.052,
            y: 0.052,
            z: 0.052,
            ease: "back.out(2.5)",
            duration: 0.7,
        }, "same2").to(this.roomChildren.manette2.scale, {
            x: 0.052,
            y: 0.052,
            z: 0.052,
            ease: "back.out(2.5)",
            duration: 0.7,
        }, "same2");
    }

    playIntro(){
        this.firstIntro();
        this.secondIntro();
    }

}