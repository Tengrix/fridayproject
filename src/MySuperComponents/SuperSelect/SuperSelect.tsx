import React, {SelectHTMLAttributes, DetailedHTMLProps, ChangeEvent} from "react";

type DefaultSelectPropsType = DetailedHTMLProps<SelectHTMLAttributes<HTMLSelectElement>, HTMLSelectElement>

type SuperSelectPropsType = DefaultSelectPropsType & {
    options?: any[]
    onChangeOption?: (option: any) => void
    onChangeCallbackA?:(value:string) => void
}

const SuperSelect: React.FC<SuperSelectPropsType> = (
    {
        options,
        onChange, onChangeOption,onChangeCallbackA,
        ...restProps
    }
) => {
    const mappedOptions: any[] = options? options.map((el, i) =>( <option key={el + "-" + i} value={el}>{el}</option> )): []

    const onChangeCallback = (e: ChangeEvent<HTMLSelectElement>) => {
        // onChange, onChangeOption
        if (onChange) {
            onChange(e)
        }
        if(onChangeOption){
            onChangeOption(e.currentTarget.value)
        }
    }
    const onChangeThemeCallback = (e:ChangeEvent<HTMLSelectElement>) => {
        onChange && onChange(e)
        onChangeCallbackA && onChangeCallbackA(e.currentTarget.value)

    }


    return (
        <select onChange={onChangeCallback} {...restProps}>
            {mappedOptions}
        </select>
    );
}

export default SuperSelect;
