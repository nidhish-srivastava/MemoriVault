
function Note(props) {
  return (
    <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 256 256"
    className="absolute -bottom-20 z-0 -right-28 text-orange-300 w-60 h-60"
    {...props}
  >
    <path
      fill="currentColor"
      d="M168 128a8 8 0 0 1-8 8H96a8 8 0 0 1 0-16h64a8 8 0 0 1 8 8Zm-8 24H96a8 8 0 0 0 0 16h64a8 8 0 0 0 0-16Zm56-104v152a32.1 32.1 0 0 1-32 32H72a32.1 32.1 0 0 1-32-32V48a16 16 0 0 1 16-16h16v-8a8 8 0 0 1 16 0v8h32v-8a8 8 0 0 1 16 0v8h32v-8a8 8 0 0 1 16 0v8h16a16 16 0 0 1 16 16Zm-16 0h-16v8a8 8 0 0 1-16 0v-8h-32v8a8 8 0 0 1-16 0v-8H88v8a8 8 0 0 1-16 0v-8H56v152a16 16 0 0 0 16 16h112a16 16 0 0 0 16-16Z"
    />
  </svg>
  )
}

export default Note