/**
 * Cena 3D da faceta de porcelana (three.js puro).
 *
 * Este módulo é importado só com `import()` pelo componente Faceta3D, quando a seção Facetas
 * se aproxima da tela: o three.js vira um chunk separado e não pesa no carregamento inicial.
 *
 * A faceta é gerada por código (sem arquivo .glb): uma lâmina curva no contorno de um incisivo
 * central superior, mais espessa no centro e na borda incisal e afinando até a margem
 * (o "término em lâmina" típico da faceta), com gradiente de cor cervical → incisal.
 */
import {
  ACESFilmicToneMapping,
  BufferAttribute,
  BufferGeometry,
  Color,
  DirectionalLight,
  Group,
  Mesh,
  MeshPhysicalMaterial,
  PerspectiveCamera,
  PMREMGenerator,
  Scene,
  WebGLRenderer,
} from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';

export interface FacetaSceneOptions {
  /** gira sozinha quando o usuário não está mexendo (desligado com prefers-reduced-motion) */
  animate: boolean;
  /** chamado na primeira vez que o usuário arrasta a faceta */
  onFirstInteraction?: () => void;
}

export interface FacetaScene {
  /** liga/desliga o loop de render (só desenha enquanto está visível) */
  setActive: (active: boolean) => void;
  dispose: () => void;
}

// Proporções aproximadas de um incisivo central (unidades da cena; 1 ≈ 10 mm)
const HALF_WIDTH = 0.43;
const HALF_HEIGHT = 0.55;
const RADIAL_SEGMENTS = 40;
const ANGULAR_SEGMENTS = 120;
const THICKNESS_MARGIN = 0.008;
const THICKNESS_CENTER = 0.04;
const THICKNESS_INCISAL_EXTRA = 0.03;

const COR_CERVICAL = new Color('#d9c29c');
const COR_CORPO = new Color('#ece3d4');
const COR_INCISAL = new Color('#aebac2');
const COR_DOURADO = '#c8a46b';

const MAX_DPR_DESKTOP = 2;
const MAX_DPR_MOBILE = 1.5;
const MOBILE_BREAKPOINT = 768;
const CAMERA_DISTANCE = 3.1;
/** distância × aspecto mínima para a faceta caber na largura em cards estreitos */
const CAMERA_FIT_WIDTH = 2.4;
const AUTO_ROTATE_SPEED = 1.1;
const RESUME_AUTO_ROTATE_MS = 3500;
const FLOAT_AMPLITUDE = 0.025;
const FLOAT_PERIOD_MS = 1400;

/** Contorno do incisivo: cervical (topo) arredondado e mais estreito, incisal (base) quase reto. */
function outline(theta: number): [number, number] {
  const c = Math.cos(theta);
  const s = Math.sin(theta);
  const exponent = s > 0 ? 2.3 : 5;
  const x = HALF_WIDTH * Math.sign(c) * Math.abs(c) ** (2 / exponent);
  const y = HALF_HEIGHT * Math.sign(s) * Math.abs(s) ** (2 / exponent);
  const taper = 1 - 0.3 * Math.max(0, y / HALF_HEIGHT) ** 1.3;
  return [x * taper, y];
}

/**
 * Superfície vestibular convexa (curvatura mésio-distal maior que a cérvico-incisal), com os dois
 * sulcos verticais sutis do incisivo, que quebram o reflexo como num dente de verdade.
 */
function frontZ(xn: number, yn: number): number {
  const groove = (center: number) => Math.exp(-((xn - center) ** 2) / 0.025);
  const grooveDepth = 0.006 * Math.max(0, 1 - Math.abs(yn + 0.15) / 0.85);
  return 0.12 * (1 - xn * xn) + 0.05 * (1 - yn * yn) - grooveDepth * (groove(-0.36) + groove(0.36));
}

function thickness(r: number, yn: number): number {
  const center = THICKNESS_CENTER + THICKNESS_INCISAL_EXTRA * Math.max(0, -yn);
  return THICKNESS_MARGIN + (center - THICKNESS_MARGIN) * (1 - r ** 3);
}

/** Cor da porcelana pela altura: yn = 1 na cervical (mais quente), -1 na incisal (mais translúcida). */
function shade(yn: number, target: Color): Color {
  if (yn >= 0) return target.copy(COR_CORPO).lerp(COR_CERVICAL, yn ** 1.2);
  return target.copy(COR_CORPO).lerp(COR_INCISAL, Math.min(1, (-yn * 1.15) ** 2.4));
}

function buildVeneerGeometry(): BufferGeometry {
  const surfaceVerts = 1 + RADIAL_SEGMENTS * ANGULAR_SEGMENTS; // centro + anéis
  const total = surfaceVerts * 2 + ANGULAR_SEGMENTS * 2; // frente + verso + borda
  const positions = new Float32Array(total * 3);
  const colors = new Float32Array(total * 3);
  const indices: number[] = [];
  const tmp = new Color();
  const contour = Array.from({ length: ANGULAR_SEGMENTS }, (_, j) => outline((j / ANGULAR_SEGMENTS) * Math.PI * 2));

  const setVertex = (i: number, x: number, y: number, z: number, brightness: number) => {
    positions.set([x, y, z], i * 3);
    shade(y / HALF_HEIGHT, tmp).multiplyScalar(brightness);
    colors.set([tmp.r, tmp.g, tmp.b], i * 3);
  };

  // Frente (base 0) e verso (base surfaceVerts)
  for (const [base, isBack] of [[0, false], [surfaceVerts, true]] as const) {
    for (let k = 0; k <= RADIAL_SEGMENTS; k++) {
      const r = k / RADIAL_SEGMENTS;
      const count = k === 0 ? 1 : ANGULAR_SEGMENTS;
      for (let j = 0; j < count; j++) {
        const x = contour[j][0] * r;
        const y = contour[j][1] * r;
        const yn = y / HALF_HEIGHT;
        const zFront = frontZ(x / HALF_WIDTH, yn);
        const index = base + (k === 0 ? 0 : 1 + (k - 1) * ANGULAR_SEGMENTS + j);
        setVertex(index, x, y, isBack ? zFront - thickness(r, yn) : zFront, isBack ? 0.86 : 1);
      }
    }

    const ring = (k: number, j: number) => base + 1 + (k - 1) * ANGULAR_SEGMENTS + (j % ANGULAR_SEGMENTS);
    const tri = (a: number, b: number, c: number) => (isBack ? indices.push(a, c, b) : indices.push(a, b, c));
    for (let j = 0; j < ANGULAR_SEGMENTS; j++) tri(base, ring(1, j), ring(1, j + 1));
    for (let k = 1; k < RADIAL_SEGMENTS; k++) {
      for (let j = 0; j < ANGULAR_SEGMENTS; j++) {
        tri(ring(k, j), ring(k + 1, j), ring(k + 1, j + 1));
        tri(ring(k, j), ring(k + 1, j + 1), ring(k, j + 1));
      }
    }
  }

  // Borda: vértices próprios para a aresta fina ficar nítida
  const rimBase = surfaceVerts * 2;
  const lastRing = 1 + (RADIAL_SEGMENTS - 1) * ANGULAR_SEGMENTS;
  for (let j = 0; j < ANGULAR_SEGMENTS; j++) {
    for (const [offset, source] of [[0, lastRing + j], [ANGULAR_SEGMENTS, surfaceVerts + lastRing + j]] as const) {
      setVertex(rimBase + offset + j, positions[source * 3], positions[source * 3 + 1], positions[source * 3 + 2], 0.95);
    }
  }
  for (let j = 0; j < ANGULAR_SEGMENTS; j++) {
    const next = (j + 1) % ANGULAR_SEGMENTS;
    const front0 = rimBase + j;
    const front1 = rimBase + next;
    const back0 = rimBase + ANGULAR_SEGMENTS + j;
    const back1 = rimBase + ANGULAR_SEGMENTS + next;
    indices.push(front0, front1, back1, front0, back1, back0);
  }

  const geometry = new BufferGeometry();
  geometry.setAttribute('position', new BufferAttribute(positions, 3));
  geometry.setAttribute('color', new BufferAttribute(colors, 3));
  geometry.setIndex(indices);
  geometry.computeVertexNormals();
  geometry.center();
  return geometry;
}

/** Monta a cena dentro do container. Lança erro se o navegador não suportar WebGL. */
export function createFacetaScene(container: HTMLElement, options: FacetaSceneOptions): FacetaScene {
  const renderer = new WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'low-power' });
  const isMobile = window.innerWidth < MOBILE_BREAKPOINT;
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? MAX_DPR_MOBILE : MAX_DPR_DESKTOP));
  renderer.toneMapping = ACESFilmicToneMapping;
  renderer.toneMappingExposure = 0.85;
  Object.assign(renderer.domElement.style, { width: '100%', height: '100%', display: 'block' });
  container.appendChild(renderer.domElement);

  const scene = new Scene();
  const pmrem = new PMREMGenerator(renderer);
  const environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
  scene.environment = environment;
  scene.environmentIntensity = 0.55;

  const key = new DirectionalLight('#fff6ea', 1.1);
  key.position.set(1.2, 1.4, 2);
  const rim = new DirectionalLight(COR_DOURADO, 3); // contraluz dourado da marca
  rim.position.set(-1.5, 0.6, -1.8);
  scene.add(key, rim);

  const geometry = buildVeneerGeometry();
  const material = new MeshPhysicalMaterial({
    vertexColors: true,
    roughness: 0.32,
    metalness: 0,
    clearcoat: 1,
    clearcoatRoughness: 0.08,
    ior: 1.6,
    sheen: 0.35,
    sheenColor: new Color('#fff3df'),
    sheenRoughness: 0.5,
  });
  const veneer = new Mesh(geometry, material);
  veneer.rotation.y = -0.4; // começa levemente de lado para mostrar a espessura
  const pivot = new Group();
  pivot.add(veneer);
  scene.add(pivot);

  const camera = new PerspectiveCamera(30, 1, 0.1, 20);
  camera.position.set(0, 0.15, CAMERA_DISTANCE);

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableZoom = false; // a roda do mouse continua rolando a página
  controls.enablePan = false;
  controls.enableDamping = true;
  controls.dampingFactor = 0.08;
  controls.rotateSpeed = 0.8;
  controls.minPolarAngle = Math.PI * 0.22;
  controls.maxPolarAngle = Math.PI * 0.78;
  controls.autoRotate = options.animate;
  controls.autoRotateSpeed = AUTO_ROTATE_SPEED;
  // No toque: arrastar na vertical rola a página, na horizontal gira a faceta
  renderer.domElement.style.touchAction = 'pan-y';

  let interacted = false;
  let resumeTimer: number | undefined;
  const onStart = () => {
    window.clearTimeout(resumeTimer);
    controls.autoRotate = false;
    if (interacted) return;
    interacted = true;
    options.onFirstInteraction?.();
  };
  const onEnd = () => {
    if (!options.animate) return;
    resumeTimer = window.setTimeout(() => (controls.autoRotate = true), RESUME_AUTO_ROTATE_MS);
  };
  controls.addEventListener('start', onStart);
  controls.addEventListener('end', onEnd);

  const resize = () => {
    const { clientWidth: w, clientHeight: h } = container;
    if (!w || !h) return;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.position.setLength(Math.max(CAMERA_DISTANCE, CAMERA_FIT_WIDTH / camera.aspect));
    camera.updateProjectionMatrix();
  };
  const resizeObserver = new ResizeObserver(resize);
  resizeObserver.observe(container);
  resize();

  const startedAt = performance.now();
  const render = () => {
    if (options.animate) pivot.position.y = Math.sin((performance.now() - startedAt) / FLOAT_PERIOD_MS) * FLOAT_AMPLITUDE;
    controls.update();
    renderer.render(scene, camera);
  };

  return {
    setActive(active) {
      renderer.setAnimationLoop(active ? render : null);
    },
    dispose() {
      window.clearTimeout(resumeTimer);
      renderer.setAnimationLoop(null);
      resizeObserver.disconnect();
      controls.removeEventListener('start', onStart);
      controls.removeEventListener('end', onEnd);
      controls.dispose();
      geometry.dispose();
      material.dispose();
      environment.dispose();
      pmrem.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    },
  };
}
