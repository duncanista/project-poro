import React, { useMemo } from 'react';
import { useConvexPolyhedron } from '@react-three/cannon'
import { Geometry } from 'three-stdlib/deprecated/Geometry'

export const toConvexProps = (bufferGeometry) => {
  const geo = new Geometry().fromBufferGeometry(bufferGeometry)

  geo.mergeVertices()
  return [geo.vertices.map((v) => [v.x, v.y, v.z]), [], []]
}

export const Prop = ({props, nodes, name, physics, geometry}) => {
  const node = nodes[name];
  const material = node.material;
  const _geometry = geometry ? geometry : node.geometry;
  const geo = useMemo(() => toConvexProps(_geometry), [])
  const [ref] = useConvexPolyhedron(() => ({ ...props, args: geo }))
  if (physics && _geometry.index) {
    return <mesh
      name={`${name}-${Math.random()}`}
      ref={ref} 
      castShadow 
      receiveShadow 
      geometry={_geometry}
      { ...props } 
      dispose={null}
      material={material}>
    </mesh> 
  } else {
    return <primitive object={node} {...props} name={`${name}-${Math.random()}`} />
  }
}

export const Prop2 = ({node}) => {
  console.log('creating ', node.name);
  const geometry = node.geometry;
  const geo = useMemo(() => toConvexProps(geometry), []);
  const [ref] = useConvexPolyhedron(() => ({ ...node, args: geo}))
  return <mesh 
      ref={ref} 
      geometry={geometry}
      { ...node } 
      dispose={null}>
    </mesh> 
}