import { useSelector } from "react-redux";
import { RootState } from "../slices";

export default function useTodos() {
    return useSelector((state: RootState) => state.todos)
}