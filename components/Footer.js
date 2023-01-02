import moment from "moment/moment";
import styles from "../styles/Footer.module.scss";

function Footer() {
  return (
    <div className={styles.footer}>
      <div className={styles.left}>Copyright © {moment().year()} all rights reserved</div>
      <div className={styles.right}>
        <a href="https://www.facebook.com/RAQAMYAT" target="_blank" rel="noopener noreferrer">
          <img src="/img/facebook.svg" alt="facebook" />
        </a>
        <a href="https://www.linkedin.com/company/raqamyat" target="_blank" rel="noopener noreferrer">
          <img src="/img/linkedin.svg" alt="linkedin" />
        </a>
        <a href="https://www.instagram.com/raqamyatfintech" target="_blank" rel="noopener noreferrer">
          <img src="/img/instagram.svg" alt="instagram" />
        </a>
      </div>
    </div>
  );
}

export default Footer;
