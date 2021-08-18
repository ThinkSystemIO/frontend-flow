import React, { useMemo, useRef, useState } from 'react';
import type { Mesh } from 'three';
import { CatmullRomCurve3, Vector3 } from "three";

interface Props {
    from: [number, number, number]
    to: [number, number, number]
}

const ThreeJSPipe = ({ from, to }: Props) => {
    // This reference will give us direct access to the mesh
    const mesh = useRef<Mesh>()

    // Set up state for the hovered and active state
    const [hovered, setHover] = useState(false)
    const [active, setActive] = useState(false)

    // Rotate mesh every frame, this is outside of React without overhead
    // useFrame(() => {
    //     if (mesh.current) mesh.current.rotation.x = mesh.current.rotation.y += 0.05
    // })

    const curve = useMemo(() => new CatmullRomCurve3([
        new Vector3(...from),
        new Vector3(...to),
    ]), [from, to]);

    return (
        <mesh
            ref={mesh}
            onClick={(event) => setActive(!active)}
            onPointerOver={(event) => setHover(true)}
            onPointerOut={(event) => setHover(false)}>
            <tubeBufferGeometry args={[curve, 16, 3, 20, true]} />
            <meshStandardMaterial color={"blue"} wireframe />
        </mesh>
    )
}

export default ThreeJSPipe;