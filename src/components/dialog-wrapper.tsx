import { useEffect, useRef } from "react";

type DialogWrapperProps = {
  isOpen: boolean;
  onClose: () => void;
  titleId: string;
  children: React.ReactNode;
  className?: string;
};

export default function DialogWrapper({
  isOpen,
  onClose,
  titleId,
  children,
  className = "",
}: DialogWrapperProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen && !dialog.open) {
      dialog.showModal();
    } else if (!isOpen && dialog.open) {
      dialog.close();
    }
  }, [isOpen]);

  return (
    <dialog
      ref={dialogRef}
      onClose={onClose}
      aria-labelledby={titleId}
      className={`m-auto w-[calc(100%-2rem)] max-w-md border border-[#dce3dd] bg-[#fbfcf9] p-0 text-[#20342f] shadow-[0_18px_60px_#10221d40] backdrop:bg-[#10221d]/60 backdrop:backdrop-blur-[2px] ${className}`}
    >
      {children}
    </dialog>
  );
}
