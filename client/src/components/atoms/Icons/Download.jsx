export function Download({ width = 24, height = 24, className = "" }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      id="download-icon"
      width={width}
      height={height}
      className={className}
      viewBox="0 0 24 25"
      fill="currentColor"
    >
      <path
        d="M10.9997 16.3334L4.33301 9.66671L6.19968 7.73337L9.66634 11.2V0.333374H12.333V11.2L15.7997 7.73337L17.6663 9.66671L10.9997 16.3334ZM2.99968 21.6667C2.26634 21.6667 1.63834 21.4054 1.11568 20.8827C0.59301 20.36 0.332121 19.7325 0.33301 19V15H2.99968V19H18.9997V15H21.6663V19C21.6663 19.7334 21.405 20.3614 20.8823 20.884C20.3597 21.4067 19.7321 21.6676 18.9997 21.6667H2.99968Z"
        fill="currentColor"
      />
    </svg>
  );
}
