export function Arrow({ width = 24, height = 24, className = "" }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      id="arrow-icon"
      width={width}
      height={height}
      className={className}
      viewBox="0 0 24 25"
      fill="currentColor"
    >
      <path
        d="M8.31465 14.4563L12.7759 19.1323C13.0603 19.4279 13.2093 19.7976 13.2228 20.2416C13.2362 20.6855 13.0872 21.0682 12.7759 21.3896C12.4914 21.6852 12.1293 21.833 11.6897 21.833C11.25 21.833 10.8879 21.6852 10.6034 21.3896L3.46552 13.9726C3.15517 13.6501 3 13.2739 3 12.8439C3 12.414 3.15517 12.0377 3.46552 11.7152L10.6034 4.29825C10.8879 4.00264 11.2438 3.84785 11.671 3.83388C12.0983 3.8199 12.4665 3.97469 12.7759 4.29825C13.0603 4.59385 13.2026 4.97007 13.2026 5.42692C13.2026 5.88376 13.0603 6.25999 12.7759 6.55559L8.31465 11.2315L19.4483 11.2315C19.8879 11.2315 20.2567 11.3863 20.5546 11.6959C20.8526 12.0055 21.001 12.3882 21 12.8439C21 13.3008 20.851 13.684 20.5531 13.9936C20.2552 14.3031 19.8869 14.4574 19.4483 14.4563H8.31465Z"
        fill="currentColor"
      />
    </svg>
  );
}