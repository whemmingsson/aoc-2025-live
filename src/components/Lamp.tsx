export const Lamp = ({ on }: { on: boolean }) => {
  return <div>{on ? "💡" : "⚫"}</div>;
};
