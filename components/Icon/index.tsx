import styles from "./Icon.module.css";

export default function Icon({
  name,
  color,
  stroke,
}: {
  name?: string;
  color?: string;
  stroke?: string;
}) {
  let svg = null;
  switch (name) {
    case "check":
      svg = (
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M14 4L6 12L2 8"
            stroke={color || "#323D54"}
            strokeWidth={stroke || "2"}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
      break;
    case "up":
      svg = (
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M14 11L8 5L2 11"
            stroke={color || "#323D54"}
            strokeWidth={stroke || "2"}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
      break;
    case "down":
      svg = (
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M14 5L8 11L2 5"
            stroke={color || "#323D54"}
            strokeWidth={stroke || "2"}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
      break;
    default:
      svg = (
        <svg
          width="25"
          height="17"
          viewBox="0 0 25 17"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={styles.base}
        >
          <path
            className={styles.strokeOnly}
            d="M8.75 15.25H2.75C1.64543 15.25 0.75 14.3546 0.75 13.25V2.75C0.75 1.64543 1.64543 0.75 2.75 0.75H21.25C22.3546 0.75 23.25 1.64543 23.25 2.75V6.75"
            stroke="#323D54"
            strokeWidth={stroke || "1.5"}
          />
          <rect
            className={styles.rectFill}
            x="1"
            y="4"
            width="23"
            height="3"
            fill="#323D54"
          />
          <g className={styles.numbers}>
            <path
              className="pathFill"
              d="M21.8209 16.1351C20.2549 16.1351 19.3999 15.3611 19.3999 13.9841H20.8669C20.8669 14.6321 21.2269 14.9921 21.8479 14.9921C22.3789 14.9921 22.7209 14.6771 22.7209 14.2001C22.7209 13.6511 22.3879 13.3811 21.7579 13.3811H21.1459V12.2651H21.7669C22.3429 12.2651 22.6309 12.0221 22.6309 11.5181C22.6309 11.1041 22.3159 10.8251 21.8479 10.8251C21.3079 10.8251 20.9749 11.1491 20.9749 11.6891H19.5349C19.5349 10.5191 20.4169 9.74512 21.8839 9.74512C23.2069 9.74512 24.0889 10.4021 24.0889 11.4461C24.0889 12.1121 23.7109 12.5981 22.9639 12.8051C23.7289 12.9491 24.1969 13.4981 24.1969 14.2631C24.1969 15.3701 23.2609 16.1351 21.8209 16.1351Z"
              fill="#323D54"
            />
            <path
              className="pathFill"
              d="M13.7002 16.0001C13.7002 14.5241 14.1592 13.6781 15.2842 13.0931L16.2652 12.5801C16.7152 12.3461 16.9402 12.0221 16.9402 11.6081C16.9402 11.1671 16.6432 10.8701 16.2022 10.8701C15.6352 10.8701 15.3202 11.2481 15.3202 11.9321H13.8352C13.8352 10.6091 14.7712 9.74512 16.1932 9.74512C17.5972 9.74512 18.4342 10.4291 18.4342 11.5541C18.4342 12.3461 18.0112 13.0031 17.2192 13.4171L16.3102 13.9031C15.7882 14.1911 15.6082 14.3891 15.4912 14.8121H18.3802V16.0001H13.7002Z"
              fill="#323D54"
            />
            <path
              className="pathFill"
              d="M10.796 15.9999V12.1299H9.5V10.9869C10.715 10.9869 10.985 10.6359 10.985 9.87988H12.245V15.9999H10.796Z"
              fill="#323D54"
            />
          </g>
        </svg>
      );
      break;
  }

  return svg;
}
