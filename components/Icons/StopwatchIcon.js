
export function StopwatchIcon(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      {...props}
    >
      <g fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M21 13a9 9 0 1 1-18 0a9 9 0 0 1 18 0Z"></path>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 13V9"
        ></path>
        <path strokeLinecap="round" d="M10 2h4"></path>
      </g>
    </svg>
  );
}