import Button from "@mui/material/Button";

const Buttoncomp = ({ children, handleaction, color, variant }) => {
  return (
    <Button onClick={handleaction} variant={variant} color={color}>
      {children}
    </Button>
  );
};

export default Buttoncomp;
