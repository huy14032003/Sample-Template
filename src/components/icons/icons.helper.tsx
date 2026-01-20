import type { IconBaseProps } from '@ant-design/icons/lib/components/Icon'
import type { IconProps as PhosphorIconProps } from '@phosphor-icons/react'
import type { LucideProps } from 'lucide-react'

// Default icon size
export const DEFAULT_ICON_SIZE = 16

// Helper to create Antd icon with default size
export const withAntdDefaults = (Icon: React.ComponentType<IconBaseProps>) => {
  const WrappedIcon = (props: IconBaseProps) => (
    <Icon style={{ fontSize: `${DEFAULT_ICON_SIZE}px`, ...props.style }} {...props} />
  )
  WrappedIcon.displayName = Icon.displayName
  return WrappedIcon
}

// Helper to create Phosphor icon with default size
export const withPhosphorDefaults = (Icon: React.ComponentType<PhosphorIconProps>) => {
  const WrappedIcon = (props: PhosphorIconProps) => (
    <Icon size={DEFAULT_ICON_SIZE} {...props} />
  )
  WrappedIcon.displayName = Icon.displayName
  return WrappedIcon
}

// Helper to create Lucide icon with default size
export const withLucideDefaults = (Icon: React.ComponentType<LucideProps>) => {
  const WrappedIcon = (props: LucideProps) => (
    <Icon size={DEFAULT_ICON_SIZE} {...props} />
  )
  WrappedIcon.displayName = Icon.displayName
  return WrappedIcon
}