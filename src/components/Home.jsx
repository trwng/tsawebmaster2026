import React, { useRef, useState } from 'react'
import { useMediaQuery } from 'react-responsive'
import { pageNavigation } from '../store'
import FinalSphere from './Globe/FinalSphere'
import Statistics from './Statistics'
import Highlight from './Highlight'
import Location from './Location'
import ExpandedCard from './Globe/ExpandedCard'
import useScrollReveal from "./UseScrollReveal";

const Home = () => {
  const changeCurrentPage = pageNavigation((state) => state.changeCurrentPage)
  const sphereRef = useRef(null)
  const [expanded, setExpanded] = useState(null);
  const topRef = useRef(null);

  useScrollReveal(topRef);

  const isMobile = useMediaQuery({ maxWidth: 767 });

  return (
    <div>
      <section id="landing" ref={topRef} >
        <div className="w-full md:w-[45%]" data-reveal="">
          <div className="text-body">
            <div className="wrapper">
              <p className="location" data-reveal="">| Gwinnett County, GA</p>
              <p className="heading" data-reveal="">
                Find your way into the <span className="text-[#286A6C]" data-reveal="" >community</span>
              </p>
            </div>
            <p className="description" data-reveal="">
              The Gwinnett County’s Community Resource Hub. Scroll through volunteer opportunities and community resources that actually fit your life, with no pressure, just options to get involved when you want.
            </p>
          </div >
          <button onClick={() => changeCurrentPage("Resource Hub")}  >
            Start Exploring
            <img />
          </button>
        </div>

        {!isMobile && (
          <div ref={sphereRef} className="sphereBox">
            <FinalSphere onSelect={setExpanded} />
          </div>
        )}
      </section>

      {isMobile && (
        <hr className="border-[#D4D3D3] border-2 sm:mt-4 mt-10"/>
      )}
      <Statistics sphereRef={sphereRef} />
      {isMobile && (
        <hr className="border-[#D4D3D3] border-2 sm:mb-4 mb-10"/>
      )}
      <Highlight />
      <hr className="border-[#D4D3D3] border-2 sm:mt-4 mt-10"/>
      <Location />
      <ExpandedCard card={expanded} onClose={() => setExpanded(null)} />
    </div>
  )
}

export default Home