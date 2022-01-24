interface ContentProps {
    name: string,
    exerciseCount: number,
}

export default function Content(props: ContentProps) {
  return (
    <div>
      <p><b>{props.name} {props.exerciseCount}</b></p>
    </div>
  );
}
