import styles from "../styles/PastWebinars.module.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import moment from "moment";
import DateRangeIcon from "@mui/icons-material/DateRange";
import { Navigation } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

function PastWebinars({pastWebinars}) {
  return (
    <div className={styles.pastWebinars}>
    <div className={styles.header}>Past Webinars</div>
    <Swiper
      slidesPerView={3}
      spaceBetween={150}
      className={styles.swiper}
      modules={[Navigation]}
      navigation={true}
    >
      {Array.isArray(pastWebinars) &&
        pastWebinars.map((webinar, index) => {
          return (
            <SwiperSlide key={index} className={styles.slide}>
              <div style={{cursor:pastWebinars?.length > 1 ? "grab":"default"}} className={styles.card}>
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
                      src="/img/avatar.png"
                      alt="speaker"
                    />
                  </div>
                  <div className={styles.speakerRight}>
                    <div className={styles.name}>{webinar?.speker}</div>
                    <div className={styles.position}>
                      {webinar?.position}
                    </div>
                    <div className={styles.company}>
                      {webinar?.company}
                    </div>
                  </div>
                </div>
                <div className={styles.register}>
                  <button className={styles.btn}>Get Recordings</button>
                </div>{" "}
              </div>
            </SwiperSlide>
          );
        })}
    </Swiper>
  </div>
  )
}

export default PastWebinars