import React, { useRef, useEffect } from 'react'
import { useGLTF } from '@react-three/drei'
import { Physics, usePlane, useBox } from '@react-three/cannon'
import { useConvexPolyhedron } from '@react-three/cannon'


export const Model = (props) => {
  const group = useRef()
  const { nodes, materials } = useGLTF('a.glb')

  useEffect(()=>{
    console.log("grupo", group);
    group.current.children.map(element =>{
      console.log(element);
    })
  })

  return (
    <group ref={group} {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Ground_Tiles_Large010.geometry}
        material={materials['Texture.064']}
        position={[5.01, 0, -0.73]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Ground_Tiles_Large011.geometry}
        material={materials['Texture.065']}
        position={[4.98, 0, -1.43]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Ground_Tiles_Large013.geometry}
        material={materials['Texture.067']}
        position={[5.01, 0, 1.51]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Ground_Tiles_Large012.geometry}
        material={materials['Texture.066']}
        position={[4.98, 0, 0.59]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Ground_Tiles_Large002.geometry}
        material={materials['Texture.017']}
        position={[1.47, 0, 0.05]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Rug_1_Way_Ruined003.geometry}
        material={materials['Texture.018']}
        position={[3.43, 0, 0.07]}
        rotation={[0, 1.57, 0]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Throne002.geometry}
        material={materials['Texture.019']}
        position={[0.83, 0, 0.05]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Pillar_Center_Round011.geometry}
        material={materials['Texture.020']}
        position={[1.63, 0, -0.62]}
        rotation={[0, 1.57, 0]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Ground_Tiles_Large005.geometry}
        material={materials['Texture.021']}
        position={[1.47, 0, 0.05]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Pillar_Center_Round012.geometry}
        material={materials['Texture.022']}
        position={[1.63, 0, 0.76]}
        rotation={[0, 1.57, 0]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Stone_Statue006.geometry}
        material={materials['Texture.023']}
        position={[0.56, 0, -1.01]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Ground_Tiles_Large006.geometry}
        material={materials['Texture.024']}
        position={[1.47, 0, -0.76]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Ground_Tiles_Large007.geometry}
        material={materials['Texture.025']}
        position={[2.99, 0, 0.82]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Stone_Statue007.geometry}
        material={materials['Texture.026']}
        position={[0.56, 0, 0.99]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Pillar064.geometry}
        material={nodes.Pillar064.material}
        position={[0.37, 0, 0.54]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Wall064.geometry}
        material={nodes.Wall064.material}
        position={[0.36, 0, 1.37]}
        rotation={[0, 0, -Math.PI]}
        scale={[-1, -1, -1]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Pillar065.geometry}
        material={materials['Texture.028']}
        position={[0.37, 0, 0.41]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Wall065.geometry}
        material={materials['Texture.029']}
        position={[0.36, 0, 1.13]}
        rotation={[0, 0, -Math.PI]}
        scale={[-1, -1, -1]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Wall067.geometry}
        material={materials['Texture.031']}
        position={[0.36, 0, -1.01]}
        rotation={[0, 0, -Math.PI]}
        scale={[-1, -1, -1]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Wall066.geometry}
        material={materials['Texture.030']}
        position={[0.36, 0, -1.25]}
        rotation={[0, 0, -Math.PI]}
        scale={[-1, -1, -1]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Pillar082.geometry}
        material={materials['Texture.033']}
        position={[0.37, 0, -0.32]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Pillar076.geometry}
        material={materials['Texture.032']}
        position={[0.37, 0, -0.45]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Wall068.geometry}
        material={materials['Texture.034']}
        position={[0.36, 0, 0.04]}
        rotation={[0, 0, -Math.PI]}
        scale={[-1, -1, -1]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Banner_Large003.geometry}
        material={materials['Texture.035']}
        position={[0.37, 0.7, -0.42]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Banner_Large004.geometry}
        material={materials['Texture.036']}
        position={[0.37, 0.7, 0.51]}
      />
      <group position={[0.96, 0, -0.87]} rotation={[0, 1.57, 0]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Candles001.geometry}
          material={materials['Texture.037']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Candles001_1.geometry}
          material={materials['Texture_Emissive.001']}
        />
      </group>
      <group position={[0.98, 0, -0.93]} rotation={[0, 1.57, 0]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Candles002.geometry}
          material={materials['Texture.038']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Candles002_1.geometry}
          material={materials['Texture_Emissive.002']}
        />
      </group>
      <group position={[0.76, 0, -0.71]} rotation={[0, 1.57, 0]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Candles003.geometry}
          material={materials['Texture.039']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Candles003_1.geometry}
          material={materials['Texture_Emissive.003']}
        />
      </group>
      <group position={[0.86, 0, -0.74]} rotation={[0, 1.57, 0]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Candles004.geometry}
          material={materials['Texture.040']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Candles004_1.geometry}
          material={materials['Texture_Emissive.004']}
        />
      </group>
      <group position={[0.91, 0, -0.8]} rotation={[0, 1.57, 0]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Candles005.geometry}
          material={materials['Texture.041']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Candles005_1.geometry}
          material={materials['Texture_Emissive.005']}
        />
      </group>
      <group position={[0.96, 0, 1.15]} rotation={[0, 1.57, 0]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Candles010.geometry}
          material={materials['Texture.046']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Candles010_1.geometry}
          material={materials['Texture_Emissive.010']}
        />
      </group>
      <group position={[0.98, 0, 1.08]} rotation={[0, 1.57, 0]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Candles009.geometry}
          material={materials['Texture.045']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Candles009_1.geometry}
          material={materials['Texture_Emissive.009']}
        />
      </group>
      <group position={[0.76, 0, 1.31]} rotation={[0, 1.57, 0]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Candles008.geometry}
          material={materials['Texture.044']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Candles008_1.geometry}
          material={materials['Texture_Emissive.008']}
        />
      </group>
      <group position={[0.86, 0, 1.28]} rotation={[0, 1.57, 0]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Candles007.geometry}
          material={materials['Texture.043']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Candles007_1.geometry}
          material={materials['Texture_Emissive.007']}
        />
      </group>
      <group position={[0.91, 0, 1.21]} rotation={[0, 1.57, 0]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Candles006.geometry}
          material={materials['Texture.042']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Candles006_1.geometry}
          material={materials['Texture_Emissive.006']}
        />
      </group>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Armor_Stand007.geometry}
        material={materials['Texture.048']}
        position={[1.61, 0, -1.59]}
        rotation={[0, -1.57, 0]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Armor_Stand008.geometry}
        material={materials['Texture.049']}
        position={[1.61, 0, 1.66]}
        rotation={[0, 1.57, 0]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Armor_Stand010.geometry}
        material={materials['Texture.051']}
        position={[2.27, 0, -1.59]}
        rotation={[0, -1.57, 0]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Armor_Stand009.geometry}
        material={materials['Texture.050']}
        position={[2.27, 0, 1.66]}
        rotation={[0, 1.57, 0]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Ground_Tiles_Large008.geometry}
        material={materials['Texture.052']}
        position={[3.01, 0, -0.73]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Ground_Tiles_Large009.geometry}
        material={materials['Texture.053']}
        position={[1.47, 0, 0.82]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Rug_1_Way_Ruined007.geometry}
        material={materials['Texture.054']}
        position={[2.83, 0, 0.07]}
        rotation={[0, 1.57, 0]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Rug_1_Way_Ruined008.geometry}
        material={materials['Texture.055']}
        position={[1.83, 0, 0.07]}
        rotation={[0, 1.57, 0]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Wall071.geometry}
        material={materials['Texture.056']}
        position={[0.84, 0, 1.92]}
        rotation={[-Math.PI, 1.57, 0]}
        scale={[-1, -1, -1]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Wall087.geometry}
        material={materials['Texture.057']}
        position={[1.81, 0, 1.92]}
        rotation={[-Math.PI, 1.57, 0]}
        scale={[-1, -1, -1]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Wall089.geometry}
        material={materials['Texture.058']}
        position={[2.77, 0, 1.92]}
        rotation={[-Math.PI, 1.57, 0]}
        scale={[-1, -1, -1]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Wall090.geometry}
        material={materials['Texture.059']}
        position={[3.31, 0, 1.92]}
        rotation={[-Math.PI, 1.57, 0]}
        scale={[-1, -1, -1]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Wall101.geometry}
        material={materials['Texture.063']}
        position={[0.91, 0, -1.67]}
        rotation={[-Math.PI, 1.57, 0]}
        scale={[-1, -1, -1]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Wall098.geometry}
        material={materials['Texture.062']}
        position={[1.87, 0, -1.67]}
        rotation={[-Math.PI, 1.57, 0]}
        scale={[-1, -1, -1]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Wall097.geometry}
        material={materials['Texture.061']}
        position={[2.83, 0, -1.67]}
        rotation={[-Math.PI, 1.57, 0]}
        scale={[-1, -1, -1]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Wall091.geometry}
        material={materials['Texture.060']}
        position={[3.38, 0, -1.67]}
        rotation={[-Math.PI, 1.57, 0]}
        scale={[-1, -1, -1]}
      />
    </group>
  )
}

