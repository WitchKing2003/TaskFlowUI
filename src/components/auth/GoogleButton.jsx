function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="auth-google__icon">
      <path
        fill="#EA4335"
        d="M12 5.04c1.66 0 3.15.57 4.32 1.69l3.22-3.22C17.57 1.64 15.02.6 12 .6 7.39.6 3.42 3.24 1.5 7.1l3.76 2.92C6.15 7.1 8.85 5.04 12 5.04Z"
      />
      <path
        fill="#4285F4"
        d="M23.4 12.26c0-.79-.07-1.55-.2-2.26H12v4.51h6.41a5.5 5.5 0 0 1-2.37 3.58v3h3.83c2.24-2.07 3.53-5.11 3.53-8.83Z"
      />
      <path
        fill="#FBBC05"
        d="M5.27 14.06a6.65 6.65 0 0 1 0-4.12L1.5 7.02a11.46 11.46 0 0 0 0 9.96l3.77-2.92Z"
      />
      <path
        fill="#34A853"
        d="M12 23.4c3.02 0 5.56-1 7.41-2.7l-3.83-3c-1.06.72-2.42 1.15-3.58 1.15-3.15 0-5.85-2.06-6.74-4.94L1.5 16.98C3.42 20.76 7.39 23.4 12 23.4Z"
      />
    </svg>
  );
}

function GoogleButton({ children = 'Đăng nhập với Google', onClick }) {
  return (
    <button type="button" className="auth-google" onClick={onClick}>
      <GoogleIcon />
      <span>{children}</span>
    </button>
  );
}

export default GoogleButton;
