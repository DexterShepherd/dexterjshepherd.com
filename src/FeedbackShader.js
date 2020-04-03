import { glNoise2d } from './NoiseShader'

export const FeedbackShader = {
  uniforms: {
    uPos: { type: 'vec2', value: [0, 0] },
    uLast: { type: 'texture' },
    uTime: { type: 'f', value: 0.0 },
    uFade: { type: 'f', value: 0.0 },
    uEffect: { type: 'f', value: 0.0 },
    uPixSize: { type: 'vec2', value: [1.0, 1.0] }
  },
  vertexShader: `
  varying vec2 vUv;

  void main() {
    vUv = uv;
    vec3 pos = position;
    gl_Position = projectionMatrix * modelViewMatrix * vec4( pos, 1.0 );
  }
  `,
  fragmentShader: `
  varying vec2 vUv;
  uniform sampler2D uLast;
  uniform float uTime;
  uniform float uFade;
  uniform vec2 uPixSize;
  uniform float uEffect;

  ${glNoise2d}

  float movementSpeed = 0.15;

  void main() {

    vec2 cameraMove = vec2(
      snoise(vec3(0.5, 0.5, uTime * movementSpeed)),
      snoise(vec3(0.0, 0.5, uTime * movementSpeed))
    ) * 0.002;

    vec2 st = vUv; 

    st -= vec2(0.5);
    
    st += cameraMove;

    st *= 1.0 + (snoise(vec3(0.1, 0.1, uTime * movementSpeed)) * 0.003);
    st += vec2(0.5);


    vec4 last = texture2D(uLast, st);
    vec4 c = last;
    c.a -= uFade;

    
    float h = uPixSize.x;
    vec4 sum = vec4(0.0);

    h *= 2.0 * snoise(vec3(st * 4.0, uTime * 0.1));

    if ( uEffect > 0.5 ) {
      // blur

      sum += texture2D(uLast, st + (vec2(-1.0, -1.0) * h)) * 1.0;
      sum += texture2D(uLast, st + (vec2(0.0, -1.0) * h)) * 2.0;
      sum += texture2D(uLast, st + (vec2(1.0, -1.0) * h)) * 1.0;
      sum += texture2D(uLast, st + (vec2(-1.0, 0.0) * h)) * 2.0;
      sum += texture2D(uLast, st + (vec2(0.0, 0.0) * h)) * 4.0;
      sum += texture2D(uLast, st + (vec2(1.0, 0.0) * h)) * 2.0;
      sum += texture2D(uLast, st + (vec2(-1.0, 1.0) * h)) * 1.0;
      sum += texture2D(uLast, st + (vec2(0.0, 1.0) * h)) * 2.0;
      sum += texture2D(uLast, st + (vec2(1.0, 1.0) * h)) * 1.0;

      sum /= 16.0;

    } else {
      // sharpen
      
      sum += texture2D(uLast, st + (vec2(0.0, -1.0) * h)) * -1.5;
      sum += texture2D(uLast, st + (vec2(-1.0, 0.0) * h)) * -0.5;
      sum += texture2D(uLast, st + (vec2(0.0, 0.0) * h)) * 5.0;
      sum += texture2D(uLast, st + (vec2(1.0, 0.0) * h)) * -1.5;
      sum += texture2D(uLast, st + (vec2(0.0, 1.0) * h)) * -0.5;
    }

    c.xyz = sum.xyz;

    gl_FragColor = c;
  }
  `
}
