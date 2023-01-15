import styles from "../styles/about.module.scss";
import Link from "next/link";
import Head from "next/head";


function about() {
  return (
    <>
    <Head>
    <title>About - Raqamyat Webinar</title>
    </Head>
    <div className={styles.about}>
      <div className={styles.title}>
        <span>About Raqamyat Webinars</span>
      </div>
      <div className={styles.subtitle}>
        <div>
          <span>FinTech Knowledge Unlocked</span>
        </div>
        <div>
          <span>with Raqamyat Webinars</span>
        </div>
      </div>
      <div className={styles.desc}>
      Our webinars are where you can get the latest news about the eCommerce field. Here we cover the latest FinTech solutions and trends; as we believe that learning is a treasure that will follow its owner everywhere, our webinars will be the treasure for every eCommerce opportunity hunter because we’re gathering the leading professionals in the market to share their experience and knowledge that they gained during the years to you.
      </div>

      <div className={styles.subDesc}>
      <div className={styles.start}>
        <p>
        If you’re looking for knowledge, then you've arrived at the right place. Here you will find all of our recorded webinars with eCommerce specialists from around the globe to watch whenever you wish.
        </p>
        <p>
        Attending live webinars can be more valuable. You will be able to ask our speakers questions and share your experience too.
        </p>
        <p>
        Now it’s your turn to share your knowledge and experience with Raqamyat. If you have experience with any eCommerce-related field, please don’t hesitate to apply. We would love to listen.
        </p>
        <div className={styles.allWebinarsLink}>
              <Link href="/webinars">
                <div>all webinars</div>
                <img src="/img/up-right-arrow.svg" alt="arrow" />
              </Link>
            </div>
        </div>
        <div className={styles.end}>
          <div className={styles.top}>
        <img src="/img/shapes3.svg" alt="about"  />
        </div>
        <div className={styles.bottom}>
        <div>
        <a>Checkout</a><a href="https://raqamyat.com/" target="_blank" rel="noopener noreferrer"> <img className={styles.raqLogo} src="/img/logo.svg" alt="raqamyat" />
        <img className={styles.arrow} src="/img/up-right-arrow.svg" alt="arrow" /></a>
      <a>  website to learn more about our services</a>

        </div>

        </div>
        </div> 
      </div>

    </div>
    </>
  );
}

export default about;
