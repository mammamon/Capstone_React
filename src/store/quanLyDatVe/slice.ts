import { createSlice } from "@reduxjs/toolkit";
import { Chair } from "types";

type QuanLyDatVeInitialState = {
	chairList?:Chair
	isFetchingChairList?: boolean
}

const initialState : QuanLyDatVeInitialState={}

const quanLyDatVeSlice =createSlice({
	name:'quanLyDatVe',
	initialState,
	reducers:{},
	extraReducers() {
		
	},
})

export const {actions: quanLyDatVeActions, reducer: quanLyDatVeReducer} = quanLyDatVeSlice