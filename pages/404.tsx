/* eslint-disable @next/next/no-img-element */
import type { NextPage } from 'next';
import Head from 'next/head';
import styles from '../styles/Q.module.css';

const P404: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>404! Page not found.</title>
      </Head>
      
      <div className={styles.four}><span>404</span></div>
    </div>
  );
};

export default P404;
