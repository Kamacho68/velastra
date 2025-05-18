import { FiAlertCircle } from "react-icons/fi";

export default function ErrorBanner({ message }) {
  return (
    <div className="error-banner" role="alert">
      <FiAlertCircle />
      <span>{message}</span>
    </div>
  );
}
