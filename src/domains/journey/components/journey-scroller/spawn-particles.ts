const PARTICLE_COUNT = 20;
const PARTICLE_COLOR = 'rgb(245, 158, 11)'; // amber-500

export function spawnParticles(element: HTMLElement): void {
  const rect = element.getBoundingClientRect();

  for (let i = 0; i < PARTICLE_COUNT; i++) {
    const y = 260;
    const x = rect.left + Math.random() * rect.width;

    const driftX = (Math.random() - 0.5) * 20;
    const riseY = -(90 + Math.random() * 90);
    const size = 4 + Math.random() * 4;

    const particle = document.createElement('div');

    Object.assign(particle.style, {
      top: `${y}px`,
      zIndex: '9999',
      left: `${x}px`,
      position: 'fixed',
      width: `${size}px`,
      height: `${size}px`,
      borderRadius: '50%',
      pointerEvents: 'none',
      background: PARTICLE_COLOR
    });

    document.body.appendChild(particle);

    const animation = particle.animate(
      [
        { transform: 'translate(0, 0) scale(1)', opacity: '1' },
        { transform: `translate(${driftX}px, ${riseY}px) scale(0)`, opacity: '0' }
      ],
      {
        duration: 700 + Math.random() * 2000,
        easing: 'ease-out',
        fill: 'forwards'
      }
    );

    animation.onfinish = () => particle.remove();
  }
}
