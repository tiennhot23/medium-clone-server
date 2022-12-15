module.exports = {
  // generate random string
  generateString() {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < 6; i += 1) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  },
  getRandomInt(min, max) {
    return Math.floor(Math.random() * (Math.floor(max) - Math.ceil(min)) + Math.ceil(min));
  },
  addHours(numOfHours, date = new Date()) {
    /**
     * // 👇️ Add 1 hour to current date
      const result = addHours(1);

      // 👇️ Add 2 hours to another date
      const date = new Date('2022-03-14T09:25:30.820');
      // 👇️ Mon Mar 14 2022 11:25:30
      console.log(addHours(2, date));
     */
    date.setTime(date.getTime() + numOfHours * 60 * 60 * 1000);
    return date;
  },
  addMinutes(numOfMinute, date = new Date()) {
    date.setTime(date.getTime() + numOfMinute * 60 * 1000);
    return date;
  },
  removeCharAt(str, position) {
    return str.slice(0, position) + str.slice(position + 1);
  },
  sleep: ms => new Promise(resolve => {
    setTimeout(resolve, ms);
  }),
  /* image */
  scaleImage: image => {
    // eslint-disable-next-line no-shadow
    const { width, height } = image;
    const max = 2048;
    let w = width;
    let h = height;
    if (width > height) {
      // 'landscape'
      if (w > max) {
        w = max;
        h = (max * height) / width;
      }
    } else if (width < height) {
      // 'portrait';
      if (h > max) {
        h = max;
        w = (max * width) / height;
      }
    } else {
      // orientation = 'event';
      w = max;
      h = (max * height) / width;
    }
    return Object.assign(image, { width: w, height: h });
  },

  /* string */

  removeAccent: str => str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a')
    .replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e')
    .replace(/ì|í|ị|ỉ|ĩ/g, 'i')
    .replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o')
    .replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u')
    .replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y')
    .replace(/đ/g, 'd')
    .replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, 'A')
    .replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, 'E')
    .replace(/Ì|Í|Ị|Ỉ|Ĩ/g, 'I')
    .replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, 'O')
    .replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, 'U')
    .replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, 'Y')
    .replace(/Đ/g, 'D'),

  /* date */

  /* regex & validate */

  isValidatePhonePrefix: phone => {
    const regExpPhoneRefix = /^010|011|012|0120|0121|0122|0123|0124|0125|0126|0127|0128|0129|015|016|0161|0162|0163|0164|0165|0166|0167|0168|0169|017|018|0186|0188|0197|0198|0199|020|0208|0210|0214|0220|0225|0228|0232|0236|0238|0243|0248|025|0251|0252|0254|0255|0258|0260|0262|0263|0269|027|0270|0271|0272|0275|0277|028|0282|0283|0285|0286|0291|0296|030|031|032|033|034|0342|035|036|037|038|039|051|052|0522|053|055|0552|056|057|058|059|060|061|066|067|0673|068|069|070|071|074|075|076|077|078|079|080|081|082|083|084|085|086|087|088|089|090|091|092|093|094|095|096|097|098|099|190|9282/;
    return regExpPhoneRefix.test(phone);
  },

  isValidatePhone: phone => {
    const regexPhone = /^[0][\d]{9}$/;
    return regexPhone.test(phone);
  },

  isValidOTP: otp => {
    const regexOTP = /[0-9]{6}$/;
    return regexOTP.test(otp);
  },

  isValidPassword: password => {
    /** Minimum eight characters, at least one letter, one number and one special character */
    const regexPassword = /^(?=.{10,}$)(?=.*[A-Za-z])(?=.*[0-9])(?=.*\W).*$/;
    return regexPassword.test(password);
  },
};
