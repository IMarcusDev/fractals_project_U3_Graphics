# 🌀 Aplicación Web Interactiva para Visualización de Fractales

Una aplicación web moderna y completa para la exploración interactiva de fractales matemáticos, desarrollada con Three.js, WebGL y JavaScript ES6.

![Fractales Demo](https://img.shields.io/badge/Demo-Live-brightgreen) ![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-yellow) ![Three.js](https://img.shields.io/badge/Three.js-r128-blue) ![WebGL](https://img.shields.io/badge/WebGL-2.0-red) ![License](https://img.shields.io/badge/License-MIT-green)

## 📋 Tabla de Contenidos

- [Características](#-características)
- [Demo en Vivo](#-demo-en-vivo)
- [Instalación](#-instalación)
- [Uso](#-uso)
- [Tipos de Fractales](#-tipos-de-fractales)
- [Controles](#-controles)
- [Arquitectura](#-arquitectura)
- [Requisitos del Sistema](#-requisitos-del-sistema)
- [Contribuir](#-contribuir)
- [Licencia](#-licencia)
- [Créditos](#-créditos)

## ✨ Características

### 🎯 Fractales Implementados
- **Árbol Fractal** - Generación mediante L-systems con variaciones estocásticas
- **Curva de Koch** - Construcción iterativa con transformaciones geométricas
- **Triángulo de Sierpinski** - Algoritmo de subdivisión recursiva
- **Conjunto de Mandelbrot** - Visualización de dinámica compleja
- **Conjunto de Julia** - Familia paramétrica de fractales complejos

### 🎮 Funcionalidades Interactivas
- **Navegación 3D avanzada** con controles orbitales
- **Transformaciones en tiempo real** (rotación, escala, traslación)
- **Controles táctiles** para dispositivos móviles
- **Exportación de imágenes** en alta resolución
- **Interfaz responsiva** con menú deslizante inteligente
- **Parámetros configurables** para cada tipo de fractal

### 🚀 Tecnologías Utilizadas
- **Three.js r128** - Renderizado 3D con WebGL
- **HTML5 Canvas** - Fractales 2D de alta precisión
- **JavaScript ES6+** - Módulos nativos y sintaxis moderna
- **CSS3** - Diseño responsivo con Grid y Flexbox
- **WebGL 2.0** - Aceleración por hardware

## 🛠️ Instalación

### Opción 1: Desarrollo con Vite (Recomendado)

```bash
# Clonar el repositorio
git clone https://github.com/IMarcusDev/fractals_project_U3_Graphics.git

# Navegar al directorio
cd fractals_project_U3_Graphics

# Instalar dependencias
npm install

# Ejecutar servidor de desarrollo
npm run dev

# El proyecto estará disponible en http://localhost:5173
```

### Opción 2: Build para Producción

```bash
# Después de clonar e instalar dependencias
npm run build

# Para previsualizar el build
npm run preview

# Los archivos de producción estarán en la carpeta 'dist'
```

### Opción 4: Descarga Directa

1. Descargar el [archivo ZIP](https://github.com/IMarcusDev/fractals_project_U3_Graphics/archive/main.zip)
2. Extraer en tu directorio preferido
3. Seguir instrucciones de "Desarrollo con Vite"

## 🎯 Uso

### Inicio Rápido

1. **Abrir la aplicación** en tu navegador (por defecto en `http://localhost:5173`)
2. **Mover el cursor** hacia el borde izquierdo para activar el menú
3. **Seleccionar un fractal** haciendo clic en cualquier botón
4. **Explorar** usando los controles de ratón o táctiles
5. **Ajustar parámetros** con los deslizadores del menú
6. **Guardar imagen** con el botón "Guardar Captura"

### Navegación Detallada

#### 🖱️ Controles de Ratón
```
Arrastrar               → Rotación orbital
Ctrl + Arrastrar        → Movimiento panorámico
Scroll                  → Zoom orbital
Ctrl + Scroll           → Movimiento adelante/atrás
```

#### ⌨️ Atajos de Teclado
```
Flechas                 → Navegación 2D (Mandelbrot/Julia)
+ / -                   → Zoom in/out
R / Q                   → Rotar fractal 3D
Espacio                 → Regenerar fractal
S                       → Guardar imagen
T                       → Reset transformaciones
Home                    → Centrar vista
1 / 3 / 7               → Vistas predefinidas
```

#### 📱 Controles Táctiles
```
1 dedo                  → Rotación
2 dedos                 → Panorámica
Pellizco                → Zoom
```

## 🔢 Tipos de Fractales

### 1. 🌳 Árbol Fractal
- **Algoritmo**: L-systems con variaciones estocásticas
- **Parámetros**: Profundidad (1-12 niveles)
- **Características**: Crecimiento orgánico, ramificación natural

### 2. ❄️ Curva de Koch
- **Algoritmo**: Transformación geométrica iterativa
- **Parámetros**: Iteraciones (1-12)
- **Características**: Perímetro infinito, área finita

### 3. 🔺 Triángulo de Sierpinski
- **Algoritmo**: Subdivisión recursiva
- **Parámetros**: Iteraciones (1-12)
- **Características**: Dimensión fractal ≈ 1.585

### 4. 🌌 Conjunto de Mandelbrot
- **Algoritmo**: Iteración compleja z² + c
- **Parámetros**: Máximo de iteraciones, zoom, posición
- **Características**: Frontera fractal, autosimilaridad infinita

### 5. 🎭 Conjunto de Julia
- **Algoritmo**: Iteración compleja con c constante
- **Parámetros**: Máximo de iteraciones, zoom, posición
- **Características**: Familia paramétrica, c = -0.7 + 0.27015i

## 🎮 Controles

### Panel de Control

El menú lateral se activa automáticamente al mover el cursor cerca del borde izquierdo. Incluye:

- **Selector de Fractales**: 5 botones para diferentes tipos
- **Control de Iteraciones**: Deslizador para ajustar complejidad
- **Transformaciones**: Rotación y escala en tiempo real
- **Acciones**: Guardar, reiniciar, aleatorizar

### Funciones Avanzadas

```javascript
// Funciones globales disponibles
resetView()              // Centrar vista
randomize()             // Parámetros aleatorios
saveCurrentFractal()    // Exportar imagen
resetTransformations()  // Resetear cambios
```

## 🏗️ Arquitectura

### Estructura del Proyecto

```
fractals_project/
├── index.html                 # Página principal
├── src/
│   ├── style.css             # Estilos responsivos
│   ├── main/
│   │   ├── index.js          # Punto de entrada
│   │   ├── scene.js          # Gestión 3D
│   │   ├── ui.js             # Interfaz usuario
│   │   ├── fractals.js       # Coordinador fractales
│   │   └── navigation.js     # Navegación
│   ├── controls/
│   │   ├── index.js          # Exportador controles
│   │   ├── base.js           # Clase base
│   │   ├── mouse.js          # Controles ratón
│   │   ├── keyboard-touch.js # Teclado/táctil
│   │   └── navigation.js     # Auto-navegación
│   ├── fractals/
│   │   ├── fractalTree.js    # Árboles fractales
│   │   ├── kochCurve.js      # Curva de Koch
│   │   ├── sierpinskyTriangle.js # Sierpinski
│   │   ├── mandelbrot.js     # Mandelbrot
│   │   └── julia.js          # Julia
│   └── operations/
│       ├── index.js          # Exportador operaciones
│       ├── core.js           # Estado central
│       ├── controls.js       # Transformaciones
│       ├── ui.js             # UI operaciones
│       └── save.js           # Exportación
└── README.md                 # Este archivo
```

### Patrones de Diseño

- **Módulos ES6**: Separación clara de responsabilidades
- **Patrón Observer**: Comunicación entre componentes
- **Patrón Strategy**: Selección dinámica de algoritmos
- **Patrón Facade**: Interfaces simplificadas

### APIs Principales

```javascript
// Gestión de Escena
SceneManager.init()
SceneManager.renderFractal(fractal, name, type)

// Controles de Navegación
PanControls.centerOnObject()
PanControls.setView(view)

// Generación de Fractales
createFractalTree(depth)
generateKochCurve(iterations)
generateSierpinskyTriangle(iterations)
```

## 💻 Requisitos del Sistema

### Para Desarrollo
- **Node.js**: 16.0.0 o superior
- **npm**: 7.0.0 o superior (incluido con Node.js)
- **Git**: Para clonar el repositorio

### Navegadores Soportados

#### Mínimos
- **Chrome**: 80+
- **Firefox**: 75+
- **Safari**: 13+
- **Edge**: 80+

#### Recomendados
- **Chrome**: 90+
- **Firefox**: 88+
- **Safari**: 14+
- **Edge**: 90+

### Hardware

#### Mínimos
- **RAM**: 2GB disponible
- **GPU**: Soporte WebGL 1.0
- **Resolución**: 1024x768

#### Recomendados
- **RAM**: 4GB disponible
- **GPU**: WebGL 2.0 con aceleración por hardware
- **Resolución**: 1920x1080 o superior

### Verificar Compatibilidad

```bash
# Verificar versión de Node.js
node --version

# Verificar versión de npm
npm --version

# Verificar soporte WebGL en tu navegador
# Visita: https://get.webgl.org/
```
### 🔧 Contribuir Código

1. **Fork** el repositorio
2. **Crear** una rama para tu feature (`git checkout -b feature/nueva-funcionalidad`)
3. **Commit** tus cambios (`git commit -m 'Agregar nueva funcionalidad'`)
4. **Push** a la rama (`git push origin feature/nueva-funcionalidad`)
5. **Crear** un Pull Request

### 📝 Guía de Estilo

- Usar **JavaScript ES6+** con sintaxis moderna
- **Comentar** código complejo
- Seguir **convenciones de nomenclatura** existentes
- **Probar** en múltiples navegadores
- Mantener **rendimiento** optimizado

## 📄 Licencia

Este proyecto está licenciado bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para detalles.

```
MIT License

Copyright (c) 2024 IMarcusDev

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```
