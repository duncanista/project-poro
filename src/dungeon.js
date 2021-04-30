import * as THREE from '../libs/three.js/r125/three.module.js'
import { FBXLoader } from '../libs/three.js/r125/loaders/FBXLoader.js'
import { GLTFLoader } from '../libs/three.js/r125/loaders/GLTFLoader.js'
import { PointerLockControls } from '../libs/three.js/r125/controls/PointerLockControls.js';

const dungeonAsset = '../assets/Dungeon/Assets/';

let camera, scene, renderer, root, group;
let raycaster;
let objects = [];

let blocker, instructions, controls; 
let moveForward = false;
let moveBackward = false;
let moveLeft = false;
let moveRight = false;
let canJump = false;
let prevTime = Date.now();
let velocity, direction;

let currentMap;

let SHADOW_MAP_WIDTH = 2048, SHADOW_MAP_HEIGHT = 2048;

const initPointerLock = () =>{
  blocker = document.getElementById( 'blocker' );
  instructions = document.getElementById( 'instructions' );

  controls = new PointerLockControls( camera, document.body );

  controls.addEventListener( 'lock', function () {
      instructions.style.display = 'none';
      blocker.style.display = 'none';
  } );
  
  controls.addEventListener( 'unlock', function () {
      instructions.style.display = '';
  } );

  instructions.addEventListener( 'click', function () {
      controls.lock();
  }, false );

  scene.add( controls.getObject() );
}

function main() 
{
    const canvas = document.getElementById("webgl");

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

    velocity = new THREE.Vector3();
    direction = new THREE.Vector3();

    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    
    scene = new THREE.Scene();
    scene.background = new THREE.Color( 0xa0a0a0 );
    camera = new THREE.PerspectiveCamera(100, canvas.width / canvas.height, 1, 4000 );
    camera.position.set(0, 0, 0);
        
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

    document.addEventListener( 'keydown', onKeyDown, false );
    document.addEventListener( 'keyup', onKeyUp, false );

    raycaster = new THREE.Raycaster( new THREE.Vector3(), new THREE.Vector3( 0, - 1, 0 ), 0, 15 );
    
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

    const loader = new GLTFLoader();
    loader.load('../assets/Dungeon/Scenes/test_dungeon_scene.glb', (gltf) => {
      currentMap = gltf;
      let size = 30;
      currentMap.scene.scale.set(size, size, size)
      scene.add(currentMap.scene);
      let allObjects = gltf.scene.children[0].children;
      allObjects.map(object => objects.push(object));
    });

    scene.add( root );

    initPointerLock();
}

window.onload = () => {
    main()
    resize(); 
};

function resize()
{
    const canvas = document.getElementById("webgl");

    canvas.width = document.body.clientWidth;
    canvas.height = document.body.clientHeight;

    camera.aspect = canvas.width / canvas.height;

    camera.updateProjectionMatrix();
    renderer.setSize(canvas.width, canvas.height);
}

function update() 
{
    requestAnimationFrame(function() { update(); });

    if ( controls.isLocked === true ) 
    {
        raycaster.ray.origin.copy( controls.getObject().position );
        raycaster.ray.origin.y -= 20;

        let intersections = raycaster.intersectObjects( objects );
        let onObject = intersections.length > 0;
        let time = Date.now();
        let delta = ( time - prevTime ) / 1000;

        velocity.x -= velocity.x * 10.0 * delta;
        velocity.z -= velocity.z * 10.0 * delta;
        velocity.y -= 9.8 * 100.0 * delta; // 100.0 = mass

        direction.z = Number( moveForward ) - Number( moveBackward );
        direction.x = Number( moveRight ) - Number( moveLeft );

        direction.normalize(); // this ensures consistent movements in all directions

        if ( moveForward || moveBackward ) velocity.z -= direction.z * 400.0 * delta;

        if ( moveLeft || moveRight ) velocity.x -= direction.x * 400.0 * delta;

        if ( onObject === true ) {
            velocity.y = Math.max( 0, velocity.y );
            canJump = true;
        }

        controls.moveRight( - velocity.x * delta );
        controls.moveForward( - velocity.z * delta );

        controls.getObject().position.y += ( velocity.y * delta ); // new behavior

        if ( controls.getObject().position.y < 10 ) {
            velocity.y = 0;
            controls.getObject().position.y = 10;
            canJump = true;
        }
        
        prevTime = time;
      }
    
    renderer.render( scene, camera );

    //animate();
}

function animate(){
    
}

const onKeyDown = (event) => {
  switch ( event.keyCode ) {

      case 38: // up
      case 87: // w
          moveForward = true;
          break;

      case 37: // left
      case 65: // a
          moveLeft = true; 
          break;

      case 40: // down
      case 83: // s
          moveBackward = true;
          break;

      case 39: // right
      case 68: // d
          moveRight = true;
          break;

      case 32: // space
          if ( canJump === true ) velocity.y += 350;
          canJump = false;
          break;
  }

}

const onKeyUp = (event) => {

  switch( event.keyCode ) {

      case 38: // up
      case 87: // w
          moveForward = false;
          break;

      case 37: // left
      case 65: // a
          moveLeft = false;
          break;

      case 40: // down
      case 83: // s
          moveBackward = false;
          break;

      case 39: // right
      case 68: // d
          moveRight = false;
          break;

  }
}