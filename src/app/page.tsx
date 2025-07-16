'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { SignUp } from '@/feature/auth/component/signUp';
import { SignIn } from '@/feature/auth/component/signIn';
import styles from './page.module.css';
import { UI } from '@/constant';

export default function Home() {
  const [isState, setIsState] = useState<string>('');
  const [isAnimating, setIsAnimating] = useState(false);
  const [displayState, setDisplayState] = useState<string>('');

  const handleStateChange = (newState: string) => {
    if (isAnimating || newState === isState) return;

    setIsAnimating(true);
    setIsState(newState);
  };

  useEffect(() => {
    if (isState !== displayState) {
      const timer = setTimeout(() => {
        setDisplayState(isState);
        setIsAnimating(false);
      }, 300); // Match the CSS transition duration

      return () => clearTimeout(timer);
    }
  }, [isState, displayState]);

  return (
    <div className={styles.container}>
      {displayState === '' && (
        <div className={`${styles.mainContent} ${isAnimating ? styles.fadeOut : styles.fadeIn}`}>
          <section className={styles.logoSection}>
            <Image
              src="/logo_1.png"
              alt="Logo_1"
              width={60}
              height={60}
              className={styles.logoImage}
            />
            <Image
              src="/logo_2.png"
              alt="Logo_2"
              width={150}
              height={50}
              className={styles.logoImage}
            />
          </section>

          <section className={styles.infoSection}>
            <h1 className={styles.title}>{UI.main.title}</h1>
            <p className={styles.description}>{UI.main.description}</p>
            <button className={styles.button} onClick={() => handleStateChange('signUp')}>
              {UI.main.button}
            </button>
          </section>

          <section className={styles.bottomSection}>
            <div className={styles.separator} />
            <p className={styles.website}>{UI.main.separator}</p>
          </section>
        </div>
      )}

      {displayState === 'signUp' && (
        <div className={`${styles.authContent} ${isAnimating ? styles.fadeOut : styles.fadeIn}`}>
          <SignUp setIsState={handleStateChange} />
        </div>
      )}

      {displayState === 'signIn' && (
        <div className={`${styles.authContent} ${isAnimating ? styles.fadeOut : styles.fadeIn}`}>
          <SignIn setIsState={handleStateChange} />
        </div>
      )}

      <section className={styles.imageSection} />
    </div>
  );
}
