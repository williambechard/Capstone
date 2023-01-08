import styled from "@emotion/styled";
import { Checkmark, Error } from "@carbon/icons-react";

const StyledToast = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  ${(props) =>
    props.type === "success"
      ? `
    background: #d4edda;
    color: #155724;
    border: 1px solid #c3e6cb;
    `
      : `
    background: #f8d7da;
    color: #721c24;
    border: 1px solid #f5c6cb;
    `}
  margin: 0;
  position: fixed;
  top: 6rem;
  left: 50%;
  transform: translateX(-50%);
  z-index: 100;
  animation: toast 0.5s ease-in-out;
  @keyframes toast {
    0% {
      opacity: 0;
      transform: translateX(-50%) translateY(-1rem);
    }
    100% {
      opacity: 1;
      transform: translateX(-50%) translateY(0);
    }
  }
`;

const StyledToastTitle = styled.p`
  margin: 0;
  padding: 0;
  font-family: "IBM Plex Sans", sans-serif;
  font-size: 14px;
  font-weight: 600;
  color: #000;
`;

const StyledToastMessage = styled.p`
  margin: 0;
  padding: 0;
  font-family: "IBM Plex Sans", sans-serif;
  font-size: 14px;
  font-weight: 400;
  color: #000;
`;

const Toast = ({ message, type }) => {
  return (
    <StyledToast type={type}>
      {type === "success" ? <Checkmark /> : <Error />}
      <StyledToastTitle>
        {type === "success" ? "Success!" : "Error!"}
      </StyledToastTitle>
      <StyledToastMessage>{message}</StyledToastMessage>
    </StyledToast>
  );
};

export default Toast;
