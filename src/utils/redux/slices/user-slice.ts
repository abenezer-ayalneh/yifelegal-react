import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export interface UserModelType{
    id: number,
    name: string,
    phoneNumber: string,
    email?: string,
    roleID: number,
    rememberToken?: string,
    createdBy: number,
    updatedBy: number,
    createdAt?: Date,
    updatedAt?: Date,
    deletedBy?: number,
    deletedAt?: Date,
}

export interface UserStateType {
    name?: null | string,
    email?: null | string,
    phoneNumber?: null | string,
    user?: null | UserModelType
}

const initialState: UserStateType = {
    name: null,
    email: null,
    phoneNumber: null,
}
const userSlice = createSlice({
    name: 'user',
    initialState: initialState,
    reducers: {
        setName: (state, action: PayloadAction<UserStateType>) => {
            state.name = action.payload.name
        },
        setEmail: (state, action: PayloadAction<UserStateType>) => {
            state.email = action.payload.email
        },
        setPhoneNumber: (state, action: PayloadAction<UserStateType>) => {
            state.phoneNumber = action.payload.phoneNumber
        },
        setUser: (state, action:PayloadAction<UserStateType>) => {
            state.user = action.payload.user
        },
        clearUser: (state) => {
            state.user = null
        },
    }
})

export const {setName, setEmail, setPhoneNumber,setUser,clearUser} = userSlice.actions;
export default userSlice.reducer;