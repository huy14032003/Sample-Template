import React, { ReactNode } from 'react'
import { Button, ButtonProps } from 'antd'
interface Props extends  Omit<ButtonProps, 'content'> {
  onClick?:()=>void,
  content?: string|ReactNode,
  icon?: ReactNode,
  type?: "link" | "text" | "default" | "primary" | "dashed" | undefined
  color?: "default" | "primary" | "danger" | "blue" | "purple" | "cyan" | "green" | "magenta" | "pink" | "red" | "orange" | "yellow" | "volcano" | "geekblue" | "lime" | "gold" | undefined
  
  form?: string,
  htmlType?: "button" | "submit" | "reset" | undefined,
  className?:string
}
const ButtonComponent = ({ onClick, content, icon, type, variant, color, form,className, htmlType, ...rest }: Props) => {
  const AntButton = Button;
  return (
      <AntButton
        type={type ?? 'primary'}
        onClick={onClick}
        color={color}
        variant={variant}
        form={form}
        className={className}
        htmlType={htmlType}
        {...rest}
      >
        {icon}
        {content}
      </AntButton>
  )
}

export default ButtonComponent
