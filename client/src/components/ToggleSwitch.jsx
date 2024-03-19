import React from "react";

export function ToggleSwitch({
  size = 1,
  color = "red",
  disabled = false,
  checked = false,
  onChange,
}) {
  // Default values for dimensions
  let width = size === 1 ? "15" : "60";
  let height = size === 1 ? "7" : "30";

  // Determine colors based on prop 'color'
  let onColor = "";
  let offColor = "";
  let disabledColor = "";

  if (color === "green") {
    onColor = "bg-green-500";
    offColor = "bg-gray-400";
    disabledColor = "bg-gray-300";
  } else {
    onColor = "bg-red-500";
    offColor = "bg-gray-300";
    disabledColor = "bg-gray-300";
  }

  return (
    <div className={`flex cursor-pointer`} onClick={onChange}>
      <button
        className={`rounded-full p-1 duration-300 ease-in-out w-${width} h-${height} ${
          checked ? onColor : offColor
        } ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
        disabled={disabled}
      >
        <div
          className={`bg-white w-${height - 2} h-${height - 2} rounded-full shadow-md transform duration-300 ease-in-out ${
            checked ? "translate-x-8" : "translate-x-0"
          }`}
        />
      </button>
    </div>
  );
}
