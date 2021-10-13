import md5 from 'crypto-js/md5';

const URL_IMG = 'https://www.gravatar.com/avatar/';

const getAvatarImg = (email) => {
  const md5Email = md5(email.trim().toLowerCase()).toString();
  return `${URL_IMG}${md5Email}`;
};

export default getAvatarImg;
