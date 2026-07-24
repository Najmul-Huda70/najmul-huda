"use client";
import { deleteWork } from "@/lib/action";
import { useState, useEffect, useTransition } from "react";
import { createPortal } from "react-dom";
import toast from "react-hot-toast";


export default function DeleteWorkBtn({
  _id,
  projectTitle,
}: {
  _id: string;
  projectTitle: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleDelete = () => {
    startTransition(async () => {
      try {
        await deleteWork(_id);
        toast.success("Successfully deleted.");
        setIsOpen(false);
      } catch (error) {
        console.error(error);
        toast.error("Failed to delete");
      }
    });
  };

  const modal = (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div className="w-full max-w-sm bg-surface border border-border p-8 rounded-2xl shadow-xl text-center flex flex-col items-center">
        <div className="mb-6">
          <p className="font-mono text-[10px] tracking-[2px] text-text2 uppercase mb-3">
            [ DANGER ZONE ]
          </p>
          <h3 className="font-serif italic text-2xl text-text mb-3">
            Delete project?
          </h3>
          <p className="text-text2 text-xs leading-relaxed max-w-[280px] mx-auto">
            Are you sure you want to delete{" "}
            <span className="text-text font-medium">
              &quot;{projectTitle}&quot;
            </span>
            ? This action cannot be undone.
          </p>
        </div>

        <div className="flex items-center justify-center gap-3 w-full">
          <button
            onClick={() => setIsOpen(false)}
            disabled={isPending}
            className="font-mono text-[11px] text-text2 hover:text-text border border-border px-5 py-2.5 rounded-xl transition-all cursor-pointer disabled:opacity-50 min-w-[90px]"
          >
            Cancel
          </button>
          <button
            onClick={handleDelete}
            disabled={isPending}
            className="font-mono text-[11px] bg-primary text-primary-text hover:opacity-85 px-5 py-2.5 rounded-xl transition-all cursor-pointer disabled:opacity-50 min-w-[120px]"
          >
            {isPending ? "Deleting..." : "Confirm Delete"}
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="font-mono text-[11px] text-text2 hover:text-text border border-border hover:border-text/40 bg-surface2/40 px-3 py-1 rounded transition-all cursor-pointer"
      >
        Delete
      </button>

      {isOpen && mounted && createPortal(modal, document.body)}
    </>
  );
}