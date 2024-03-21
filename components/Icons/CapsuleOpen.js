
function CapsuleOpen(props) {
  return (
    <svg
    xmlns="http://www.w3.org/2000/svg"
    className="inline-block mr-2 w-6 h-6 text-stone-700"
    viewBox="0 0 24 24"
    {...props}
  >
    <g fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M21 13a9 9 0 1 1-18 0a9 9 0 0 1 18 0Z" />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 13V9"
      />
      <path strokeLinecap="round" d="M10 2h4" />
    </g>
  </svg>
  )
}

export default CapsuleOpen