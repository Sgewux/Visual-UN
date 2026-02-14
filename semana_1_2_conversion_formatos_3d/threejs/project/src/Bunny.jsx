import { STLLoader } from 'three/addons/loaders/STLLoader.js'
import { useLoader } from '@react-three/fiber'

function Bunny(){
    const stl = useLoader(STLLoader, 'models/bunny.stl');
    return (
        <mesh geometry={stl} scale={13}>
        <meshStandardMaterial color="white" />
        </mesh>
    );
}

export default Bunny;