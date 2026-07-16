"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown, Check } from "lucide-react";

interface Option {
  value: string;
  label: string;
}

export default function CustomSelect({
  name,
  options,
  defaultValue = "",
  placeholder = "Select an option",
  required = false,
}: {
  name: string;
  options: Option[];
  defaultValue?: string;
  placeholder?: string;
  required?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(defaultValue);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const selected = options.find((o) => o.value === value);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={containerRef} className="relative">
      {/* hidden input so this still works inside a native <form action={...}> */}
      <input type="hidden" name={name} value={value} required={required} />

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className={`w-full flex items-center justify-between bg-surface border rounded-lg px-4 py-2.5 text-sm text-left transition-colors ${
          open ? "border-accent" : "border-border"
        } ${selected ? "text-text" : "text-text3"}`}
      >
        <span>{selected ? selected.label : placeholder}</span>
        <ChevronDown
          size={16}
          className={`text-text3 transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {open && (
        <div className="absolute z-50 mt-2 w-full bg-surface border border-border rounded-xl shadow-xl overflow-hidden p-1.5 flex flex-col gap-1">
          {options.map((option) => {
            const isActive = option.value === value;
            return (
              <button
                key={option.value}
                type="button"
                onClick={() => {
                  setValue(option.value);
                  setOpen(false);
                }}
                className={`flex items-center justify-between gap-2 px-3.5 py-2.5 rounded-lg text-sm text-left transition-colors ${
                  isActive
                    ? "bg-accent/15 text-accent border border-accent/30"
                    : "text-text2 border border-transparent hover:bg-surface2/60 hover:text-text"
                }`}
              >
                <span>{option.label}</span>
                {isActive && <Check size={14} className="text-accent shrink-0" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}