import ShaderBase from './ShaderBase';

import StandardShader from './shaders/StandardShader';
import WireframeShader from './shaders/WireframeShader';

let ShaderList: ShaderBase[] = [];

ShaderList.push(new StandardShader());
ShaderList.push(new WireframeShader());

export default ShaderList;
