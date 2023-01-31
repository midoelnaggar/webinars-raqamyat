import styles from "../styles/apply.module.scss";
import { TextField, Box, Autocomplete } from "@mui/material";
import { MuiTelInput } from "mui-tel-input";
import countries from "../data/countries";

function apply() {
  return (
    <div className={styles.applyPage}>
      <div className={styles.top}>
        <div className={styles.title}>
          <span>Apply For Free</span>
        </div>
        <div className={styles.subtitle}>
          <div>
            <span>Fintech Speaker?</span>
          </div>
          <div>
            <span>Apply Here!</span>
          </div>
        </div>
        <div className={styles.desc}>
          We invite Fintech Speakers to speak at our Webinars. This is a
          Volunteering activity and speakers shall get the following benefits:
        </div>

        <div className={styles.subDesc}>
          <div className={styles.start}>
            <ul>
              <li>Personal Branding</li>
              <li>Getting Published Throughout Raqamyat Social Media</li>
              <li>Strong Fintech Exposure That Creates More Opportunities</li>
              <li>Get A Copy Of The Recorded Webinar</li>
            </ul>
          </div>
          <div className={styles.end}>
            <div className={styles.top}>
              <img src="/img/shapes6.svg" alt="apply" />
            </div>
            <div className={styles.bottom}></div>
          </div>
        </div>
      </div>
      <div className={styles.bottom}>
        <div className={styles.applyForm}>
          <div className={styles.title}>
            Speakers should apply using the following form
          </div>
          <div className={styles.inputs}>
            <div className={styles.inputContainer}>
              <TextField fullWidth />
              <label>Name</label>
            </div>
            <div className={styles.inputContainer}>
              <TextField fullWidth />
              <label>Company</label>
            </div>
            <div className={styles.inputContainer}>
              <TextField fullWidth />
              <label>Job title</label>
            </div>
            <div className={styles.inputContainer}>
              <TextField fullWidth />
              <label>Email</label>
            </div>
            <div className={styles.inputContainer}>
              <MuiTelInput fullWidth defaultCountry="EG" />
              <label>Mobile no.</label>
            </div>
            <div className={styles.inputContainer}>
              <MuiTelInput fullWidth defaultCountry="EG" />
              <label>WhatsApp</label>
            </div>
            <div className={styles.inputContainer}>
              <TextField fullWidth />
              <label>Nationality</label>
            </div>
            <div className={styles.inputContainer}>
              <Autocomplete
                fullWidth
                options={countries}
                autoHighlight
                getOptionLabel={(option) => option.label}
                renderOption={(props, option) => (
                  <Box
                    component="li"
                    sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
                    {...props}
                  >
                    <img
                      loading="lazy"
                      width="20"
                      src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
                      srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
                      alt=""
                    />
                    {option.label}
                  </Box>
                )}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    inputProps={{
                      ...params.inputProps,
                      autoComplete: "new-password"
                    }}
                  />
                )}
              />
              <label>Country of Residence</label>
            </div>
            <div className={styles.inputContainer}>
              <Autocomplete
              multiple
              max
                fullWidth
                options={["Arabic","English","French"]}
                autoHighlight
                getOptionLabel={(option) => option}
                renderOption={(props, option) => (
                  <Box
                    component="li"
                    {...props}
                  >
                    {option}
                  </Box>
                )}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    inputProps={{
                      ...params.inputProps,
                      autoComplete: "new-password"
                    }}
                  />
                )}
              />{" "}
              <label>Conducted Webinars Language</label>
            </div>
          </div>
          <div className={styles.agree}>
            <input type="checkbox" />
            <div>Agree to prepare their own material</div>
          </div>
          <div className={styles.agree}>
            <input type="checkbox" />
            <div>Agree to conduct a non-paid webinars</div>
          </div>
          <button className={styles.applyBtn}>Apply</button>
        </div>
      </div>
    </div>
  );
}

export default apply;
