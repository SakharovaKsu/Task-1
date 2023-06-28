import {UserType} from '../HW8'

type ActionType =
    | { type: 'sort'; payload: 'up' | 'down' }
    | { type: 'check'; payload: number }

export const homeWorkReducer = (state: UserType[], action: ActionType): UserType[] => {
    switch (action.type) {
        case 'sort': { // by name
            const sortFunUp = (a: UserType, b: UserType) => a.name > b.name ? 1 : -1
            const sortFunDown = (a: UserType, b: UserType) => a.name < b.name ? 1 : -1
            const compareFun = action.payload === 'up' ? sortFunUp : sortFunDown
            return state.map(n => ({...n})).sort(compareFun)
        }
        case 'check': {
            return state.filter(u => u.age >= action.payload)
        }
        default:
            return state
    }
}

