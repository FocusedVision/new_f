'use client';

import { useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import Image from 'next/image';
import { UI } from '@/constant';
import {
  validateEmail,
  validatePassword,
  validateConfirmPassword,
  ErrorMessage,
} from './signUpRule';
import styles from './signUp.module.css';
import authService from '../service/authService';

interface FormErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}

interface Credentials {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  terms: boolean;
}

export const SignUp = ({ setIsState }: { setIsState: (state: string) => void }) => {
  const [formData, setFormData] = useState<Credentials>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    terms: false,
  });
  const [errors, setErrors] = useState<FormErrors>({});

  const handleSubmit = async() => {
    if (!validateForm()) {
      return;
    }
    const signUpdata ={
      firstName:formData.firstName,
      lastName:formData.lastName,
      email:formData.email,
      password:formData.password,
    }
    await authService.signUp(signUpdata)
  };

  const validateForm = (): boolean => {
    const validationErrors: FormErrors = {};

    const emailError = validateEmail(formData.email);
    const passwordError = validatePassword(formData.password);
    const confirmPasswordError = validateConfirmPassword(
      formData.confirmPassword,
      formData.password,
    );

    if (emailError) {
      validationErrors.email = emailError;
    }

    if (passwordError) {
      validationErrors.password = passwordError;
    }

    if (confirmPasswordError) {
      validationErrors.confirmPassword = confirmPasswordError;
    }

    if (!formData.firstName) {
      validationErrors.firstName = ErrorMessage.REQUIRED.FIRSTNAME;
    }

    if (!formData.email) {
      validationErrors.lastName = ErrorMessage.REQUIRED.LASTNAME;
    }

    if (!formData.email) {
      validationErrors.email = ErrorMessage.REQUIRED.EMAIL;
    }

    if (!formData.password) {
      validationErrors.password = ErrorMessage.REQUIRED.PASSWORD;
    }

    if (!formData.confirmPassword) {
      validationErrors.confirmPassword = ErrorMessage.REQUIRED.CONFIRM_PASSWORD;
    }

    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
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

      <p className={styles.title}>{UI.signUp.title}</p>

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.nameGroup}>
          <div className={styles.inputGroup}>
            <input
              id="firstName"
              name="firstName"
              type="input"
              placeholder="First Name"
              value={formData.firstName}
              onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
              className={`${styles.input} ${errors.email ? styles.error : ''}`}
              disabled={false}
            />
            {errors.firstName && <span className={styles.errorText}>{errors.firstName}</span>}
          </div>
          <div className={styles.inputGroup}>
            <input
              id="lastName"
              name="lastName"
              type="input"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
              className={`${styles.input} ${errors.email ? styles.error : ''}`}
              disabled={false}
            />
            {errors.lastName && <span className={styles.errorText}>{errors.lastName}</span>}
          </div>
        </div>

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

        <div className={styles.inputGroup}>
          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
            className={`${styles.input} ${errors.confirmPassword ? styles.error : ''}`}
            disabled={false}
          />
          {errors.confirmPassword && (
            <span className={styles.errorText}>{errors.confirmPassword}</span>
          )}
        </div>

        <div className={styles.checkboxGroup}>
          <input
            type="checkbox"
            id="terms"
            name="terms"
            className={styles.checkbox}
            checked={formData.terms}
            onChange={(e) => setFormData({ ...formData, terms: e.target.checked })}
          />
          <label
            htmlFor="terms"
            dangerouslySetInnerHTML={{ __html: UI.signUp.checkbox }}
            className={styles.checkboxLabel}
          />
        </div>
      </form>

      <div className={styles.buttonGroup}>
        <button type="submit" className={styles.button} onClick={handleSubmit}>
          {UI.signUp.button}
        </button>

        <button type="submit" className={styles.googleButton}>
          {UI.signUp.googleButton}
          <FcGoogle size={30} />
        </button>
      </div>

      <p className={styles.bottomText}>
        Already have an account?{' '}
        <span className={styles.bottomTextLink} onClick={() => setIsState('signIn')}>
          Sign in
        </span>
      </p>
    </div>
  );
};
