export interface ConnectBtnControlItem {
  action: () => any
  label: string
  class?: string
  color?: string
  icon?: string
  loading?: boolean
  variant?: string
  trailing?: boolean
  disabled?: boolean
}

export interface ConnectBtnControl {
  leftButtons: ConnectBtnControlItem[],
  rightButtons: ConnectBtnControlItem[]
}
