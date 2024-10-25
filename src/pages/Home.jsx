import React, { useEffect, useRef } from 'react';
import '../styles/Home.scss';
import TypingTitle from '../components/home/TypingTitle';

const Home = () => {
  const canvasRef = useRef(null);
  const animationFrameIdRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const stars = [];
    const numStars = 100;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // 별 생성
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

    // 별 그리기
    function drawStars() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      stars.forEach((star) => {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, 2 * Math.PI, false);
        ctx.fillStyle = `rgba(255, 255, 255, ${star.alpha})`;
        ctx.fill();

        // 반짝이는 효과
        star.alpha += star.speed;
        if (star.alpha >= 1 || star.alpha <= 0) {
          star.speed = -star.speed;
        }
      });

      animationFrameIdRef.current = requestAnimationFrame(drawStars); // 애니메이션 루프를 지속
    }

    createStars();
    drawStars(); // 애니메이션 시작

    // 화면 크기 변경 처리
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      ctx.clearRect(0, 0, canvas.width, canvas.height); // 리사이즈 시 캔버스 클리어
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameIdRef.current);
    };
  }, []);

  return (
    <div className="home-container">
      <canvas ref={canvasRef} id="star-canvas"></canvas>
      <TypingTitle title={"Hello!🖐️ Welcome to Jiwon Park's blog🐬"} />
    </div>
  );
};

export default Home;
