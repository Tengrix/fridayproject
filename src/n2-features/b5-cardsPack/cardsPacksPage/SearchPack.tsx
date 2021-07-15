import { Slider, Typography } from "@material-ui/core"
import { useFormik } from "formik"
import React from "react"

type PropsType = {
    minCount: number
    maxCount: number
    changeMaxMinRange: (newValue: number[]) => void
    setValue: (newValue: number[]) => void
    value: number[]
}

const SearchPack = (props: PropsType) => {
    const minValue = props.minCount
    const maxValue = props.maxCount
    const handleChange = (event: any, newValue: number | number[]) => {
        props.setValue(newValue as number[])
    }
    const valuetext = (value: number) => {
        return `${value}`
    }
    const formik = useFormik({
        initialValues: {
            namePack: "",
        },
        onSubmit: (values) => {
            formik.resetForm()
            props.changeMaxMinRange(props.value)
        },
    })
    return (
        <div>
            <Slider
                value={props.value}
                onChange={handleChange}
                aria-labelledby="range-slider"
                valueLabelDisplay="auto"
                style={{ width: "200px" }}
                getAriaValueText={valuetext}
                min={minValue}
                max={maxValue}
                
            />
            <form onSubmit={formik.handleSubmit}>
                <input
                    id="namePack"
                    name="namePack"
                    placeholder="Name pack"
                    onChange={formik.handleChange}
                    value={formik.values.namePack}
                />
                <button>Search</button>
            </form>
        </div>
    )
}
export default SearchPack
