export const validateName = (name) => {
  return String(name)
    .match(/(^[a-zA-Z\u0600-\u06FF]{3,16})([ ]{0,2})([a-zA-Z\u0600-\u06FF]{3,16})?([ ]{0,1})?([a-zA-Z\u0600-\u06FF]{3,16})?([ ]{0,1})?([a-zA-Z\u0600-\u06FF]{3,16})/);
};

export const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

export const validateMobile = (mobile) => {
  return String(mobile)
    .match(/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/g);
};

export const validatePassword = (password) => {
  return String(password)
    .match(/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/g);
};