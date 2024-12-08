import { Input } from "./ui/input";

export default function InputComponent({
  labelName,
  type,
  className,
  children,
  onChange,
  ...props
}) {
  return (
    <>
      {children ? children : <label>{labelName}</label>}
      <Input
        type={type}
        className={className}
        {...props}
        onChange={(e) => onChange({ [e.target.name]: e.target.value })}
      />
    </>
  );
}
