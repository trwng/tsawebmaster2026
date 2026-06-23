import React from 'react'
import { pageNavigation } from '../store'
import { headerLinks } from '../constants'

const Footer = () => {
  const changeCurrentPage = pageNavigation((state) => state.changeCurrentPage)

  return (
    <footer>
      <div className="footer-top">
        <div className="footer-about">
          <div className="footer-about-text">
          <button onClick={()=> changeCurrentPage("Home")} className="logo flex items-center gap-2 no-underline text-inherit">
            <img src="/tsawebmaster2026/logo.png" alt="Gwin-Net logo" className="h-10 w-auto" />
            <p className="brand">Gwin-NET</p>
          </button>
            <p className="blurb">
              The Gwinnett County’s Community Resource Hub. Scroll through volunteer opportunities and community resources that actually fit your life, with no pressure, just options to get involved when you want.
            </p>
          </div>
          <button
            className="footer-top-btn"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            Go Back to the Top
          </button>
        </div>

        <div className="footer-nav">
          <p className="footer-nav-title">Navigation</p>
          <ul>
            {headerLinks.map((link) => (
              <li key={link.label}>
                <button onClick={() => changeCurrentPage(link.label)}>
                  {link.label}
                </button>
              </li>
            ))}
            <li>
              <button onClick={() => {}}>Submit Resources</button>
            </li>
            <li>
              <button onClick={() => {}}>Message Us</button>
            </li>
          </ul>
        </div>
      </div>

      <hr className="footer-divider" />

      <div>
        <p className="footer-copy">VolunteerGwinnett. All rights reserved.</p>
      </div>
    </footer>
  )
}

export default Footer