"use client";
import { useState, useEffect, useTransition } from "react";
import { createPortal } from "react-dom";
import toast from "react-hot-toast";
import { deleteProject } from "@/lib/action";

interface DeleteProjectBtnProps {
  _id: string;
  projectTitle: string;
  onDeleted?: () => void; 
}

export default function DeleteProjectBtn2({
  _id,
  projectTitle,
  onDeleted,
}: DeleteProjectBtnProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleDelete = () => {
    startTransition(async () => {
      try {
        await deleteProject(_id);
        toast.success("Successfully deleted.");
        setIsOpen(false);
        if (onDeleted) {
          onDeleted(); 
        }
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
            type="button"
            onClick={() => setIsOpen(false)}
            disabled={isPending}
            className="font-mono text-[11px] text-text2 hover:text-text border border-border px-5 py-2.5 rounded-xl transition-all cursor-pointer disabled:opacity-50 min-w-[90px]"
          >
            Cancel
          </button>
          <button
            type="button"
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
        type="button"
        onClick={() => setIsOpen(true)}
        disabled={isPending}
        className="px-6 py-3 rounded-full text-sm font-medium border border-border text-text2 hover:bg-surface2/60 hover:text-text transition-colors disabled:opacity-50 disabled:cursor-wait"
      >
        {isPending ? "Deleting..." : "Delete project"}
      </button>

      {isOpen && mounted && createPortal(modal, document.body)}
    </>
  );
}