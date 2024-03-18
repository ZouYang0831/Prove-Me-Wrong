/**
 * ConfirmWindow Component
 *
 * Description:
 * This component displays a confirmation window with a warning message and options to submit or cancel.
 *
 * @param {Object} props - Props object containing:
 *   @param {boolean} confirmWindowEnabled - Flag to determine whether the confirmation window should be displayed.
 *   @param {function} handleCancel - Callback function to handle cancel action.
 *   @param {function} handleSubmit - Callback function to handle submit action.
 * @returns {JSX.Element} - Returns JSX for the ConfirmWindow component.
 *
 * Author: Changxuan Fan
 * Created Date: 3/13/2024
 */
import React from "react";
import { Button } from "../components/Button";

export function ConfirmWindow({
  children,
  confirmWindowEnabled,
  handleCancel,
  handleSubmit,
}) {
  return (
    <>
      {confirmWindowEnabled && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75">
          <div className="bg-white p-8 rounded-lg">
            <p className="mb-4 text-center">Warning:</p>
            <p>{children}</p>
            <div className="flex justify-center mt-6 mb-3 space-x-20">
              <Button className="green" handleClick={handleSubmit}>
                Submit
              </Button>
              <Button className="red" handleClick={handleCancel}>
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
