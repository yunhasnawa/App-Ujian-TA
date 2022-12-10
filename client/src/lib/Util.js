export default class Util {

    static ucWords(str) {
        let words = str.split(' ');
        for (let i = 0; i < words.length; i++)
            words[i] = words[i].charAt(0).toUpperCase() + words[i].slice(1);
        return words.join(' ');
    }

    static prettifyFieldName(fieldName) {
        let result = fieldName.replaceAll('_', ' ');
        result = Util.ucWords(result);
        return result;
    }
}