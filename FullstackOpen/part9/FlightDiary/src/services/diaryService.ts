import diaries from '../../data/diaries'
import { DiaryEntry, NonSensitiveDiaryEntry } from '../types'


const getEntries = (): Array<DiaryEntry> => {
    return diaries
}

const getNonSensitiveEntries = () : NonSensitiveDiaryEntry[] => {
    // typescript doesn't modify the actual data, but only its type, so we need to exclude the fields
    // map out just the fields we want from each entry object
    // but putting the right type returned will type check what is returned here. So if you wanted comments, but didn't have it here, it would have a type error
    return diaries.map(({ id, date, weather, visibility }) => ({
        id,
        date,
        weather,
        visibility
    }));
}

const addEntry = () => {
    return null
}

export default {
    getEntries,
    addEntry,
    getNonSensitiveEntries
}