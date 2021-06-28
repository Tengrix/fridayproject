import { Dispatch } from "redux"
import { signUpAPI } from "../../a3-dal/project-api"

type signStateType = {
    isRegistr: boolean
    registrError: string
}
type switchIsAuthType = ReturnType<typeof switchIsRegistr>
type setErrorRegistrType = ReturnType<typeof setErrorRegistr>
type signUpActionType = setErrorRegistrType | switchIsAuthType

const signInitialState: signStateType = {
    isRegistr: false,
    registrError: "",
}

export const signUpReduser = (
    state = signInitialState,
    action: signUpActionType
): signStateType => {
    switch (action.type) {
        case SWITCH_IS_REGISTR:
            return { ...state, isRegistr: action.newValueIsRegistr }
        case SET_ERROR_REGISTR:
            return { ...state, registrError: action.error }
        default:
            return state
    }
}

const SWITCH_IS_REGISTR = "SIGN-UP/SWITCH-IS-REGISTR"
const SET_ERROR_REGISTR = "SIGN-UP/SET-ERROR-REGISTR"

export const switchIsRegistr = (newValueIsRegistr: boolean) => {
    return { type: SWITCH_IS_REGISTR, newValueIsRegistr } as const
}
export const setErrorRegistr = (error: any) => ({ type: SET_ERROR_REGISTR, error } as const)

export const signUpTC = (email: string, password: string) => {
    const signUpData = { email, password }
    return (dispatch: Dispatch<signUpActionType>) => {
        signUpAPI
            .signUp(signUpData)
            .then((resp) => {
                if (resp.data.addedUser) {
                    dispatch(switchIsRegistr(true))
                } else {
                    dispatch(setErrorRegistr(resp.data.error))
                }
            })
            .catch((error) => {
                dispatch(setErrorRegistr("Common error"))
            })
    }
}
