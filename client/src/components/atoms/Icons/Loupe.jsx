export function Loupe({ width = 24, height = 24, className = "" }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      className={className}
      viewBox="0 0 24 25"
      fill="none"
    >
      <path
        d="M20.9998 21.8329L15.8028 16.6359M15.8028 16.6359C17.2094 15.2294 17.9996 13.3216 17.9996 11.3324C17.9996 9.34324 17.2094 7.43551 15.8028 6.02893C14.3962 4.62236 12.4885 3.83215 10.4993 3.83215C8.51011 3.83215 6.60238 4.62236 5.19581 6.02893C3.78923 7.43551 2.99902 9.34324 2.99902 11.3324C2.99902 13.3216 3.78923 15.2294 5.19581 16.6359C6.60238 18.0425 8.51011 18.8327 10.4993 18.8327C12.4885 18.8327 14.3962 18.0425 15.8028 16.6359Z"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
