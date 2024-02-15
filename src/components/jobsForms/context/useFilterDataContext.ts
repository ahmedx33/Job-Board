
import { useContext } from 'react'
import { FilterListingsContext } from "../pages/FilterListingsForm.tsx";
export default function useFilterData() {
    const data = useContext(FilterListingsContext);

    return data
}
