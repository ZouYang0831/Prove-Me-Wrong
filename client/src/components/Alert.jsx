/**
 * Alert Component
 *
 * Description:
 * This component renders an alert box with customizable styles based on the kind prop.
 * It provides visual feedback to users based on different alert types such as warning, error, success, or default.
 *
 * @param {Object} props - Props object containing:
 *   @param {string} children - Content to be displayed within the alert box.
 *   @param {string} title - Title of the alert.
 *   @param {string} kind - Specifies the type of alert. Options include "warn", "error", "success", or default.
 * @returns {JSX.Element} - Returns JSX for the Alert component.
 * 
 * Author: Changxuan Fan
 * Created Date: 3/14/2024
 */
export function Alert({ children, title, kind }) {
  // Define variables to hold CSS classes based on the kind of alert
  let bg, icn, ttl, chld;

  // Switch statement to determine the CSS classes based on the value of kind prop
  switch (kind) {
    case "warn":
      bg = "bg-yellow-50";
      icn = "text-yellow-400";
      ttl = "text-yellow-800";
      chld = "text-yellow-700";
      break;
    case "error":
      bg = "bg-red-50";
      icn = "text-red-400";
      ttl = "text-red-800";
      chld = "text-red-700";
      break;
    case "success":
      bg = "bg-green-50";
      icn = "text-green-400";
      ttl = "text-green-800";
      chld = "text-green-700";
      break;
    default:
      // Default case: for any unrecognized kind, use default styling
      bg = "bg-empirica-50";
      icn = "text-empirica-400";
      ttl = "text-empirica-800";
      chld = "text-empirica-700";
      break;
  }

  return (
    // Render the alert box with appropriate styles based on the kind prop
    <div className={`w-200 ml-20 my-4 p-4 rounded-lg ${bg}`}>
      <div className="flex">
        <div>
          <svg
            className={`h-5 w-5 ${icn}`}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <div className="ml-3">
          <h3 className={`text-base font-medium ${ttl}`}>{title}</h3>
          <div className={`text-base ${chld}`}>{children}</div>
        </div>
      </div>
    </div>
  );
}
