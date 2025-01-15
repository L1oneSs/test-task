"use client";

import Link from "next/link";
import styles from "./not-found.module.scss";

export default function NotFound() {
  return (
    <div className={styles.notFound}>
      <div className={styles.notFound__container}>
        <h1 className={styles.notFound__title}>404</h1>
        <p className={styles.notFound__text}>Страница не найдена</p>
        <Link href="/" className={styles.notFound__button}>
          Вернуться на главную
        </Link>
      </div>
    </div>
  );
}
