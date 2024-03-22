/**
 * Button Component
 *
 * Description:
 * This component renders a button with customizable styles based on the className prop.
 * The button can be styled as blue, white, green, or red by specifying the className prop accordingly.
 *
 * @param {Object} props - Props object containing:
 *   @param {string} className - Specifies the style of the button. Defaults to "blue".
 *   @param {function} handleClick - Callback function to handle click event.
 *   @param {string} type - Specifies the type of button. Defaults to "button".
 *   @param {boolean} autoFocus - Specifies whether the button should automatically get focus when the page loads. Defaults to false.
 * @returns {JSX.Element} - Returns JSX for the Button component.
 *
 * Author: Changxuan Fan
 * Created Date: 3/13/2024
 */

import React from "react";

// Define the base styles shared by all buttons
const base =
  "inline-flex items-center px-4 py-2 border text-base font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 ";

// Define styles for different button types using an object
const styles = {
  blue: "border-transparent shadow-sm text-white bg-empirica-600 hover:bg-empirica-700 focus:ring-empirica-500",
  white: "border-gray-300 shadow-sm text-gray-700 bg-white hover:bg-gray-50",
  green:
    "border-transparent shadow-sm text-white bg-green-600 hover:bg-green-700 focus:ring-green-500",
  red: "border-transparent shadow-sm text-white bg-red-600 hover:bg-red-700 focus:ring-red-500",
  customGreen: "border-transparent shadow-sm text-white focus:ring-offset-2",
};

// Button component
export function Button({
  children,
  handleClick = null,
  className = "customGreen", // Default className is blue
  type = "button",
  autoFocus = false,
}) {
  // Get the corresponding style for the given className, or an empty string if not found
  const buttonClass = `${base} ${styles[className] || ""}`;
  const customStyle = className === "customGreen" ? { backgroundColor: '#A4CC7C', borderColor: '#A4CC7C' } : {};

  return (
    <button
      type={type}
      onClick={handleClick}
      autoFocus={autoFocus}
      className={buttonClass} // Apply the computed class here
      style={customStyle}
    >
      {children}
    </button>
  );
}
