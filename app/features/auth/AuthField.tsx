"use client";
import { useState, type InputHTMLAttributes } from "react";
export function AuthField({
  label,
  password = false,
  ...props
}: InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  password?: boolean;
}) {
  const [visible, setVisible] = useState(false);
  const icon =
    password || props.type === "email" || props.name === "identifier";
  return (
    <div className="auth-field">
      <label htmlFor={props.name}>{label}</label>
      <div className="auth-input-wrap">
        {icon && (
          <svg
            className="auth-field-icon"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            aria-hidden="true"
          >
            {password ? (
              <>
                <rect x="5" y="10" width="14" height="11" rx="2" />
                <path d="M8 10V6a4 4 0 0 1 8 0v4m-4 5v2" />
              </>
            ) : (
              <>
                <rect x="3" y="5" width="18" height="14" rx="2" />
                <path d="m3 6 9 7 9-7" />
              </>
            )}
          </svg>
        )}
        <input
          {...props}
          id={props.name}
          type={password ? (visible ? "text" : "password") : props.type}
          className={`auth-input ${icon ? "auth-input-icon" : ""} ${password ? "auth-input-password" : ""}`}
        />
        {password && (
          <button
            type="button"
            className="auth-password-toggle"
            aria-label={`${visible ? "Ocultar" : "Mostrar"} ${label.toLowerCase()}`}
            aria-pressed={visible}
            onClick={() => setVisible(!visible)}
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              aria-hidden="true"
            >
              <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z" />
              <circle cx="12" cy="12" r="3" />
              {visible && <path d="m3 3 18 18" />}
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}
