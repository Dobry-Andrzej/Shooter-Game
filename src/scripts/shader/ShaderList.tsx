import ShaderBase from './ShaderBase';
import StandardShader from './shaders/StandardShader';

let ShaderList: ShaderBase[] = [];

ShaderList.push(new StandardShader());

export default ShaderList;
