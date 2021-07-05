import { Button } from '@material-ui/core'
import React from 'react'
import s from './SuperButton.module.css'

// тип пропсов обычной кнопки, children в котором храниться название кнопки там уже описан
type DefaultButtonPropsType = any

type SuperButtonPropsType = DefaultButtonPropsType & {
    red?: boolean
    type: string
}

const SuperButton: React.FC<SuperButtonPropsType> = (
    {
        red, className, type,
        ...restProps// все остальные пропсы попадут в объект restProps, там же будет children
    }
) => {
    const finalClassName = `${s.default}${red ? s.red : s.default} ${className}`

    return (
        <Button
            type={type}
            fullWidth
            variant="contained"
            color="secondary"
            className={finalClassName}
            {...restProps} // отдаём кнопке остальные пропсы если они есть (children там внутри)
        >Sign In </Button>
    )
}

export default SuperButton
