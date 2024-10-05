import { MuiOtpInput } from "mui-one-time-password-input";

const OTPInput = ({ value, onChange }) => {
  return (
    <div>
      <MuiOtpInput value={value} onChange={onChange} length={6} />
    </div>
  );
};

export default OTPInput;
