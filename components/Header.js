import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import styles from "../styles/Header.module.scss";


export default function Header() {
  const { asPath } = useRouter();
  useEffect(() => {
    console.log(asPath)
  }, []);
  return (
    <div className={styles.header}>
      <div className={styles.left}>
        <Link className={ asPath.startsWith("/about") ? styles.activeMenuLink : styles.menuLink } href="/about">About <span /></Link>
        <Link className={asPath.startsWith("/webinars") ? styles.activeMenuLink : styles.menuLink} href="/webinars">Webinars <span /></Link>
      </div>
      <div className={styles.center}><Link href="/"><img src="/img/logo.png" alt="logo" /></Link></div>
      <div className={styles.right}>
      <button className={styles.applyBtn}>Apply For Free</button>
      <button className={styles.searchBtn}><img src="/img/search.svg" alt="search"/></button>
      </div>
    </div>
  );
}

