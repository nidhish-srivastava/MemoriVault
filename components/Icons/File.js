
function File(props) {
  return (
    <svg
    xmlns="http://www.w3.org/2000/svg"
    className="absolute -bottom-20 z-0 -right-28 text-orange-300 w-60 h-60"
    viewBox="0 0 256 256"
    {...props}
  >
    <path
      fill="currentColor"
      d="M224 160V48a16 16 0 0 0-16-16H48a16 16 0 0 0-16 16v160a16 16 0 0 0 16 16h160a16 16 0 0 0 16-16v-48ZM208 48v92.7L179.3 112a16.1 16.1 0 0 0-22.6 0L112 156.7L91.3 136a16.1 16.1 0 0 0-22.6 0L48 156.7V48Zm0 160H48v-28.7l32-32l20.7 20.7a16.1 16.1 0 0 0 22.6 0l44.7-44.7l40 40V208ZM91.5 100.5A11.9 11.9 0 0 1 88 92a12 12 0 0 1 24 0a12 12 0 0 1-12 12a12.3 12.3 0 0 1-8.5-3.5Z"
    />
  </svg>
  )
}

export default File