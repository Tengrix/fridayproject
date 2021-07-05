import { TextField } from '@material-ui/core'
import React, { ChangeEvent, KeyboardEvent } from 'react'
import s from './SuperInputText.module.css'

// тип пропсов обычного инпута
type DefaultInputPropsType = any

// здесь мы говорим что у нашего инпута будут такие же пропсы как у обычного инпута
// (чтоб не писать value: string, onChange: ...; они уже все описаны в DefaultInputPropsType)
type SuperInputTextPropsType = DefaultInputPropsType & { // и + ещё пропсы которых нет в стандартном инпуте
    onChangeText?: (value: string) => void
    onEnter?: () => void
    error?: string
    spanClassName?: string
    placeholder: string
}

const SuperInputText: React.FC<SuperInputTextPropsType> = (
    {
        type, // достаём и игнорируем чтоб нельзя было задать другой тип инпута
        onChange, onChangeText,
        onKeyPress, onEnter,
        error,
        className, spanClassName,
        placeholder,
        ...restProps// все остальные пропсы попадут в объект restProps
    }
) => {
    const onChangeCallback = (e: ChangeEvent<HTMLInputElement>) => {
        onChange // если есть пропс onChange
            && onChange(e) // то передать ему е (поскольку onChange не обязателен)

        onChangeText && onChangeText(e.currentTarget.value)
    }
    const onKeyPressCallback = (e: KeyboardEvent<HTMLInputElement>) => {
        onKeyPress && onKeyPress(e);

        onEnter // если есть пропс onEnter
            && e.key === 'Enter' // и если нажата кнопка Enter
            && onEnter() // то вызвать его
    }

    const finalSpanClassName = `${s.error} ${spanClassName ? spanClassName : ''}`
   /* const finalInputClassName = `${s.errorInput} ${className}` // need to fix with (?:) and s.superInput*/

    return (
        <>
            <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                label={placeholder}
                type={type}
                onChange={onChangeCallback}
                onKeyPress={onKeyPressCallback}
                {...restProps}
            />
            {error && <span className={finalSpanClassName}>{error}</span>}
        </>
    )
}

export default SuperInputText
