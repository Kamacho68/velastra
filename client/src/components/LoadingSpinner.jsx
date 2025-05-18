import { FiLoader } from "react-icons/fi";

export default function LoadingSpinner() {
  return (
    <div className="loading-spinner">
      <FiLoader className="spin" />
      <span>Loading recommendations...</span>
    </div>
  );
}
