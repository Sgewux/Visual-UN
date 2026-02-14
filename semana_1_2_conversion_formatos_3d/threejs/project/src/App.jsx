import { Canvas, events } from "@react-three/fiber"; // Three.js with react components
import { OrbitControls } from "@react-three/drei"; // camera, loaders, etc
import { Environment } from "@react-three/drei";
import { useState } from "react";
import './App.css'
import Teapot from "./Teapot";
import Bear from "./Bear";
import Bunny from "./Bunny";

function App() { 

  const [option, setOption] = useState("teapot");
  const loadModel = (op) => {
    console.log(op);
    if(op === "teapot"){
      return <Teapot key={1}/>;
    } else if (op === "bear"){
      return <Bear key={2}/>;
    } else if (op === "bunny"){
      return <Bunny key={3}/>
    }
  };

  return (
    <div className="all">
      <Canvas>
        <ambientLight/>
        <directionalLight position={[5, 5, 5]} intensity={5} />
        <Environment preset="city" />
        <OrbitControls enableZoom={false} />
        {option === "teapot" && <Teapot key="teapot" />}
        {option === "bear" && <Bear key="bear" />}
        {option === "bunny" && <Bunny key="bunny" />}

      </Canvas>

      <div className="selector">
        <h2>Select File to show</h2>
        <div>
          <select name="file" id="file" onChange={e => setOption(e.target.value)} className="dropdown">
            <option value="teapot">Teapot.gltf</option>
            <option value="bear">Bear.obj</option>
            <option value="bunny">Bunny.stl</option>
          </select>
        </div>

      </div>
    </div>

  );
}

export default App
