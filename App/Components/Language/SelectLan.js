import { useSelector } from "react-redux";
import AllNewWord from './AllNewWord.json'


function SelectLan(text) {
    const { selectLanguage } = useSelector(state => state.Language);

    let Language = selectLanguage == 'en' ? 'ENGLISH' : 'SPANISH'
    let index = AllNewWord.findIndex(it => it.ENGLISH == text)

    if (index >= 0) return AllNewWord[index][Language];
    else return text
}



export default SelectLan


