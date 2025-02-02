import { Input } from './ui/input'

export default function InputComponent({
  name,
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
        name={name}
        type={type}
        className={className}
        {...props}
        onChange={(e) => onChange(e)}
      />
    </>
  )
}
