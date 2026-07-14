"use client";
import { useState } from "react";
import toast from "react-hot-toast";

export default function DeleteProjectBtn({ _id, projectTitle }: { _id: string, projectTitle: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      const res = await fetch(`/api/projects?id=${_id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        toast.error("Failed to delete");
        return;
      }
      toast.success("Successfully Delete.");
      setIsOpen(false);
      
    } catch (error) {
      console.error(error);
      alert("Something went wrong!");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="font-mono text-[11px] text-red-500/80 hover:text-red-500 border border-red-500/20 hover:border-red-500/40 bg-red-500/5 px-3 py-1 rounded transition-all cursor-pointer"
      >
        Delete
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          
          <div className="w-full max-w-sm bg-surface border border-border p-8 rounded-2xl shadow-xl text-center flex flex-col items-center">
            
            <div className="mb-6">
             
              <p className="font-mono text-[10px] tracking-[2px] text-red-500/90 uppercase mb-3">
                [ DANGER ZONE ]
              </p>
              <h3 className="font-serif italic text-2xl text-text mb-3">
                Delete project?
              </h3>
              <p className="text-text2 text-xs leading-relaxed max-w-[280px] mx-auto">
                Are you sure you want to delete <span className="text-text font-medium">"{projectTitle}"</span>? This action cannot be undone.
              </p>
            </div>

            
            <div className="flex items-center justify-center gap-3 w-full">
              <button
                onClick={() => setIsOpen(false)}
                disabled={isDeleting}
                className="font-mono text-[11px] text-text2 hover:text-text border border-border px-5 py-2.5 rounded-xl transition-all cursor-pointer disabled:opacity-50 min-w-[90px]"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={isDeleting}
                className="font-mono text-[11px] text-white bg-red-500 hover:bg-red-600 px-5 py-2.5 rounded-xl transition-all cursor-pointer disabled:opacity-50 min-w-[120px]"
              >
                {isDeleting ? "Deleting..." : "Confirm Delete"}
              </button>
            </div>
            
          </div>
        </div>
      )}
    </>
  );
}