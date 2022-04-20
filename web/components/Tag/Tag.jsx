export function Tag(props) {
  return (
    <span className="bg-primary text-white py-1 px-2 rounded-full text-sm">
      {props.children}
    </span>
  );
}
