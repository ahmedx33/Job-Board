
import { useContext } from 'react'
import { FilterListingsContext } from "../pages/FilterListingsForm.tsx";
export default function useFilterData() {
    const data = useContext(FilterListingsContext);
    if (data === null) throw new Error("Somthing went wrong!")
    return data
}
