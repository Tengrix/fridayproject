import { Button, Slider } from "@material-ui/core"
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
        <div
            style={{
                width: "500px",
                display: "flex",
                justifyContent: "space-evenly",
                flexDirection: "row",
            }}
        >
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
                <Button
                    variant="outlined"
                    color="primary"
                    type="button"
                    onClick={formik.submitForm}
                >
                    Search
                </Button>
            </form>
        </div>
    )
}
export default SearchPack
