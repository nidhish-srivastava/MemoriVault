
export const EmailTemplate = ({
  capsule,
}) => (
  <div>
    <h1>Hey there, {capsule.user.name}!</h1>
    <p>
      Your time capsule &quot;{capsule.name}&quot; can be opened now! Click{" "}
      <a href={`https://setsuna.asrvd.me/capsule/${capsule.id}`}>here</a> to
      open it now.
    </p>
  </div>
);

export default EmailTemplate;