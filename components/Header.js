import Link from "next/link";
import styles from "../styles/Header.module.scss";

export default function Header() {
  return (
    <div className={styles.header}>
      <div className={styles.left}>
        <Link href="/about">About</Link>
        <Link href="/webinars">Webinars</Link>
      </div>
      <div className={styles.center}><Link href={"/"}><img src="/img/logo.png" alt="logo" /></Link></div>
      <div className={styles.right}>
      <button className={styles.applyBtn}>Apply For Free</button>
      <button className={styles.searchBtn}><img src="/img/search.svg" alt="search"/></button>

      </div>
    </div>
  );
}

