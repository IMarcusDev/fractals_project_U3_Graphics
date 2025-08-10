import * as THREE from 'three';
import { operationState } from './core.js';

export function showSaveNotification(type, message) {
    const notification = document.createElement('div');
    notification.className = `save-notification ${type}`;
    notification.textContent = message;

    Object.assign(notification.style, {
        position: 'fixed', top: '80px', right: '20px', padding: '12px 20px',
        borderRadius: '8px', color: 'white', fontWeight: '600', zIndex: '10000',
        fontSize: '14px', maxWidth: '300px', boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
        transform: 'translateX(400px)', transition: 'all 0.3s ease'
    });

    const colors = {
        success: '#4CAF50', error: '#f44336', warning: '#ff9800', info: '#2196F3'
    };
    
    notification.style.backgroundColor = colors[type] || colors.info;
    document.body.appendChild(notification);

    setTimeout(() => notification.style.transform = 'translateX(0)', 100);
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            if (notification.parentNode) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, 4000);
}

export function fallbackSave3D() {
    try {
        operationState.renderer.render(operationState.scene, operationState.camera);
        
        requestAnimationFrame(() => {
            try {
                const dataURL = operationState.renderer.domElement.toDataURL('image/png', 1.0);
                
                if (dataURL && dataURL.length > 100) {
                    const timestamp = new Date().toISOString().replace(/[:.]/g, '-').split('.')[0];
                    const filename = `fractal-${operationState.currentFractalType || 'unknown'}-${timestamp}.png`;
                    
                    const link = document.createElement('a');
                    link.download = filename;
                    link.href = dataURL;
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                    
                    showSaveNotification('success', 'Imagen guardada correctamente');
                } else {
                    showSaveNotification('error', 'La imagen está vacía');
                }
            } catch (error) {
                showSaveNotification('error', 'Error al procesar la imagen');
            }
        });
    } catch (error) {
        showSaveNotification('error', 'Error en guardado alternativo');
    }
}

function save2DFractal() {
    const canvasId = operationState.currentFractalType === 'mandelbrot' ? 'mandelbrot' : 'julia';
    const canvas = document.getElementById(canvasId);
    
    if (canvas) {
        const ctx = canvas.getContext('2d');
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        let hasContent = false;

        for (let i = 3; i < imageData.data.length; i += 4) {
            if (imageData.data[i] > 0) {
                hasContent = true;
                break;
            }
        }
        
        if (!hasContent) {
            if (operationState.currentFractalType === 'mandelbrot' && window.drawMandelbrot) {
                window.drawMandelbrot();
                setTimeout(() => window.saveCurrentFractal(), 500);
                return;
            } else if (operationState.currentFractalType === 'julia' && window.drawJulia) {
                window.drawJulia();
                setTimeout(() => window.saveCurrentFractal(), 500);
                return;
            }
        }

        const timestamp = new Date().toISOString().replace(/[:.]/g, '-').split('.')[0];
        const filename = `fractal-${operationState.currentFractalType}-${timestamp}.png`;
        
        canvas.toBlob(function(blob) {
            if (blob) {
                const url = URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.download = filename;
                link.href = url;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                URL.revokeObjectURL(url);
                
                showSaveNotification('success', 'Imagen guardada correctamente');
            } else {
                showSaveNotification('error', 'Error al guardar la imagen');
            }
        }, 'image/png', 1.0);
        
    } else {
        showSaveNotification('error', 'Canvas no encontrado');
    }
}

function save3DFractal() {
    if (operationState.renderer && operationState.scene && operationState.camera) {
        if (!operationState.currentFractal || operationState.currentFractal.children.length === 0) {
            showSaveNotification('warning', 'No hay fractal para guardar');
            return;
        }

        const originalSize = operationState.renderer.getSize(new THREE.Vector2());
        const captureWidth = Math.min(1920, originalSize.x * 2);
        const captureHeight = Math.min(1080, originalSize.y * 2);

        const captureRenderer = new THREE.WebGLRenderer({ 
            preserveDrawingBuffer: true,
            antialias: true,
            alpha: true
        });
        
        captureRenderer.setSize(captureWidth, captureHeight);
        captureRenderer.setPixelRatio(2);
        captureRenderer.setClearColor(0xffffff, 1);
        captureRenderer.render(operationState.scene, operationState.camera);

        const timestamp = new Date().toISOString().replace(/[:.]/g, '-').split('.')[0];
        const filename = `fractal-${operationState.currentFractalType || 'unknown'}-${timestamp}.png`;
        
        try {
            captureRenderer.domElement.toBlob(function(blob) {
                if (blob && blob.size > 0) {
                    const url = URL.createObjectURL(blob);
                    const link = document.createElement('a');
                    link.download = filename;
                    link.href = url;
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                    URL.revokeObjectURL(url);
                    
                    showSaveNotification('success', `Imagen guardada: ${filename}`);
                } else {
                    fallbackSave3D();
                }
                captureRenderer.dispose();
            }, 'image/png', 1.0);
            
        } catch (error) {
            captureRenderer.dispose();
            fallbackSave3D();
        }
        
    } else {
        showSaveNotification('error', 'Error de configuración del renderizador');
    }
}

export function setupGlobalSaveFunction() {
    if (typeof window !== 'undefined') {
        window.saveCurrentFractal = function() {
            try {
                if (operationState.currentFractalType === 'mandelbrot' || operationState.currentFractalType === 'julia') {
                    save2DFractal();
                } else {
                    save3DFractal();
                }
            } catch (error) {
                showSaveNotification('error', 'Error inesperado al guardar');
            }
        };
    }
}