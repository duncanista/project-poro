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
  const [ref] = useConvexPolyhedron(() => ({ ...props, args: geo, material}))
  if (physics) {
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