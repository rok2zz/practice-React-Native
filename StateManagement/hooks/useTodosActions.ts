import { useDispatch } from "react-redux";
import { bindActionCreators } from 'redux'
import { useMemo } from "react";
import { add, remove, toggle } from "../slices/todos";

export default function useTodosActions() {
    const dispatch = useDispatch()

    return useMemo(() => bindActionCreators({ add, remove, toggle }, dispatch), [ dispatch ]) 
}