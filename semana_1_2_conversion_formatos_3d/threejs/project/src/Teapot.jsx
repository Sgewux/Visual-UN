import { useGLTF } from "@react-three/drei";

function Teapot() {
    const { scene } = useGLTF("/models/teapot.gltf");
    const clone = scene.clone(true);
    return <primitive object={clone} scale={0.3}/>;
}

export default Teapot;