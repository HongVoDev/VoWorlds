import React, { useEffect } from 'react'
import './Landing.css';
import { Link } from "react-router-dom"
import AOS from 'aos';
import 'aos/dist/aos.css';

const Landing = () => {
  useEffect(() => {
          AOS.init();
      }, [])

  useEffect(() => {
    const handleScroll = () => {
    const ring = document.getElementById('ring');
    const mount = document.getElementById('mnt');
    const screenWidth = window.innerWidth; 
    let initalPosition = 0;
    let offset = 0;
    if (screenWidth > 900){
      offset = 0.2;
    }
    else {
      offset = 0.65;
      initalPosition = window.innerHeight;
    }
    if (ring) {
    let scrollPosition = window.pageYOffset;
      if(scrollPosition === 0){
        ring.style.transform = 'scale(3)';
      }
      else{
        ring.style.transform = 'translateY(' + scrollPosition * offset + 'px)';
      }
    }
    if(mount) {
      let scrollPosition = window.pageYOffset;
      mount.style.transform = 'translateY(-' + scrollPosition * 0.2 + 'px)';
    }
    };
    
    document.addEventListener('scroll', handleScroll);
    
    return () => {
    document.removeEventListener('scroll', handleScroll);
    };
    }, []);
  return (
    <article>
      <div class="header-text-box">
        <div class="header-text" data-aos="fade-in" 
            data-aos-duration="2000"
            data-aos-easing="ease-in-out">Lord Of The Rings</div>
        <div class="subheader" data-aos="fade-in" 
            data-aos-duration="2000"
            data-aos-easing="ease-in-out">3D Landmarks Model Viewer</div>
      </div>
    <figure class="ring-container"
    data-aos="fade-in" 
            data-aos-duration="500"
            data-aos-easing="ease-in" 
            data-aos-offset="100" >
      
      <img id="ring" src='../ring.png'/>
      <img id="mnt" src='../mount.png'/>
    </figure>
    <section class="back">
        <div class="indiv" data-aos="fade-in"
            data-aos-duration="1000"
            data-aos-easing="ease-in-out" >
          <p class="intro-header">Welcome to the Fellowship</p>
            <p class="intro">As a LOTR fan, I’ve always wanted to build<br/>
 a website about Middle-earth. Each landmark represents 
 an aspect of my skillset and professional background, click on one to explore.
            </p>
        </div>
    </section>  


<section class="new-section">
        <Link to="/rivendell">  
            <div class="item banner first-item">
                <span>Rivendell</span>
            </div>
        </Link>
                  <Link to="/rohan">
	<div class="item banner third-item"><span>Edoras</span></div>
        </Link>
        <Link to="/gondor">
	<div class="item banner second-item"><span>Minas Tirith</span></div>
        </Link>
        <Link to="/mordor">
	<div class="item banner fourth-item"><span>Barad-dûr</span></div>
        </Link>
</section>

  </article>
  
  )
}

export default Landing