import React from 'react';
import { motion } from 'framer-motion';
import '../../styles/ScrollContent.scss';

const ScrollContent = ({ controls }) => {
  return (
    <motion.div
      className="scroll-content"
      initial={{ y: 200, opacity: 0 }}
      animate={controls}
    >
        <p>
        Hello! I'm <strong>Jiwon Park</strong>, a computer engineering student with a passion for React and front-end development.
        </p>
        <p>
        Welcome to my small universe, where every line of code reflects my ideas and dreams.
        </p>
        <p>
        Join me in exploring and finding inspiration. You're always welcome here!
        </p>

    </motion.div>
  );
};

export default ScrollContent;
