import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function useScrollReveal(scopeRef, deps = []) {
  useGSAP(() => {
    const targets = gsap.utils.toArray('[data-reveal]', scopeRef.current);
    if (!targets.length) return;

    // Remove the manual "saved" mapping step completely

    // Hide + offset initially
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
          overwrite: 'auto', // Changed to 'auto' to handle overlapping tweens cleanly
          onComplete() {
            // Clean up the inline y property without wiping away other styles safely
            gsap.set(this.targets(), { clearProps: "y" });
          },
        }),
    });

    ScrollTrigger.refresh();
  }, { scope: scopeRef, dependencies: deps });
}