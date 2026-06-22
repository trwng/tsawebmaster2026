import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function useScrollReveal(scopeRef, deps = []) {
  useGSAP(() => {
    const targets = gsap.utils.toArray('[data-reveal]', scopeRef.current);
    if (!targets.length) return;

    // 1. save each element's own transform BEFORE touching it
    const saved = targets.map((el) => el.style.transform || '');

    // 2. hide + offset (this temporarily replaces the transform)
    gsap.set(targets, { opacity: 0, y: 40 });

    ScrollTrigger.batch(targets, {
      start: 'top 88%',
      onEnter: (batch) =>
        gsap.to(batch, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
          stagger: 0.12,
          overwrite: true,
          onComplete() {
            // 3. add the original transform back
            this.targets().forEach((el) => {
              el.style.transform = saved[targets.indexOf(el)] || '';
            });
          },
        }),
    });

    ScrollTrigger.refresh();
  }, { scope: scopeRef, dependencies: deps });
}