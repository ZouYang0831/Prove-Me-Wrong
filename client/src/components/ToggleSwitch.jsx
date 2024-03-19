/**
 * ToggleSwitch Component
 *
 * Description:
 * This file contains a React component named ToggleSwitch, which renders a toggle switch UI element.
 * It allows users to toggle between two states (on/off) and provides customization options for color and disabled state.
 *
 * @param {Object} props - The props object containing configuration options for the ToggleSwitch component.
 *  @param {string} [props.color="green"] - The color of the toggle switch. Can be "green", "red", "blue".
 *  @param {boolean} [props.disabled=false] - Specifies whether the toggle switch is disabled or not.
 *  @param {boolean} [props.checked=false] - Specifies whether the toggle switch is checked (on) or not.
 *  @param {function} props.onChange - The event handler function called when the toggle switch is clicked. 
 *  @returns {JSX.Element} - Returns JSX for the ConfirmWindow component.
 * 
 * Author: Changxuan Fan
 * Created Date: 3/19/2024
 */
import React from "react";

// Define color options for the ToggleSwitch component
const colorOptions = {
  green: {
    onColor: "bg-green-500",
    offColor: "bg-gray-300",
  },
  red: {
    onColor: "bg-red-500",
    offColor: "bg-gray-300",
  },
  blue: {
    onColor: "bg-blue-500",
    offColor: "bg-gray-300",
  },
  default: {
    onColor: "bg-gray-500",
    offColor: "bg-gray-300",
  },
};

// Define the ToggleSwitch component
export function ToggleSwitch({
  color = "green",
  disabled = false,
  checked = false,
  onChange,
}) {
  // Destructure color options based on the provided color prop, fallback to default if color is not found
  const { onColor, offColor } = colorOptions[color] || colorOptions.default;

  return (
    // Render the switch container
    <div className={`flex cursor-pointer`} onClick={onChange}>
      {/* Render the switch button */}
      <button
        className={`rounded-full p-1 duration-300 ease-in-out w-14 h-7 ${
          checked ? onColor : offColor
        } ${disabled ? "cursor-not-allowed" : ""}`}
        disabled={disabled} // Set the disabled state of the button
      >
        {/* Render the switch thumb */}
        <div
          className={`bg-white w-5 h-5 rounded-full shadow-md transform duration-300 ease-in-out ${
            checked ? `translate-x-7` : "translate-x-0"
          }`}
        />
      </button>
    </div>
  );
}
