/**
 * Cases Language Services - Premium UI/UX Interaction Engine (2026 Edition)
 * Lógica de interacciones fluidas de alto rendimiento físico y visual.
 */
class PremiumInteractions {
    constructor() {
        console.log("✨ PremiumInteraction Engine 2026 Initialized: Elevating tactile and fluid feedback.");
    }

    /**
     * 1. Efecto de Inclinación 3D (Tilt) y Brillo de Cristal Dinámico (Spotlight)
     * Aplica una rotación física tridimensional real a las tarjetas de servicio.
     */
    setupGlassmorphicCards() {
        // Selecciona las tarjetas de servicio y de detalles de todas tus páginas
        const cards = document.querySelectorAll('.service-card, .detail-card');

        cards.forEach(card => {
            // Inyectamos dinámicamente un elemento de brillo interno para simular la luz del vidrio
            if (!card.querySelector('.card-glass-shimmer')) {
                const shimmer = document.createElement('div');
                shimmer.className = 'card-glass-shimmer';
                // Estilo básico de posicionamiento absoluto para el brillo por software
                Object.assign(shimmer.style, {
                    position: 'absolute',
                    top: '0',
                    left: '0',
                    width: '100%',
                    height: '100%',
                    background: 'radial-gradient(circle 180px at var(--mouse-x, 0) var(--mouse-y, 0), rgba(255, 255, 255, 0.15), transparent 80%)',
                    pointerEvents: 'none',
                    zIndex: '1',
                    opacity: '0',
                    transition: 'opacity 0.4s ease'
                });
                card.appendChild(shimmer);
            }

            card.addEventListener('mousemove', (e) => this.handleCardMove(e, card));
            card.addEventListener('mouseenter', (e) => this.handleCardEnter(e, card));
            card.addEventListener('mouseleave', (e) => this.handleCardLeave(e, card));
        });
    }

    handleCardEnter(event, card) {
        const shimmer = card.querySelector('.card-glass-shimmer');
        if (shimmer) shimmer.style.opacity = '1';
        // Desactivamos temporalmente la transición CSS de transform para que el seguimiento del mouse sea inmediato y sedoso
        card.style.transition = 'background var(--transition-speed), border var(--transition-speed), box-shadow var(--transition-speed)';
    }

    handleCardMove(event, card) {
        const rect = card.getBoundingClientRect();
        
        // Coordenadas relativas del cursor dentro de la tarjeta
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        // Actualiza las variables de CSS para mover el brillo radial interactivo
        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);

        // Cálculo para la rotación de perspectiva física 3D
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        // Limita la rotación a un máximo sutil de 6 grados para mantener la elegancia premium
        const rotateX = ((centerY - y) / centerY) * 6; 
        const rotateY = ((x - centerX) / centerX) * 6;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
    }

    handleCardLeave(event, card) {
        const shimmer = card.querySelector('.card-glass-shimmer');
        if (shimmer) shimmer.style.opacity = '0';

        // Al salir, devolvemos el control al CSS aplicando la transición suave para restablecer la tarjeta
        card.style.transition = 'transform var(--transition-speed), background var(--transition-speed), border var(--transition-speed), box-shadow var(--transition-speed)';
        card.style.transform = '';
        
        // Removemos los estilos inline después de que termine la transición para evitar conflictos
        setTimeout(() => {
            if (!card.matches(':hover')) {
                card.style.transform = '';
            }
        }, 500); // Sincronizado con la transición de 0.5s del CSS
    }

    /**
     * 2. Feedback Háptico/Físico de Botones Premium
     * Controla la pulsación física tridimensional de los botones de acción sin solaparse con los hovers de CSS.
     */
    setupButtonInteractions() {
        const buttons = document.querySelectorAll('.cta-button, .language-selector-btn');
        
        buttons.forEach(button => {
            button.addEventListener('mousedown', () => {
                button.style.transform = 'translateY(1px) scale(0.97)';
                button.style.transition = 'transform 0.1s ease';
            });

            button.addEventListener('mouseup', () => {
                button.style.transform = '';
                button.style.transition = ''; // Devuelve el control a la transición del CSS
            });

            button.addEventListener('mouseleave', () => {
                button.style.transform = '';
                button.style.transition = '';
            });
        });
    }

    /**
     * 3. Lógica y Microanimación de Menú Desplegable de Idiomas
     * Controla la visibilidad de manera adaptada y premium para el menú de idiomas.
     */
    setupLanguageDropdown() {
        const openBtn = document.getElementById('openLanguageListBtn');
        const langList = document.getElementById('language-list');

        if (openBtn && langList) {
            const toggleDropdown = (e) => {
                e.stopPropagation();
                const isCurrentlyHidden = langList.hasAttribute('hidden');
                
                if (isCurrentlyHidden) {
                    // 1. Quitamos la propiedad "hidden" para añadirlo al flujo visual del DOM
                    langList.removeAttribute('hidden');
                    openBtn.setAttribute('aria-expanded', 'true');
                    
                    // 2. Ejecutamos la clase activa para que las transiciones CSS actúen fluidamente
                    requestAnimationFrame(() => {
                        langList.classList.add('active');
                    });
                } else {
                    closeDropdown();
                }
            };

            const closeDropdown = () => {
                langList.classList.remove('active');
                openBtn.setAttribute('aria-expanded', 'false');
                
                // Esperamos a que la animación de desvanecimiento termine antes de ocultarlo por completo con "hidden"
                setTimeout(() => {
                    if (!langList.classList.contains('active')) {
                        langList.setAttribute('hidden', '');
                    }
                }, 300); // Ajustado a la velocidad de transición
            };

            // Evento para abrir o cerrar al presionar el botón de Idiomas
            openBtn.addEventListener('click', toggleDropdown);

            // Cierra el selector de idiomas de manera interactiva si se hace clic fuera de su contenedor
            document.addEventListener('click', (e) => {
                if (!langList.hasAttribute('hidden') && !langList.contains(e.target) && e.target !== openBtn) {
                    closeDropdown();
                }
            });

            // Soporte de accesibilidad para cerrar usando la tecla Escape
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && !langList.hasAttribute('hidden')) {
                    closeDropdown();
                    openBtn.focus();
                }
            });
        }
    }

    /**
     * Inicializador maestro.
     */
    init() {
        this.setupGlassmorphicCards();
        this.setupButtonInteractions();
        this.setupLanguageDropdown();
    }
}

// Inicialización del DOM lista para entornos de producción modernos
document.addEventListener('DOMContentLoaded', () => {
    const interactionManager = new PremiumInteractions();
    interactionManager.init();
});