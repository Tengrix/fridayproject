import { Checkbox, FormControlLabel } from '@material-ui/core'
import React, { ChangeEvent } from 'react'
import s from './SuperCheckbox.module.css'

// тип пропсов обычного инпута
type DefaultInputPropsType = any

type SuperCheckboxPropsType = DefaultInputPropsType & {
    onChangeChecked?: (checked: boolean) => void
    spanClassName?: string
}

const SuperCheckbox: React.FC<SuperCheckboxPropsType> = (
    {
        type, // достаём и игнорируем чтоб нельзя было задать другой тип инпута
        onChange, onChangeChecked,
        className, spanClassName,
        children, // в эту переменную попадёт текст, типизировать не нужно так как он затипизирован в React.FC

        ...restProps// все остальные пропсы попадут в объект restProps
    }
) => {
    const onChangeCallback = (e: ChangeEvent<HTMLInputElement>) => {
        onChange && onChange(e)
        onChangeChecked && onChangeChecked(e.currentTarget.checked)
    }

    const finalInputClassName = `${s.checkbox} ${className ? className : ''}`

    return (
        <>
            <FormControlLabel
                control={<Checkbox className={finalInputClassName} onChange={onChangeCallback} {...restProps} value="remember" color="secondary" />}
                label="Remember me"
            />
            {children && <span className={s.spanClassName}>{children}</span>}
        </>
    )
}

export default SuperCheckbox
