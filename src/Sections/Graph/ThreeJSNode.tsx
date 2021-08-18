import { extend, useFrame } from '@react-three/fiber'
import React, { useRef, useState } from 'react'
import type { Mesh } from 'three'
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass'
import { SET_IS_NODE_DIALOG_OPEN, SET_SELECTED_NODE } from '../../State/Actions'
import { useDispatchContext } from '../../State/Context'
import { DARK_DARK, DARK_INFO, DARK_PRIMARY } from '../../Styles/Colors'
import { TreeNode } from '../../Types'
extend({ UnrealBloomPass })

interface Props {
    node: TreeNode
}

const bufferGeometryArgs: any = [5, 1]

const ThreeJSNode = ({ node }: Props) => {
    // Context
    const dispatch = useDispatchContext()

    const onClick = () => {
        dispatch({ type: SET_SELECTED_NODE, payload: node.id })
        dispatch({ type: SET_IS_NODE_DIALOG_OPEN, payload: true })
    }

    // State
    const [hovered, setHover] = useState(false)

    // Refs
    const surface = useRef<Mesh>()
    const frame = useRef<Mesh>()

    useFrame(() => {
        const inc = node.active ? 0.01 : 0.0
        if (surface.current) surface.current.rotation.x = surface.current.rotation.y += inc
        if (frame.current) frame.current.rotation.x = frame.current.rotation.y += inc
    })

    // Derivations
    const nodeColor = node.active ? DARK_INFO : "grey"
    const wireColor = node.active ? DARK_PRIMARY : DARK_DARK

    return (
        <group>
            <mesh
                ref={surface}
                position={node.position}
                onClick={onClick}
                onPointerOver={(event) => setHover(true)}
                onPointerOut={(event) => setHover(false)}>
                <icosahedronBufferGeometry args={bufferGeometryArgs} />
                <meshStandardMaterial color={nodeColor} />
            </mesh>
            <mesh
                ref={frame}
                position={node.position}
                onPointerOver={(event) => setHover(true)}
                onPointerOut={(event) => setHover(false)}>
                <icosahedronBufferGeometry args={bufferGeometryArgs} />
                <meshStandardMaterial color={wireColor} wireframe />
            </mesh>
        </group >
    )
}

export default ThreeJSNode