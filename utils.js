export const checkPassword = (password) => {
  const regExp = /^.*(?=^.{8,}$)(?=.*\d)(?=.*[a-zA-Z]).*$/;

  if (!password.match(regExp)) {
    return false;
  } else {
    return true;
  }
};
