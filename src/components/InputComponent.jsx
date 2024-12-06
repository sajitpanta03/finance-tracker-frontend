import { Input } from "./ui/input";

export default function InputComponent({
  labelName,
  type,
  className,
  children,
  func,
  ...props
}) {
  return (
    <>
      {children ? children : <label>{labelName}</label>}
      <Input
        type={type}
        className={className}
        {...props}
        onChange={(e) => func({ [e.target.name]: e.target.value })}
      />
    </>
  );
}
