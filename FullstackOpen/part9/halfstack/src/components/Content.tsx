interface ContentProps {
    name: string,
    exerciseCount: number,
}

export default function Content(props: ContentProps) {
  return (
    <div>
      <p>{props.name} {props.exerciseCount}</p>
    </div>
  );
}
