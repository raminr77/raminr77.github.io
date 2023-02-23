import { useCallback } from 'react';
import Particles from 'react-particles';
import { loadFull } from 'tsparticles';
import { animator } from '@/shared/utils/animator';

export function BlackSectionParticles() {
  const particlesInit = useCallback(async (engine: any) => {
    await loadFull(engine);
  }, []);

  return (
    <Particles
      id='particles'
      className={animator({ name: 'fadeIn', delay: '2s' })}
      init={particlesInit}
      options={{
        retina_detect: true,
        fullScreen: {
          zIndex: 1,
          enable: true
        },
        particles: {
          number: {
            value: 80,
            density: {
              enable: true,
              value_area: 800
            }
          },
          color: {
            value: '#ffffff'
          },
          shape: {
            type: 'circle',
            stroke: {
              width: 0,
              color: '#000000'
            },
            polygon: {
              nb_sides: 5
            }
          },
          opacity: {
            value: 1,
            random: true,
            anim: {
              enable: true,
              speed: 1,
              opacity_min: 0,
              sync: false
            }
          },
          size: {
            value: 2,
            random: true,
            anim: {
              enable: false,
              speed: 4,
              size_min: 0.3,
              sync: false
            }
          },
          line_linked: {
            enable: false,
            distance: 150,
            color: '#ffffff',
            opacity: 0.4,
            width: 1
          },
          move: {
            enable: true,
            speed: 1,
            direction: 'none',
            random: true,
            straight: false,
            out_mode: 'out',
            bounce: false,
            attract: {
              enable: false,
              rotateX: 600,
              rotateY: 600
            }
          },
          rotate: {
            value: 0,
            random: true,
            direction: 'clockwise',
            animation: {
              enable: true,
              speed: 5,
              sync: false
            }
          }
        },
        interactivity: {
          events: {
            onhover: {
              enable: true,
              mode: ['grab']
            },
            onclick: {
              enable: true,
              mode: 'push'
            },
            resize: true
          },
          modes: {
            grab: {
              distance: 100,
              line_linked: {
                opacity: 0.3
              }
            },
            bubble: {
              size: 0,
              speed: 3,
              opacity: 0,
              duration: 2,
              distance: 250
            },
            repulse: {
              duration: 0.4,
              distance: 400
            },
            push: {
              particles_nb: 4
            },
            remove: {
              particles_nb: 2
            }
          }
        },
        background: {
          image: '',
          color: '#000',
          size: 'cover',
          position: '50% 50%',
          repeat: 'no-repeat'
        }
      }}
    />
  );
}
