import { OBJLoader } from 'three/addons/loaders/OBJLoader.js'
import { useLoader } from '@react-three/fiber'

function Bear() {
  const obj = useLoader(OBJLoader, '/models/bear.obj');
  const clone = obj.clone(true);
  return <primitive object={clone} scale={5} />
}

export default Bear;