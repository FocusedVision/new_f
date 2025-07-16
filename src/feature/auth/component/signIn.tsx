'use client';

import { useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { IoArrowBack } from 'react-icons/io5';
import styles from './signIn.module.css';
import Image from 'next/image';
import { UI } from '@/constant';

interface FormErrors {
  email?: string;
  password?: string;
}

interface Credentials {
  email: string;
  password: string;
}

export const SignIn = ({ setIsState }: { setIsState?: (state: string) => void }) => {
  const [formData, setFormData] = useState<Credentials>({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const handleBack = () => {
    if (setIsState) {
      setIsState('');
    }
  };

  return (
    <div className={styles.container}>
      <section className={styles.logoSection}>
        <Image src="/logo_1.png" alt="logo_1" width={40} height={40} className={styles.logoImage} />
        <Image
          src="/logo_2.png"
          alt="logo_2"
          width={100}
          height={30}
          className={styles.logoImage}
        />
      </section>

      <p className={styles.title}>{UI.signIn?.title || 'Sign In'}</p>

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.inputGroup}>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className={`${styles.input} ${errors.email ? styles.error : ''}`}
            disabled={false}
          />
          {errors.email && <span className={styles.errorText}>{errors.email}</span>}
        </div>

        <div className={styles.inputGroup}>
          <input
            id="password"
            name="password"
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            className={`${styles.input} ${errors.password ? styles.error : ''}`}
            disabled={false}
          />
          {errors.password && <span className={styles.errorText}>{errors.password}</span>}
        </div>
      </form>

      <div className={styles.buttonGroup}>
        <button type="submit" className={styles.button}>
          {UI.signIn?.button || 'Sign In'}
        </button>

        <button type="submit" className={styles.googleButton}>
          {UI.signIn?.googleButton || 'Sign in with Google'}
          <FcGoogle size={30} />
        </button>
      </div>

      <p className={styles.bottomText}>
        Don't have an account?{' '}
        <span className={styles.bottomTextLink} onClick={() => setIsState?.('signUp')}>
          Sign up
        </span>
      </p>
    </div>
  );
};
