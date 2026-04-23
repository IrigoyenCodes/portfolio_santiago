'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Gauge, Leaf, Zap, Palette } from 'lucide-react';

export type ColorMode = 'sunset' | 'aurora';

export const COLOR_MODES: ColorMode[] = ['sunset', 'aurora'];

export const COLOR_PALETTES: Record<ColorMode, { color1: THREE.Vector3; color2: THREE.Vector3; darkNavy: THREE.Vector3; label: string }> = {
  sunset: {
    label: 'Sunset',
    color1: new THREE.Vector3(0.945, 0.353, 0.133),
    color2: new THREE.Vector3(0.039, 0.055, 0.153),
    darkNavy: new THREE.Vector3(0.039, 0.055, 0.153),
  },
  aurora: {
    label: 'Aurora',
    color1: new THREE.Vector3(0.545, 0.200, 0.900),
    color2: new THREE.Vector3(0.000, 0.780, 0.670),
    darkNavy: new THREE.Vector3(0.020, 0.012, 0.055),
  }
};

// ─── Module-level classes ────────────────────────────────────────────────────
// Defining these outside the React component prevents them from being
// redefined on every render cycle. The component only instantiates them once
// inside a single useEffect call, and cleans up via the returned destructor.

class TouchTexture {
  size: number;
  width: number;
  height: number;
  maxAge: number;
  radius: number;
  speed: number;
  trail: { x: number; y: number; age: number; force: number; vx: number; vy: number }[];
  last: { x: number; y: number } | null;
  canvas!: HTMLCanvasElement;
  ctx!: CanvasRenderingContext2D;
  texture!: THREE.CanvasTexture;

  constructor() {
    this.size = 64;
    this.width = this.height = this.size;
    this.maxAge = 64;
    this.radius = 0.25 * this.size;
    this.speed = 1 / this.maxAge;
    this.trail = [];
    this.last = null;
    this.initTexture();
  }

  initTexture() {
    this.canvas = document.createElement('canvas');
    this.canvas.width = this.width;
    this.canvas.height = this.height;
    this.ctx = this.canvas.getContext('2d')!;
    this.ctx.fillStyle = 'black';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this.texture = new THREE.CanvasTexture(this.canvas);
  }

  update() {
    this.clear();
    const speed = this.speed;
    for (let i = this.trail.length - 1; i >= 0; i--) {
      const point = this.trail[i];
      const f = point.force * speed * (1 - point.age / this.maxAge);
      point.x += point.vx * f;
      point.y += point.vy * f;
      point.age++;
      if (point.age > this.maxAge) {
        this.trail.splice(i, 1);
      } else {
        this.drawPoint(point);
      }
    }
    this.texture.needsUpdate = true;
  }

  clear() {
    this.ctx.fillStyle = 'black';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
  }

  addTouch(point: { x: number; y: number }) {
    let force = 0;
    let vx = 0;
    let vy = 0;
    const last = this.last;
    if (last) {
      const dx = point.x - last.x;
      const dy = point.y - last.y;
      if (dx === 0 && dy === 0) return;
      const dd = dx * dx + dy * dy;
      const d = Math.sqrt(dd);
      vx = dx / d;
      vy = dy / d;
      force = Math.min(dd * 20000, 2.0);
    }
    this.last = { x: point.x, y: point.y };
    this.trail.push({ x: point.x, y: point.y, age: 0, force, vx, vy });
  }

  drawPoint(point: { x: number; y: number; age: number; force: number; vx: number; vy: number }) {
    const pos = {
      x: point.x * this.width,
      y: (1 - point.y) * this.height,
    };

    let intensity = 1;
    if (point.age < this.maxAge * 0.3) {
      intensity = Math.sin((point.age / (this.maxAge * 0.3)) * (Math.PI / 2));
    } else {
      const t = 1 - (point.age - this.maxAge * 0.3) / (this.maxAge * 0.7);
      intensity = -t * (t - 2);
    }
    intensity *= point.force;

    const radius = this.radius;
    const color = `${((point.vx + 1) / 2) * 255}, ${((point.vy + 1) / 2) * 255}, ${intensity * 255}`;
    const offset = this.size * 5;
    this.ctx.shadowOffsetX = offset;
    this.ctx.shadowOffsetY = offset;
    this.ctx.shadowBlur = radius * 1;
    this.ctx.shadowColor = `rgba(${color},${0.2 * intensity})`;

    this.ctx.beginPath();
    this.ctx.fillStyle = 'rgba(255,0,0,1)';
    this.ctx.arc(pos.x - offset, pos.y - offset, radius, 0, Math.PI * 2);
    this.ctx.fill();
  }
}

// ─── Uniforms type ───────────────────────────────────────────────────────────
interface GradientUniforms {
  [uniform: string]: THREE.IUniform<unknown>;
  uTime: THREE.IUniform<number>;
  uResolution: THREE.IUniform<THREE.Vector2>;
  uColor1: THREE.IUniform<THREE.Vector3>;
  uColor2: THREE.IUniform<THREE.Vector3>;
  uColor3: THREE.IUniform<THREE.Vector3>;
  uColor4: THREE.IUniform<THREE.Vector3>;
  uColor5: THREE.IUniform<THREE.Vector3>;
  uColor6: THREE.IUniform<THREE.Vector3>;
  uSpeed: THREE.IUniform<number>;
  uIntensity: THREE.IUniform<number>;
  uTouchTexture: THREE.IUniform<THREE.CanvasTexture | null>;
  uGrainIntensity: THREE.IUniform<number>;
  uZoom: THREE.IUniform<number>;
  uDarkNavy: THREE.IUniform<THREE.Vector3>;
  uGradientSize: THREE.IUniform<number>;
  uGradientCount: THREE.IUniform<number>;
  uColor1Weight: THREE.IUniform<number>;
  uColor2Weight: THREE.IUniform<number>;
}

class GradientBackground {
  sceneManager: App;
  mesh: THREE.Mesh | null;
  uniforms: GradientUniforms;

  constructor(sceneManager: App) {
    this.sceneManager = sceneManager;
    this.mesh = null;
    this.uniforms = {
      uTime:          { value: 0 },
      uResolution:    { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
      uColor1:        { value: new THREE.Vector3(0.945, 0.353, 0.133) },
      uColor2:        { value: new THREE.Vector3(0.039, 0.055, 0.153) },
      uColor3:        { value: new THREE.Vector3(0.945, 0.353, 0.133) },
      uColor4:        { value: new THREE.Vector3(0.039, 0.055, 0.153) },
      uColor5:        { value: new THREE.Vector3(0.945, 0.353, 0.133) },
      uColor6:        { value: new THREE.Vector3(0.039, 0.055, 0.153) },
      uSpeed:         { value: 1.2 },
      uIntensity:     { value: 1.8 },
      uTouchTexture:  { value: null },
      uGrainIntensity:{ value: 0.08 },
      uZoom:          { value: 1.0 },
      uDarkNavy:      { value: new THREE.Vector3(0.039, 0.055, 0.153) },
      uGradientSize:  { value: 0.45 },
      uGradientCount: { value: 12.0 },
      uColor1Weight:  { value: 0.5 },
      uColor2Weight:  { value: 1.8 },
    };
  }

  init() {
    const viewSize = this.sceneManager.getViewSize();
    const geometry = new THREE.PlaneGeometry(viewSize.width, viewSize.height, 1, 1);

    const material = new THREE.ShaderMaterial({
      uniforms: this.uniforms,
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vec3 pos = position.xyz;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.);
          vUv = uv;
        }
      `,
      fragmentShader: `
        uniform float uTime;
        uniform vec2 uResolution;
        uniform vec3 uColor1; uniform vec3 uColor2; uniform vec3 uColor3;
        uniform vec3 uColor4; uniform vec3 uColor5; uniform vec3 uColor6;
        uniform float uSpeed; uniform float uIntensity;
        uniform sampler2D uTouchTexture;
        uniform float uGrainIntensity; uniform float uZoom;
        uniform vec3 uDarkNavy;
        uniform float uGradientSize; uniform float uGradientCount;
        uniform float uColor1Weight; uniform float uColor2Weight;

        varying vec2 vUv;

        #define PI 3.14159265359

        float grain(vec2 uv, float time) {
          vec2 grainUv = uv * uResolution * 0.5;
          float grainValue = fract(sin(dot(grainUv + time, vec2(12.9898, 78.233))) * 43758.5453);
          return grainValue * 2.0 - 1.0;
        }

        vec3 getGradientColor(vec2 uv, float time) {
          float gradientRadius = uGradientSize;

          vec2 center1  = vec2(0.5 + sin(time * uSpeed * 0.4)  * 0.4,  0.5 + cos(time * uSpeed * 0.5)  * 0.4);
          vec2 center2  = vec2(0.5 + cos(time * uSpeed * 0.6)  * 0.5,  0.5 + sin(time * uSpeed * 0.45) * 0.5);
          vec2 center3  = vec2(0.5 + sin(time * uSpeed * 0.35) * 0.45, 0.5 + cos(time * uSpeed * 0.55) * 0.45);
          vec2 center4  = vec2(0.5 + cos(time * uSpeed * 0.5)  * 0.4,  0.5 + sin(time * uSpeed * 0.4)  * 0.4);
          vec2 center5  = vec2(0.5 + sin(time * uSpeed * 0.7)  * 0.35, 0.5 + cos(time * uSpeed * 0.6)  * 0.35);
          vec2 center6  = vec2(0.5 + cos(time * uSpeed * 0.45) * 0.5,  0.5 + sin(time * uSpeed * 0.65) * 0.5);
          vec2 center7  = vec2(0.5 + sin(time * uSpeed * 0.55) * 0.38, 0.5 + cos(time * uSpeed * 0.48) * 0.42);
          vec2 center8  = vec2(0.5 + cos(time * uSpeed * 0.65) * 0.36, 0.5 + sin(time * uSpeed * 0.52) * 0.44);
          vec2 center9  = vec2(0.5 + sin(time * uSpeed * 0.42) * 0.41, 0.5 + cos(time * uSpeed * 0.58) * 0.39);
          vec2 center10 = vec2(0.5 + cos(time * uSpeed * 0.48) * 0.37, 0.5 + sin(time * uSpeed * 0.62) * 0.43);
          vec2 center11 = vec2(0.5 + sin(time * uSpeed * 0.68) * 0.33, 0.5 + cos(time * uSpeed * 0.44) * 0.46);
          vec2 center12 = vec2(0.5 + cos(time * uSpeed * 0.38) * 0.39, 0.5 + sin(time * uSpeed * 0.56) * 0.41);

          float dist1  = length(uv - center1);  float dist2  = length(uv - center2);
          float dist3  = length(uv - center3);  float dist4  = length(uv - center4);
          float dist5  = length(uv - center5);  float dist6  = length(uv - center6);
          float dist7  = length(uv - center7);  float dist8  = length(uv - center8);
          float dist9  = length(uv - center9);  float dist10 = length(uv - center10);
          float dist11 = length(uv - center11); float dist12 = length(uv - center12);

          float influence1  = 1.0 - smoothstep(0.0, gradientRadius, dist1);
          float influence2  = 1.0 - smoothstep(0.0, gradientRadius, dist2);
          float influence3  = 1.0 - smoothstep(0.0, gradientRadius, dist3);
          float influence4  = 1.0 - smoothstep(0.0, gradientRadius, dist4);
          float influence5  = 1.0 - smoothstep(0.0, gradientRadius, dist5);
          float influence6  = 1.0 - smoothstep(0.0, gradientRadius, dist6);
          float influence7  = 1.0 - smoothstep(0.0, gradientRadius, dist7);
          float influence8  = 1.0 - smoothstep(0.0, gradientRadius, dist8);
          float influence9  = 1.0 - smoothstep(0.0, gradientRadius, dist9);
          float influence10 = 1.0 - smoothstep(0.0, gradientRadius, dist10);
          float influence11 = 1.0 - smoothstep(0.0, gradientRadius, dist11);
          float influence12 = 1.0 - smoothstep(0.0, gradientRadius, dist12);

          vec2 rotatedUv1 = uv - 0.5;
          float angle1 = time * uSpeed * 0.15;
          rotatedUv1 = vec2(
            rotatedUv1.x * cos(angle1) - rotatedUv1.y * sin(angle1),
            rotatedUv1.x * sin(angle1) + rotatedUv1.y * cos(angle1)
          );
          rotatedUv1 += 0.5;

          vec2 rotatedUv2 = uv - 0.5;
          float angle2 = -time * uSpeed * 0.12;
          rotatedUv2 = vec2(
            rotatedUv2.x * cos(angle2) - rotatedUv2.y * sin(angle2),
            rotatedUv2.x * sin(angle2) + rotatedUv2.y * cos(angle2)
          );
          rotatedUv2 += 0.5;

          float radialGradient1  = length(rotatedUv1 - 0.5);
          float radialGradient2  = length(rotatedUv2 - 0.5);
          float radialInfluence1 = 1.0 - smoothstep(0.0, 0.8, radialGradient1);
          float radialInfluence2 = 1.0 - smoothstep(0.0, 0.8, radialGradient2);

          vec3 color = vec3(0.0);
          color += uColor1 * influence1  * (0.55 + 0.45 * sin(time * uSpeed))        * uColor1Weight;
          color += uColor2 * influence2  * (0.55 + 0.45 * cos(time * uSpeed * 1.2))  * uColor2Weight;
          color += uColor3 * influence3  * (0.55 + 0.45 * sin(time * uSpeed * 0.8))  * uColor1Weight;
          color += uColor4 * influence4  * (0.55 + 0.45 * cos(time * uSpeed * 1.3))  * uColor2Weight;
          color += uColor5 * influence5  * (0.55 + 0.45 * sin(time * uSpeed * 1.1))  * uColor1Weight;
          color += uColor6 * influence6  * (0.55 + 0.45 * cos(time * uSpeed * 0.9))  * uColor2Weight;

          if (uGradientCount > 6.0) {
            color += uColor1 * influence7  * (0.55 + 0.45 * sin(time * uSpeed * 1.4)) * uColor1Weight;
            color += uColor2 * influence8  * (0.55 + 0.45 * cos(time * uSpeed * 1.5)) * uColor2Weight;
            color += uColor3 * influence9  * (0.55 + 0.45 * sin(time * uSpeed * 1.6)) * uColor1Weight;
            color += uColor4 * influence10 * (0.55 + 0.45 * cos(time * uSpeed * 1.7)) * uColor2Weight;
          }
          if (uGradientCount > 10.0) {
            color += uColor5 * influence11 * (0.55 + 0.45 * sin(time * uSpeed * 1.8)) * uColor1Weight;
            color += uColor6 * influence12 * (0.55 + 0.45 * cos(time * uSpeed * 1.9)) * uColor2Weight;
          }

          color += mix(uColor1, uColor3, radialInfluence1) * 0.45 * uColor1Weight;
          color += mix(uColor2, uColor4, radialInfluence2) * 0.40 * uColor2Weight;

          color = clamp(color, vec3(0.0), vec3(1.0)) * uIntensity;
          float luminance = dot(color, vec3(0.299, 0.587, 0.114));
          color = mix(vec3(luminance), color, 1.35);
          color = pow(color, vec3(0.92));

          float brightness1 = length(color);
          float mixFactor1  = max(brightness1 * 1.2, 0.15);
          color = mix(uDarkNavy, color, mixFactor1);

          float maxBrightness = 1.0;
          float brightness    = length(color);
          if (brightness > maxBrightness) {
            color = color * (maxBrightness / brightness);
          }

          return color;
        }

        void main() {
          vec2 uv = vUv;
          vec4 touchTex = texture2D(uTouchTexture, uv);
          float vx = -(touchTex.r * 2.0 - 1.0);
          float vy = -(touchTex.g * 2.0 - 1.0);
          float intensity = touchTex.b;
          uv.x += vx * 0.8 * intensity;
          uv.y += vy * 0.8 * intensity;

          vec2 center = vec2(0.5);
          float dist   = length(uv - center);
          float ripple = sin(dist * 20.0 - uTime * 3.0) * 0.04 * intensity;
          float wave   = sin(dist * 15.0 - uTime * 2.0) * 0.03 * intensity;
          uv += vec2(ripple + wave);

          vec3 color = getGradientColor(uv, uTime);
          float grainValue = grain(uv, uTime);
          color += grainValue * uGrainIntensity;

          float timeShift = uTime * 0.5;
          color.r += sin(timeShift) * 0.02;
          color.g += cos(timeShift * 1.4) * 0.02;
          color.b += sin(timeShift * 1.2) * 0.02;

          float brightness2 = length(color);
          float mixFactor2  = max(brightness2 * 1.2, 0.15);
          color = mix(uDarkNavy, color, mixFactor2);
          color = clamp(color, vec3(0.0), vec3(1.0));

          float maxBrightness = 1.0;
          float brightness    = length(color);
          if (brightness > maxBrightness) {
            color = color * (maxBrightness / brightness);
          }

          gl_FragColor = vec4(color, 1.0);
        }
      `,
    });

    this.mesh = new THREE.Mesh(geometry, material);
    this.mesh.position.z = 0;
    this.sceneManager.scene.add(this.mesh);
  }

  update(delta: number) {
    if (this.uniforms.uTime) {
      this.uniforms.uTime.value += delta;
    }
  }

  onResize(width: number, height: number) {
    const viewSize = this.sceneManager.getViewSize();
    if (this.mesh) {
      this.mesh.geometry.dispose();
      this.mesh.geometry = new THREE.PlaneGeometry(viewSize.width, viewSize.height, 1, 1);
    }
    if (this.uniforms.uResolution) {
      this.uniforms.uResolution.value.set(width, height);
    }
  }
}

class App {
  container: HTMLElement;
  renderer: THREE.WebGLRenderer;
  camera: THREE.PerspectiveCamera;
  scene: THREE.Scene;
  clock: THREE.Clock;
  touchTexture: TouchTexture;
  gradientBackground: GradientBackground;
  animationFrameId: number = 0;
  mouse: { x: number; y: number } = { x: 0, y: 0 };
  fpsLimit: number = 0;
  lastRenderTime: number = 0;

  constructor(container: HTMLElement) {
    this.container = container;

    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      powerPreference: 'high-performance',
      alpha: false,
      stencil: false,
      depth: false,
    });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(this.renderer.domElement);

    this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 10000);
    this.camera.position.z = 50;

    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x0a0e27);
    this.clock = new THREE.Clock();

    this.touchTexture = new TouchTexture();
    this.gradientBackground = new GradientBackground(this);
    this.gradientBackground.uniforms.uTouchTexture.value = this.touchTexture.texture;

    this.init();
  }

  init() {
    this.gradientBackground.init();
    this.render();
    this.animationFrameId = requestAnimationFrame(this.tick);

    window.addEventListener('resize', this.onResize);
    window.addEventListener('mousemove', this.onMouseMove);
    window.addEventListener('touchmove', this.onTouchMove, { passive: true });
    document.addEventListener('visibilitychange', this.onVisibilityChange);
  }

  destroy() {
    cancelAnimationFrame(this.animationFrameId);
    window.removeEventListener('resize', this.onResize);
    window.removeEventListener('mousemove', this.onMouseMove);
    window.removeEventListener('touchmove', this.onTouchMove);
    document.removeEventListener('visibilitychange', this.onVisibilityChange);

    if (this.container && this.renderer.domElement) {
      this.container.removeChild(this.renderer.domElement);
    }

    this.renderer.dispose();
    if (this.gradientBackground.mesh) {
      this.gradientBackground.mesh.geometry.dispose();
      (this.gradientBackground.mesh.material as THREE.Material).dispose();
    }
    this.touchTexture.texture.dispose();
  }

  /**
   * Pauses the render loop when the tab is hidden and resumes when visible.
   * Consumes the accumulated clock delta on resume to prevent a frame-time
   * spike that would cause a visual jump in the animation.
   */
  onVisibilityChange = () => {
    if (document.hidden) {
      cancelAnimationFrame(this.animationFrameId);
    } else {
      // Drain the stale delta so the next frame doesn't jump
      this.clock.getDelta();
      this.animationFrameId = requestAnimationFrame(this.tick);
    }
  };

  onTouchMove = (ev: TouchEvent) => {
    const touch = ev.touches[0];
    this.onMouseMove({ clientX: touch.clientX, clientY: touch.clientY } as unknown as MouseEvent);
  };

  onMouseMove = (ev: MouseEvent) => {
    this.mouse = {
      x: ev.clientX / window.innerWidth,
      y: 1 - ev.clientY / window.innerHeight,
    };
    this.touchTexture.addTouch(this.mouse);
  };

  getViewSize() {
    const fovInRadians = (this.camera.fov * Math.PI) / 180;
    const height = Math.abs(this.camera.position.z * Math.tan(fovInRadians / 2) * 2);
    return { width: height * this.camera.aspect, height };
  }

  update(delta: number) {
    this.touchTexture.update();
    this.gradientBackground.update(delta);
  }

  render() {
    const delta = this.clock.getDelta();
    const clampedDelta = Math.min(delta, 0.1);
    this.renderer.render(this.scene, this.camera);
    this.update(clampedDelta);
  }

  setColorMode(paletteMode: ColorMode) {
    const palette = COLOR_PALETTES[paletteMode];
    if (!palette) return;

    const uniforms = this.gradientBackground.uniforms;
    
    (uniforms.uColor1.value as THREE.Vector3).copy(palette.color1);
    (uniforms.uColor3.value as THREE.Vector3).copy(palette.color1);
    (uniforms.uColor5.value as THREE.Vector3).copy(palette.color1);
    
    (uniforms.uColor2.value as THREE.Vector3).copy(palette.color2);
    (uniforms.uColor4.value as THREE.Vector3).copy(palette.color2);
    (uniforms.uColor6.value as THREE.Vector3).copy(palette.color2);
    
    (uniforms.uDarkNavy.value as THREE.Vector3).copy(palette.darkNavy);
  }

  setPerformanceMode(mode: 'high' | 'eco' | 'off') {
    if (mode === 'off') {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = 0;
    } else if (mode === 'eco') {
      this.renderer.setPixelRatio(1);
      this.fpsLimit = 1000 / 30; // cap to 30 FPS
      if (this.animationFrameId === 0) {
        this.clock.getDelta();
        this.animationFrameId = requestAnimationFrame(this.tick);
      }
    } else {
      this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      this.fpsLimit = 0;
      if (this.animationFrameId === 0) {
        this.clock.getDelta();
        this.animationFrameId = requestAnimationFrame(this.tick);
      }
    }
  }

  tick = (timestamp: number) => {
    if (this.fpsLimit > 0) {
      if (timestamp - this.lastRenderTime < this.fpsLimit) {
        this.animationFrameId = requestAnimationFrame(this.tick);
        return;
      }
      this.lastRenderTime = timestamp;
    }
    
    this.render();
    this.animationFrameId = requestAnimationFrame(this.tick);
  };

  onResize = () => {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.gradientBackground.onResize(window.innerWidth, window.innerHeight);
  };
}

// ─── React component ─────────────────────────────────────────────────────────

type PerfMode = 'high' | 'eco' | 'off';

const PERF_MODES: PerfMode[] = ['high', 'eco', 'off'];

const PERF_LABELS: Record<PerfMode, { label: string; title: string }> = {
  high: { label: 'High Quality', title: 'Switch to Power Saver' },
  eco:  { label: 'Power Saver',  title: 'Switch to Off' },
  off:  { label: 'Off',          title: 'Switch to High Quality' },
};

export default function LiquidBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const appRef = useRef<App | null>(null);
  const [mode, setMode] = useState<PerfMode>('high');
  const [colorMode, setColorMode] = useState<ColorMode>('sunset');

  useEffect(() => {
    if (!containerRef.current) return;

    try {
      appRef.current = new App(containerRef.current);
    } catch (e) {
      console.error('Failed to initialize WebGL background:', e);
    }

    return () => {
      appRef.current?.destroy();
    };
  }, []);

  const cycleMode = () => {
    const next = PERF_MODES[(PERF_MODES.indexOf(mode) + 1) % PERF_MODES.length];
    setMode(next);
    appRef.current?.setPerformanceMode(next);
  };

  const cycleColorMode = () => {
    const next = COLOR_MODES[(COLOR_MODES.indexOf(colorMode) + 1) % COLOR_MODES.length];
    setColorMode(next);
    appRef.current?.setColorMode(next);
  };

  const icon = mode === 'high'
    ? <Gauge className="w-4 h-4" />
    : mode === 'eco'
    ? <Leaf className="w-4 h-4 text-emerald-400" />
    : <Zap className="w-4 h-4 text-neutral-600" />;

  return (
    <>
      <div
        ref={containerRef}
        className={`fixed inset-0 w-full h-full -z-50 pointer-events-none transition-opacity duration-700 ${
          mode === 'off' ? 'opacity-0' : 'opacity-100'
        }`}
      />
      <div className="fixed bottom-6 left-6 md:bottom-8 md:left-8 z-50 flex items-center bg-neutral-900/80 backdrop-blur-md border border-neutral-800 rounded-full shadow-lg p-1">
        <button
          onClick={cycleColorMode}
          className="px-3 py-1.5 md:px-4 md:py-2 rounded-full text-neutral-400 hover:text-white hover:bg-neutral-800/50 transition-all flex items-center gap-2.5 group whitespace-nowrap"
          title="Change Color Theme"
        >
          <Palette className="w-4 h-4 group-hover:text-indigo-400 transition-colors" />
          <span className="text-[11px] font-mono tracking-wider uppercase pt-[1px] hidden sm:block">
            {COLOR_PALETTES[colorMode].label}
          </span>
        </button>

        <div className="w-[1px] h-4 bg-neutral-800 mx-1"></div>

        <button
          onClick={cycleMode}
          className="px-3 py-1.5 md:px-4 md:py-2 rounded-full text-neutral-400 hover:text-white hover:bg-neutral-800/50 transition-all flex items-center gap-2.5 group whitespace-nowrap"
          title={PERF_LABELS[mode].title}
        >
          {icon}
          <span className="text-[11px] font-mono tracking-wider uppercase pt-[1px] hidden sm:block">
            {PERF_LABELS[mode].label}
          </span>
        </button>
      </div>
    </>
  );
}
