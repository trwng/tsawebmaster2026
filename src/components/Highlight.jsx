import React, { useState, useRef } from 'react'
import { useMediaQuery } from 'react-responsive'
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { pageNavigation } from '../store'
import useScrollReveal from "./UseScrollReveal";

const Chevron = () => (
  <svg
    className="pointer-events-none h-4 w-4 text-gray-400"
    xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"
  >
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
  </svg>
);

const Arrow = () => {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      fill="none" 
      viewBox="0 0 24 24" 
      strokeWidth={2.5} 
      stroke="currentColor" 
      className="w-6 h-6 shrink-0 md:w-8 md:h-8"
    >
      <path 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" 
      />
    </svg>
  );
};

const items = [
  {
    id: 's4',
    tag: 'Housing & Community Development',
    title: 'Build Homes for Local Families',
    description: 'Join Gwinnett/Walton Habitat for Humanity and help construct affordable housing for families in need. Volunteers work alongside community members on building projects that create lasting change and strengthen neighborhoods throughout Gwinnett County.',
  },
  {
    id: 's2',
    tag: 'Senior Services',
    title: 'Support Seniors in the Community',
    description: 'Volunteer with Gwinnett County programs that assist older adults through meal delivery, transportation, lawn care, and home maintenance. These services help seniors remain independent while building meaningful connections with volunteers.',
  },
  {
    id: 's8',
    tag: 'Food Assistance',
    title: 'Help Fight Hunger In Gwinnett',
    description: 'Work with local organizations such as North Gwinnett Co-Op or Southeast Gwinnett Cooperative Ministry to sort donations, prepare food packages, and distribute groceries to families facing food insecurity. Every volunteer shift directly supports neighbors in need.',
  },
];

const Highlight = () => {
  const componentRef = useRef(null);
  const changeCurrentPage = pageNavigation((state) => state.changeCurrentPage)
  const setSelectedOpportunityId = pageNavigation((s) => s.setSelectedOpportunityId)

  const isMobile = useMediaQuery({ maxWidth: 767 });
  const [openIndex, setOpenIndex] = useState(0);
  
  useScrollReveal(componentRef);

  const openInHub = (idd) => {
    setSelectedOpportunityId(idd)
    changeCurrentPage('Resource Hub')
  }

  useGSAP(() => {
    if (isMobile) return;
    const blocks = gsap.utils.toArray('.block', componentRef.current);
    let currentActiveBlock = blocks[0];

    blocks.forEach((b) => {
      gsap.set(b, { flexGrow: .8 });
      gsap.set(b.querySelector('.inner_view'), { opacity: 0 });
      gsap.set(b.querySelector('.outer_view'), { opacity: 1 });
    });

    const apply = (active) => {
      blocks.forEach((b) => {
        const on = b === active;
        gsap.to(b, { flexGrow: on ? 3 : .8, duration: 1, ease: 'power3.out', overwrite: 'auto' });
        gsap.to(b.querySelector('.outer_view'), { opacity: on ? 0 : 1, duration: 0, overwrite: 'auto' });
        gsap.to(b.querySelector('.inner_view'), { opacity: on ? 1 : 0, duration: on ? 0.6 : 0.3, overwrite: 'auto' });
      });
    };
    if (currentActiveBlock) apply(currentActiveBlock);

    blocks.forEach((b) => b.addEventListener('mouseenter', () => apply(b)));
  }, [isMobile]);

  return (
    <section id="highlights" ref={componentRef} className={isMobile ? 'highlights-mobile' : '' } data-reveal="">
      <div className="flex flex-col items-center">
        <p className="text-4xl md:text-7xl text-[#286A6C] font-bold" data-reveal="">Highlighted Resources</p>
        <p className="text-lg md:text-3xl text-center" data-reveal="">The ones making the biggest differences in Gwinnett</p>
      </div>

      {isMobile ? (
        /* ---------- MOBILE: vertical click-accordion ---------- */
        <div className="block_container">
          {items.map((it, idx) => {
            const open = openIndex === idx;
            return (
              <div data-reveal="" key={it.id} className={`block ${open ? 'is-open' : ''}`}>
                <button
                  className="block_header"
                  onClick={() => setOpenIndex(open ? -1 : idx)}
                  aria-expanded={open}
                >
                  <span className="title">{it.title}</span>
                  <span className="chevron">
                    <Chevron/>
                  </span>
                </button>
                <div className="block_body">
                  <div className="block_body_inner">
                    <div className="block_body_content">
                      <p className="tag">{it.tag}</p>
                      <p className="description">{it.description}</p>
                      <button onClick={() => openInHub(it.id)}>Learn More <Arrow/> </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* ---------- DESKTOP: horizontal hover-accordion ---------- */
        <div className="block_container" >
          {items.map((it) => (
            <div className="block" key={it.id} data-reveal="">
              <div className="outer_view">
                <div className="upper_line" />
                <div className="lower_line" />
                <p className="title">{it.title}</p>
              </div>
              <div className="inner_view">
                <div className="inner_container">
                  <div className="header_container">
                    <p className="tag">{it.tag}</p>
                    <p className="title">{it.title}</p>
                  </div>
                  <p className="description">{it.description}</p>
                </div>
                <button onClick={() => openInHub(it.id)}>Learn More <Arrow/> </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="w-full">
        <button onClick={() => changeCurrentPage("Resource Hub")}>Start Discovering <Arrow/> </button>
      </div>
    </section>
  )
}

export default Highlight