
import { useContext } from 'react'
import { FilterListingsContext } from "../FilterListingsForm.tsx";
export default function useFilterData() {
    const data = useContext(FilterListingsContext);

    return data
}
