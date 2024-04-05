import { useSelector } from "react-redux";
import AllNewWord from './AllNewWord.json'
function useSelectLangue() {
    const { selectLanguage } = useSelector(state => state.Language);

    function setLanguage(text) {
        let Language = selectLanguage == 'en' ? 'ENGLISH' : 'SPANISH'
        let index = AllNewWord.findIndex(it => it.ENGLISH == text)
    
        if (index >= 0) return AllNewWord[index][Language];
        else return text
    }

    return {setLanguage}
}
export default useSelectLangue