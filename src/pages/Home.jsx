import React, { useEffect, useRef } from 'react';
import { useAnimation } from 'framer-motion';
import '../styles/Home.scss';
import TypingTitle from '../components/home/TypingTitle';
import StarNavbar from '../components/home/StarNavbar';
import ScrollContent from '../components/home/ScrollContent';

const Home = () => {
  const canvasRef = useRef(null);
  const animationFrameIdRef = useRef(null);
  const controls = useAnimation();
  const titleControls = useAnimation();

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const stars = [];
    const numStars = 100;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const constellation = [
      { x: 690, y: 590 },
        { x: 759, y: 521 }, 
        { x: 862, y: 268 }, 
        { x: 989, y: 210 },  
        { x: 966, y: 153 },  
        { x: 1092, y: 199 }, 
        { x: 1219, y: 268 }, 
        { x: 1219, y: 325 },
        { x: 1265, y: 360 },
        { x: 1242, y: 406 }, 
        { x: 1138, y: 383 },
        { x: 1000, y: 406 }, 
        { x: 816, y: 532 }, 
        { x: 828, y: 624 },
        { x: 770, y: 578 }
    ];

    function createStars() {
      for (let i = 0; i < numStars; i++) {
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 1,
          alpha: Math.random() * 1,
          speed: Math.random() * 0.01
        });
      }
    }

    function drawStars() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      stars.forEach((star) => {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, 2 * Math.PI, false);
        ctx.fillStyle = `rgba(255, 255, 255, ${star.alpha})`;
        ctx.fill();

        star.alpha += star.speed;
        if (star.alpha >= 1 || star.alpha <= 0) {
          star.speed = -star.speed;
        }
      });

      ctx.beginPath();
      ctx.lineWidth = 0.7; 
      ctx.strokeStyle = 'white';

      ctx.moveTo(constellation[0].x, constellation[0].y);

      for (let i = 1; i < constellation.length; i++) {
        ctx.lineTo(constellation[i].x, constellation[i].y);
      }

      ctx.closePath(); 

      ctx.stroke();

      constellation.forEach((star) => {
        for (let i = 10; i > 0; i--) { 
          ctx.beginPath();
          ctx.arc(star.x, star.y, i * 3, 0, 2 * Math.PI, false);
          ctx.fillStyle = `rgba(255, 255, 255, ${0.1 / i})`; 
          ctx.fill();
        }
      
        ctx.beginPath();
        ctx.arc(star.x, star.y, 3, 0, 2 * Math.PI, false);
        ctx.fillStyle = 'white'; 
        ctx.fill();
      });

      animationFrameIdRef.current = requestAnimationFrame(drawStars);
    }

    createStars();
    drawStars();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    };

    window.addEventListener('resize', handleResize);

    const handleScroll = () => {
      const scrollY = window.scrollY;
      // console.log(scrollY);

      if (scrollY > 20) {
        controls.start({
          y: 80,
          opacity: 1,
          transition: { duration: 1, ease: 'easeOut' }
        });

        titleControls.start({
          y: 0,
          transition: { duration: 1, ease: 'easeOut' }
        });
      }else{
        controls.start({
          y: 100,
          opacity: 1,
          transition: { duration: 1, ease: 'easeOut' }
        });

        titleControls.start({
          y: 10,
          transition: { duration: 1, ease: 'easeOut' }
        });
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(animationFrameIdRef.current);
    };
  }, [controls]);

  return (
    <div className="home-container">
      <canvas ref={canvasRef} id="star-canvas"></canvas>
      <StarNavbar />
      <section>
        <TypingTitle title={"Hello!🖐️ Welcome to Jiwon Park's Universe of Ideas🐬"} controls={titleControls} />
        <ScrollContent controls={controls} />
      </section>
    </div>
  );
};

export default Home;
