import { Dispatch } from "redux"
import { logoutApi } from "../../a3-dal/logout-api"

type initStateType = {}
let initState: initStateType = {}
type actionType = any

export const logoutReducer = (state: initStateType = initState, action: actionType) => {
    switch (action.type) {
        case "": {
            return state
        }
        default: {
            return state
        }
    }
}

export const LogoutTC = () => (dispatch: Dispatch) => {
    logoutApi.logout()
        .then(res => {
            if (res.data.info) {
                dispatch(logInAC(false))
            }
        })
        .catch((e) => {
            const error = e.res ? e.res.data.error :
                (e.message + ', more details in the console')
            console.log('Error:', { ...e })
        })
}
