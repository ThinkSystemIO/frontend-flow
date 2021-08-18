import { extend, ReactThreeFiber, useFrame, useThree } from "@react-three/fiber"
import React, { useEffect, useRef } from "react"
import { TrackballControls } from 'three/examples/jsm/controls/TrackballControls'

extend({ TrackballControls })

declare global {
    namespace JSX {
        interface IntrinsicElements {
            trackballControls: ReactThreeFiber.Object3DNode<TrackballControls, typeof TrackballControls>
        }
    }
}

function ThreeJSControls(props: any) {
    const ref = useRef<any>()
    const { camera, gl, invalidate } = useThree()
    useFrame(() => ref.current.update())
    useEffect(() => void ref.current.addEventListener('change', invalidate), [invalidate])
    return <trackballControls ref={ref} args={[camera, gl.domElement]} rotateSpeed={5} />
}

export default ThreeJSControls;