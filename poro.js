import * as THREE from './libs/three.js/r125/three.module.js'
import { FBXLoader } from './libs/three.js/r125/loaders/FBXLoader.js'
import { OrbitControls } from './libs/three.js/r125/controls/OrbitControls.js';

const dungeonAsset = './assets/Dungeon/Assets/';

let camera, scene, renderer, orbitControls, root, group;


let SHADOW_MAP_WIDTH = 2048, SHADOW_MAP_HEIGHT = 2048;


function main() 
{
    const canvas = document.getElementById("webglcanvas");

    createScene(canvas);
    
    update();
}

function loadFBX(urls){
    const loader = new FBXLoader();

    urls.forEach(url => {
        loader.load( url, function ( object ) {
            scene.add( object );
        } );
    });
}

function createScene(canvas) 
{    
    renderer = new THREE.WebGLRenderer( { canvas: canvas, antialias: true } );

    renderer.setSize(canvas.width, canvas.height);

    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    
    scene = new THREE.Scene();
    scene.background = new THREE.Color( 0xa0a0a0 );
    camera = new THREE.PerspectiveCamera( 45, canvas.width / canvas.height, 1, 4000 );
    camera.position.set(-15, 6, 30);
    scene.add(camera);

    orbitControls = new OrbitControls(camera, renderer.domElement);
        
    root = new THREE.Object3D;
    
    const hemiLight = new THREE.HemisphereLight( 0xffffff, 0x444444 );
    hemiLight.position.set( 0, 200, 0 );
    scene.add( hemiLight );

    const dirLight = new THREE.DirectionalLight( 0xffffff );
    dirLight.position.set( 0, 200, 100 );
    dirLight.castShadow = true;
    dirLight.shadow.camera.top = 180;
    dirLight.shadow.camera.bottom = - 100;
    dirLight.shadow.camera.left = - 120;
    dirLight.shadow.camera.right = 120;
    scene.add( dirLight );
    
    // ground
    const mesh = new THREE.Mesh( new THREE.PlaneGeometry( 2000, 2000 ), new THREE.MeshPhongMaterial( { color: 0x999999, depthWrite: false } ) );
    mesh.rotation.x = - Math.PI / 2;
    mesh.receiveShadow = true;
    scene.add( mesh );

    const grid = new THREE.GridHelper( 2000, 20, 0x000000, 0x000000 );
    grid.material.opacity = 0.2;
    grid.material.transparent = true;
    scene.add( grid );

    group = new THREE.Object3D;
    root.add(group);

    

    
    
    scene.add( root );
}

window.onload = () => {
    main()
    resize(); 
};

function resize()
{
    const canvas = document.getElementById("webglcanvas");

    canvas.width = document.body.clientWidth;
    canvas.height = document.body.clientHeight;

    camera.aspect = canvas.width / canvas.height;

    camera.updateProjectionMatrix();
    renderer.setSize(canvas.width, canvas.height);
}

function update() 
{
    requestAnimationFrame(function() { update(); });
    
    renderer.render( scene, camera );

    //animate();

    orbitControls.update();
}

function animate(){
    
}