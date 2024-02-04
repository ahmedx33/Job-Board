
import { useContext } from 'react'
import { FilterListingsContext } from "../pages/FilterListingsForm.tsx";
export default function useFilterData() {
    const data = useContext(FilterListingsContext);
    if (!data) {
        throw new Error('useFilterData must be used within a FilterListingsProvider')
    }
    return data
}
