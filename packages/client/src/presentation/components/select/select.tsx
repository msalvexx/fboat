import React from 'react'
import MultiSelect, { components, DropdownIndicatorProps, ClearIndicatorProps } from 'react-select'
import Styles from './select-styles.scss'

type Option = {
  value: string
  label: string
}

type Props = {
  name: string
  options: Option[]
  defaultValue: Option[]
  placeholder?: string
  isMulti?: boolean
}

const DropdownIndicator: React.FC<DropdownIndicatorProps> = (props: DropdownIndicatorProps) => (
  <components.DropdownIndicator {...props}>
    <span data-uk-icon="chevron-down"></span>
  </components.DropdownIndicator>
)

const ClearIndicator: React.FC<ClearIndicatorProps> = (props: ClearIndicatorProps) => (
  <components.ClearIndicator {...props}>
    <span data-uk-icon="close"></span>
  </components.ClearIndicator>
)

const Select: React.FC<Props> = (props: Props) => {
  const error = true
  const errorMessage = 'Any error message here!'
  const dangerColor = '#f0506e'
  const lightDangerColor = '#ff90a5'
  const config = {
    borderColor: dangerColor,
    color: dangerColor,
    boxShadow: 'none'
  }
  const defaultInvalidStyle = (base: any): any => ({
    ...base,
    ...config,
    '&:hover': config,
    '&:focus': config
  })
  const multiValueInvalidStyle = (base: any): any => ({
    ...base,
    ...config,
    '&:hover': config,
    '&:focus': config,
    ...{ backgroundColor: lightDangerColor }
  })
  const errorStyle = {
    control: defaultInvalidStyle,
    dropdownIndicator: defaultInvalidStyle,
    clearIndicator: defaultInvalidStyle,
    multiValue: multiValueInvalidStyle
  }
  return <>
    <MultiSelect
      styles={error ? errorStyle : undefined}
      components={{ DropdownIndicator, ClearIndicator }}
      classNamePrefix='MultiSelect'
      className={Styles.select} {...props}/>
    {error && <label className={Styles.errorAlert}>{errorMessage}</label>}
  </>
}

export default Select
