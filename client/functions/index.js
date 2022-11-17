export const imageSrc = (user) => {
  if (user.image) {
    return user.image.url;
  } else {
    return "/images/logo.png";
  }
};

export const findPeople = async () => {
  try {
    const { data } = await axios.get("/find-people");
    return data;
  } catch (error) {
    console.log(error);
  }
};
