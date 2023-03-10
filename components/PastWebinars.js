import styles from "../styles/PastWebinars.module.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import moment from "moment";
import DateRangeIcon from "@mui/icons-material/DateRange";
import { Navigation } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import useWindowSize from "../hooks/useWindowSize";
import { useRouter } from "next/router";

function PastWebinars({ pastWebinars }) {
  const width = useWindowSize();
  const router = useRouter();

  return (
    <div className={styles.pastWebinars}>
      <div className={styles.header}>Past Webinars</div>
      <Swiper
        slidesPerView={width > 768 ? 3 : 1}
        spaceBetween={150}
        className={styles.swiper}
        modules={[Navigation]}
        navigation={true}
      >
        {Array.isArray(pastWebinars) &&
          pastWebinars
            .sort((a, b) => {
              return (
                moment(b?.date, "DD-MM-YYYY hh:mm:ss") -
                moment(a?.date, "DD-MM-YYYY hh:mm:ss")
              );
            })
            .map((webinar, index) => {
              return (
                <SwiperSlide key={index} className={styles.slide}>
                  <div
                    style={{
                      cursor: pastWebinars?.length > 1 ? "grab" : "default",
                    }}
                    className={styles.card}
                  >
                    <div className={styles.dateAndTime}>
                      <DateRangeIcon
                        className={styles.icon}
                        fontSize="14px"
                        htmlColor="#707070"
                      />
                      <div className={styles.date}>
                        {moment(webinar?.date, "DD-MM-YYYY").format(
                          "dddd[,] MMMM Do YYYY"
                        )}
                      </div>
                      |
                      <div className={styles.time}>
                        {moment(webinar?.date, "DD-MM-YYYY hh:mm:ss").format(
                          "hh[:]mm A"
                        )}
                      </div>
                    </div>
                    <div className={styles.title}>{webinar?.name}</div>
                    <div className={styles.speaker}>
                      <div className={styles.speakerLeft}>
                        <img
                          onError={(e) => (e.target.src = "/img/avatar.png")}
                          src={webinar?.author?.image}
                          alt="speaker"
                        />
                      </div>
                      <div className={styles.speakerRight}>
                        <div className={styles.name}>{webinar?.speker}</div>
                        <div className={styles.position}>
                          {webinar?.position}
                        </div>
                        <div className={styles.company}>{webinar?.company}</div>
                      </div>
                    </div>
                    <div className={styles.register}>
                      <button
                        onClick={() => router.push(`webinars/${webinar?.slug}`)}
                        className={styles.btn}
                      >
                        Get Recordings
                      </button>
                    </div>
                  </div>
                </SwiperSlide>
              );
            })}
      </Swiper>
    </div>
  );
}

export default PastWebinars;
