import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(customParseFormat);

const formatDate = (date) => {
  const result = dayjs(date, "DD/MM/YYYY");
  return result.isValid() ? result : null;
};

export default formatDate;
