import React from "react";
import Button from "./Button"; // Make sure you import your Button component

export default function ConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  isPending,
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black bg-opacity-50">
      <div className="rounded-lg bg-white p-6 text-black shadow-lg">
        <h3 className="text-xl font-bold">{title}</h3>
        <p className="mt-2">{message}</p>
        <div className="mt-4 flex justify-end gap-4">
          <Button onClick={onClose}>No</Button>
          <Button onClick={onConfirm} isPending={isPending} type="delete">
            Yes, Delete
          </Button>
        </div>
      </div>
    </div>
  );
}
