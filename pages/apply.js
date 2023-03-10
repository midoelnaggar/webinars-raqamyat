import { useState, useRef } from "react";
import styles from "../styles/apply.module.scss";
import { TextField, Box, Autocomplete } from "@mui/material";
import { MuiTelInput } from "mui-tel-input";
import countries from "../data/countries";
import { ScaleLoader } from "react-spinners";
import { useSnackbar } from "notistack";

export default function Apply() {
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({});
  const { enqueueSnackbar } = useSnackbar();
  const materialRef = useRef();
  const nonpaidRef = useRef();

  const languageOptions = ["Arabic", "English", "French"];

  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleMobileChange = (value, options, name) => {
    setForm({ ...form, [name]: value });
  };

  const handleLanguagesChange = () => {
    const array = [];
    setTimeout(() => {
      const chips = document.getElementsByClassName("MuiChip-label");
      for (let i = 0; i < chips.length; i++) {
        array.push(chips[i].textContent);
      }
      setForm({ ...form, languages: array });
    }, 1000);
  };

  const handleApply = () => {
    if (!materialRef.current.checked || !nonpaidRef.current.checked) {
      if (!nonpaidRef.current.checked) {
        enqueueSnackbar("You should agree to conduct a non-paid webinars", {
          variant: "warning",
        });
      }
      if (!materialRef.current.checked) {
        enqueueSnackbar("You should agree to prepare their own material", {
          variant: "warning",
        });
      }
    } else {
      setSubmitting(true);
      setTimeout(() => {
        setSubmitting(false);
        setSubmitted(true);
      }, 1000);
    }
  };

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
        <div
          className={styles.applyForm}
          style={
            submitted
              ? {
                  width: "0",
                  height: "0",
                  padding: "0",
                  margin: "0",
                  opacity: "0",
                  overflow:"hidden"
                }
              : {}
          }
        >
          <div className={styles.title}>
            Speakers should apply using the following form
          </div>
          <div className={styles.inputs}>
            <div className={styles.inputContainer}>
              <TextField name="name" onChange={handleInputChange} fullWidth />
              <label>Name</label>
            </div>
            <div className={styles.inputContainer}>
              <TextField
                name="company"
                onChange={handleInputChange}
                fullWidth
              />
              <label>Company</label>
            </div>
            <div className={styles.inputContainer}>
              <TextField name="job" onChange={handleInputChange} fullWidth />
              <label>Job title</label>
            </div>
            <div className={styles.inputContainer}>
              <TextField name="email" onChange={handleInputChange} fullWidth />
              <label>Email</label>
            </div>
            <div className={styles.inputContainer}>
              <MuiTelInput
                name="mobile"
                onChange={(value, options) =>
                  handleMobileChange(value, options, "mobile")
                }
                fullWidth
                defaultCountry="EG"
                value={form?.mobile}
              />
              <label>Mobile no.</label>
            </div>
            <div className={styles.inputContainer}>
              <MuiTelInput
                name="whatsapp"
                onChange={(value, options) =>
                  handleMobileChange(value, options, "whatsapp")
                }
                fullWidth
                defaultCountry="EG"
                value={form?.whatsapp}
              />
              <label>WhatsApp</label>
            </div>
            <div className={styles.inputContainer}>
              <TextField
                name="nationality"
                onChange={handleInputChange}
                fullWidth
              />
              <label>Nationality</label>
            </div>
            <div className={styles.inputContainer}>
              <Autocomplete
                fullWidth
                options={countries}
                autoHighlight
                getOptionLabel={(option) => option.label}
                onChange={(e)=>setForm({...form, country: e.target.textContent})}
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
                    name="country"
                    {...params}
                    SelectProps={{
                    }}
                    inputProps={{
                      ...params.inputProps,
                      autoComplete: "new-password",
                    }}
                  />
                )}
              />
              <label>Country of Residence</label>
            </div>
            <div className={styles.inputContainer}>
              <Autocomplete
                multiple
                style={{ paddingRight: "5px !important" }}
                name="languages"
                fullWidth
                options={languageOptions}
                autoHighlight
                onChange={handleLanguagesChange}
                getOptionLabel={(option) => option}
                renderOption={(props, option) => (
                  <Box component="li" {...props}>
                    {option}
                  </Box>
                )}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    inputProps={{
                      ...params.inputProps,
                      autoComplete: "new-password",
                    }}
                  />
                )}
              />{" "}
              <label>Conducted Webinars Language</label>
            </div>
          </div>
          <div className={styles.agree}>
            <input ref={materialRef} type="checkbox" />
            <div>Agree to prepare their own material</div>
          </div>
          <div className={styles.agree}>
            <input ref={nonpaidRef} type="checkbox" />
            <div>Agree to conduct a non-paid webinars</div>
          </div>
          <button onClick={handleApply} className={styles.applyBtn}>
            Apply
          </button>
          <div
            style={{ display: submitting ? "flex" : "none" }}
            className={styles.submittingOverlay}
          >
            <ScaleLoader color="#00a4f8" />
          </div>
        </div>
        <div
          className={styles.thankyou}
          style={
            !submitted
              ? {
                  width: "0",
                  height: "0",
                  padding: "0",
                  margin: "0",
                  opacity: "0",
                  overflow:"hidden"
                }
              : {}
          }
        >
          <div className={styles.imageContainer}>
            <img src="/img/onAir.svg" alt="On Air" />
          </div>
          <div className={styles.message}>
            <div className={styles.title}>THANK YOU FOR JOINING</div>
            <div className={styles.subtitle}>
              Thank you {form?.name} for your interest in participating in
              Raqamyat webinars. Rest assured that we would love to have you as
              a speaker at one of our webinars, and we will contact you ASAP to
              schedule the preferred date and time.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

