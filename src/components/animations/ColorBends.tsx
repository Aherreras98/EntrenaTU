import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

interface ColorBendsProps {
  colors?: string[];
  speed?: number;
  rotation?: number;
  scale?: number;
  frequency?: number;
  warpStrength?: number;
  mouseInfluence?: number;
  noise?: number;
  className?: string;
}

const ColorBends: React.FC<ColorBendsProps> = ({
  colors = ['#FF5733', '#FB923C', '#000000'],
  speed = 0.2,
  rotation = 45,
  scale = 1.0,
  frequency = 1.0,
  warpStrength = 1.0,
  mouseInfluence = 1.0,
  noise = 0.1,
  className = ""
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef(new THREE.Vector2(0, 0));

  // Shaders definidos fuera para evitar errores de compilación
  const vertexShader = `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `;

  const fragmentShader = `
    uniform float uTime;
    uniform vec3 uColors[3];
    uniform float uRotation;
    uniform float uScale;
    uniform float uFrequency;
    uniform float uWarpStrength;
    uniform float uNoise;
    uniform vec2 uMouse;
    varying vec2 vUv;

    mat2 rotate2d(float _angle){
      return mat2(cos(_angle),-sin(_angle), sin(_angle),cos(_angle));
    }

    float random (vec2 st) {
      return fract(sin(dot(st.xy, vec2(12.9898,78.233)))*43758.5453123);
    }

    void main() {
      vec2 uv = vUv;
      vec2 mouse = uMouse * 0.1;
      uv -= 0.5;
      uv = rotate2d(uRotation + uTime * 0.05) * uv;
      uv *= uScale;
      uv += 0.5;
      float wave = sin(uv.x * uFrequency * 10.0 + uTime + mouse.x) * cos(uv.y * uFrequency * 10.0 + uTime + mouse.y);
      vec2 warp = uv + uWarpStrength * vec2(wave);
      float colorIndex = clamp((warp.x + warp.y) * 0.5, 0.0, 1.0);
      vec3 color = mix(uColors[0], uColors[1], colorIndex);
      if(uNoise > 0.0) {
        color += (random(uv + uTime) - 0.5) * uNoise;
      }
      gl_FragColor = vec4(color, 1.0);
    }
  `;

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const width = container.offsetWidth || window.innerWidth;
    const height = container.offsetHeight || window.innerHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    
    renderer.setSize(width, height);
    container.appendChild(renderer.domElement);

    const colorObjects = colors.slice(0, 3).map(c => new THREE.Color(c));

    const geometry = new THREE.PlaneGeometry(2, 2);
    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        uTime: { value: 0 },
        uColors: { value: colorObjects },
        uRotation: { value: rotation * (Math.PI / 180) },
        uScale: { value: scale },
        uFrequency: { value: frequency },
        uWarpStrength: { value: warpStrength },
        uNoise: { value: noise },
        uMouse: { value: mouseRef.current }
      }
    });

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    const onMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener('mousemove', onMouseMove);

    let frameId: number;
    const render = (time: number) => {
      material.uniforms.uTime.value = time * 0.001 * speed;
      renderer.render(scene, camera);
      frameId = requestAnimationFrame(render);
    };
    frameId = requestAnimationFrame(render);

    const onResize = () => {
      const w = container.offsetWidth;
      const h = container.offsetHeight;
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', onResize);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onResize);
      cancelAnimationFrame(frameId);
      renderer.dispose();
      geometry.dispose();
      material.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [colors, speed, rotation, scale, frequency, warpStrength, noise]);

  return <div ref={containerRef} className={`w-full h-full min-h-[200px] ${className}`} />;
};

export default ColorBends;