import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(customParseFormat);

const formatDate = (date) => {
  const result = dayjs(date, "YYYY-MM-DD");
  return result.isValid() ? result : null;
};

export default formatDate;
