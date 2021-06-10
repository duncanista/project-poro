import React, { Suspense } from 'react';
import { useGLTF } from '@react-three/drei';
import { Cube } from '../components/cube'
import map from '../components/map.glb';

export const PocMap = (props) => {
  const gltf = useGLTF(map);
  console.log('poc map', gltf);

  const elements = gltf.scene.children[0].children;
  console.log(elements);

  const normalizePosition = (a,  b) => [a[0] + b[0], a[1] + b[1], a[2] + b[2]];


  const DoorFrame = (props) => {
    const { position } = props;
    return <>
      <Cube mass={1} args={[0.2, 1, 0.2]} position={normalizePosition([0.3, 0, 0], position)} />
      <Cube mass={1} args={[0.2, 1, 0.2]} position={normalizePosition([-0.3, 0, 0], position)} />
      <Cube mass={1} args={[0.4, 0.5, 0.2]} position={normalizePosition([0, 0.25, 0], position)} />
    </>
  }

  const DoorFrameV = (props) => {
    const { position } = props;
    return <>
      <Cube mass={1} args={[0.2, 1, 0.2]} position={normalizePosition([0, 0, 0.3], position)} />
      <Cube mass={1} args={[0.2, 1, 0.2]} position={normalizePosition([0, 0, -0.3], position)} />
      <Cube mass={1} args={[0.2, 0.5, 0.4]} position={normalizePosition([0, 0.25, 0], position)} />
    </>
  }

  return  <Suspense dispose={null}>
    <group position={[10, 0, 10]} {...props}>
      <primitive object={gltf.scene}/>
    </group>
    <Cube mass={1} args={[1.5, 1, 7.2]} position={[5.5, 0.5, 1.5]}/>
    <Cube mass={1} args={[1.25, 1, 7.2]} position={[9.5, 0.5, 1.5]}/>
    <Cube mass={1} args={[1.2, 1, 1.2]} position={[6.5, 0.5, 1.5]} />
    <DoorFrame position={[7.5, 0.5, 2]}/>

    <Cube mass={1} args={[7.2, 1, 1.2]} position={[11.5, 0.5, 1.5]}/>
    <Cube mass={1} args={[1.2, 1, 1.2]} position={[8.5, 0.5, 4.5]} />
    <Cube mass={1} args={[1.2, 1, 4.2]} position={[6.5, 0.5, 6]} />
    <DoorFrame position={[7.5, 0.5, 7]}/>

    <Cube mass={1} args={[3.2, 1, 1.2]} position={[13.5, 0.5, 5.5]}/>
    <Cube mass={1} args={[3.2, 1, 1.2]} position={[12.5, 0.5, 7.5]}/>
    <Cube mass={1} args={[3.2, 1, 1.2]} position={[12.5, 0.5, 9.5]}/>
    <Cube mass={1} args={[1.2, 1, 3.2]} position={[11.5, 0.5, 10.5]}/>
    <Cube mass={1} args={[7.2, 1, 1.2]} position={[7.5, 0.5, 11.5]}/>
    <Cube mass={1} args={[2.2, 1, 2.2]} position={[6, 0.5, 10]}/>
    <Cube mass={1} args={[2.2, 1, 1.2]} position={[2, 0.5, 11.5]}/>
    <Cube mass={1} args={[4.2, 1, 1.2]} position={[3, 0.5, 4.5]}/>
    <Cube mass={1} args={[1.2, 1, 7.2]} position={[1.5, 0.5, 8]}/>
    <DoorFrame position={[5.5, 0.5, 6]}/>
    <DoorFrame position={[3.5, 0.5, 7]}/>
    <Cube mass={1} args={[1.2, 1, 0.2]} position={[3.5, 0.5, 11]}/>
    
    <DoorFrameV position={[7, 0.5, 8.5]} />
    <Cube mass={1} args={[1.2, 1, 0.2]} position={[4.5, 0.5, 7]}/>
    <Cube mass={1} args={[1.2, 1, 0.2]} position={[4.5, 0.5, 6]}/>
    <Cube mass={1} args={[0.2, 1, 2.2]} position={[5, 0.5, 8]}/>
    <Cube mass={1} args={[0.2, 1, 1.2]} position={[4, 0.5, 5.5]}/>
    <Cube mass={1} args={[1.2, 1, 0.2]} position={[2.5, 0.5, 7]}/>
    <DoorFrameV position={[9, 0.5, 7.5]} />
    <DoorFrameV position={[9, 0.5, 10.5]} />
    <Cube mass={1} args={[0.2, 1, 1.2]} position={[11, 0.5, 8.5]}/>

    <Cube mass={1} args={[2.2, 1, 0.2]} position={[10, 0.5, 8]}/>
    <Cube mass={1} args={[2.2, 1, 0.2]} position={[10, 0.5, 9]}/>
    <Cube mass={1} args={[0.2, 1, 1.2]} position={[9, 0.5, 9.5]}/>
    <Cube mass={1} args={[0.2, 1, 1.2]} position={[12, 0.5, 8.5]}/>
    <Cube mass={1} args={[0.2, 1, 0.2]} position={[8, 0.5, 8]}/>
    <Cube mass={1} args={[0.2, 1, 0.2]} position={[8, 0.5, 9]}/>
    <Cube mass={1} args={[0.2, 1, 0.2]} position={[8, 0.5, 10]}/>
    <Cube mass={1} args={[0.2, 1, 0.2]} position={[8, 0.5, 3]}/>
    <Cube mass={1} args={[0.2, 1, 0.2]} position={[7, 0.5, 3]}/>
    <Cube mass={1} args={[0.2, 1, 0.2]} position={[8, 0.5, -2]}/>
    <Cube mass={1} args={[0.2, 1, 0.2]} position={[7, 0.5, -2]}/>
    <Cube mass={1} args={[0.2, 1, 0.2]} position={[3, 0.5, 6]}/>
    
    <Cube mass={1} args={[0.6, 1, 0.4]} position={[8.1, 0.5, -1.3]}/>
    <Cube mass={1} args={[0.6, 1, 0.4]} position={[6.9, 0.5, -1.3]}/>
    <Cube mass={1} args={[0.6, 1, 0.4]} position={[8.1, 0.5, -0.65]}/>
    <Cube mass={1} args={[0.6, 1, 0.4]} position={[6.9, 0.5, -0.65]}/>
    <Cube mass={1} args={[0.6, 1, 0.4]} position={[8.1, 0.5, 0.1]}/>
    <Cube mass={1} args={[0.6, 1, 0.4]} position={[6.9, 0.5, 0.1]}/>





    <Cube mass={1} args={[5.2, 1, 1.2]} position={[10.5, 0.5, 6.5]}/>
    <Cube mass={1} args={[1.2, 1, 3.2]} position={[14.5, 0.5, 3.5]}/>
    <Cube mass={1} args={[1.2, 1, 0.2]} position={[11.5, 0.5, 5]}/>
    <DoorFrame position={[10.5, 0.5, 5]} />

    <Cube mass={1} args={[1, 1, 4.2]} position={[4.5, 0.5, -3]}/>
    <Cube mass={1} args={[1, 1, 4.2]} position={[10.5, 0.5, -3]}/>

    <Cube mass={1} args={[5, 1, 1.2]} position={[7.5, 0.5, -4.5]}/>
    
    <Cube mass={1} args={[0.2, 10, 0.2]} position={[0, 0, 0]}/>
  </Suspense>
}