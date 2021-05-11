import React, { Suspense } from 'react';
import { useGLTF } from '@react-three/drei';

import { Prop } from '../components/prop'

import allObjects from '../assets/Objects.glb';

export const IntroductionMap = (props) => {
  const gltf = useGLTF(allObjects);
  const nodes = gltf.nodes;

  console.log(gltf)

  const Ground = () => {
    const LargeTile = (props) => {
      return <Prop props={props} nodes={nodes} name='Ground_Large' />
    }

    return <group>
      <Prop props={props} nodes={nodes} name='Ground_Large' position={[0,0,0]} physics />
      <Prop props={props} nodes={nodes} name='Ground_Large' position={[1,0,0]} physics/>
    </group>
  }

  return <Suspense dispose={null}>
    <group {...props}>
      <primitive object={gltf.scene} position={[-10, 0, 0]}/>
      {gltf.scene.children[1].children.map((element) => {
        console.log(element)
        if (element.geometry && element.geometry.index && false) {
          return (<>
            <Prop
              props={{
                position: element.position,
                castShadow: element.castShadow,
                frustumCulled: element.frustumCulled,
                layers: element.layers,
                matrix: element.matrix,
                matrixAutoUpdate: element.matrixAutoUpdate
              }}
              nodes={nodes}
              geometry={element.geometry}
              name={element.name} physics
            />
          </>)
        } else {
          return <primitive object={element} />
        }
      })}   
      
    </group>
  </Suspense>
}

