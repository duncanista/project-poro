import React, { Suspense, useMemo } from 'react';
import { useLoader } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import { useConvexPolyhedron } from '@react-three/cannon'
import { Geometry } from 'three-stdlib/deprecated/Geometry'

import allObjects from '../assets/Objects.glb';

export const IntroductionMap = (props) => {
  const gltf = useGLTF(allObjects);
  const nodes = gltf.nodes;
  console.log(gltf, nodes);

  const Ground = () => {
    const LargeTile = (props) => {
      return <Prop props={props} nodes={nodes} name='Ground_Large' />
    }

    return <group>
      <Prop props={props} nodes={nodes} name='Ground_Large' position={[0,0,0]} />
      <Prop props={props} nodes={nodes} name='Ground_Large' position={[1,0,0]}/>
    </group>
  }

  return <Suspense dispose={null}>
    <group {...props}>
      <primitive object={gltf.scene} position={[-10, 0, 0]}/>
      <Prop props={{
        position: [3, 0, 0],
        mass: 2
      }} nodes={nodes} name='Armor_Stand' physics />
      <Ground/>
      
    </group>
  </Suspense>
}

const toConvexProps = (bufferGeometry) => {
  const geo = new Geometry().fromBufferGeometry(bufferGeometry)

  geo.mergeVertices()
  return [geo.vertices.map((v) => [v.x, v.y, v.z]), [], []]
}


const Prop = ({props, nodes, name, physics}) => {
  const node = nodes[name];
  const material = node.material;
  const geo = useMemo(() => toConvexProps(node.geometry), [])
  const [ref] = useConvexPolyhedron(() => ({ ...props, args: geo, material}))
  if (physics) {
    return <mesh 
      name={`${name}-${Math.random()}`}
      ref={ref} 
      castShadow 
      receiveShadow 
      geometry={node.geometry}
      { ...props } 
      dispose={null}
      material={material}>
    </mesh> 
  } else {
    return <primitive object={node} {...props} name={`${name}-${Math.random()}`} />
  }
}