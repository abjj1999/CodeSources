export const imageSrc = (user) => {
  if (user.image) {
    return user.image.url;
  } else {
    return "/images/logo.png";
  }
};
