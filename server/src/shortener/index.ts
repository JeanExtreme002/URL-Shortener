import URLModel from './url';

// Define the characters for the ID of a shortened URL.
const upperCaseLetters: Array<string> = [...Array(26)].map((_, i) =>
    String.fromCharCode(i + 65)
);
const lowerCaseLetters: Array<string> = [...Array(26)].map((_, i) =>
    String.fromCharCode(i + 97)
);
const numbers: Array<string> = [...Array(10)].map((_, i) => i.toString());

const alphabet: Array<string> = Array.prototype.concat(
    numbers,
    upperCaseLetters,
    lowerCaseLetters
);

// Create a JSON for querying the index of a character at the alphabet.
const alphabetDictionary: {[key: string]: number} = {};

for (let index = 0; index < alphabet.length; index++) {
    alphabetDictionary[alphabet[index]] = index;
}

class Shortener {
    private intToString(id: number): string {
        let stringId = '';
        let hasValue = false;

        do {
            hasValue = id >= alphabet.length;

            stringId = alphabet[id % alphabet.length] + stringId;
            id = Math.trunc(id / alphabet.length);
        } while (hasValue);

        return stringId;
    }

    private stringToInt(id: string): number {
        let intId = 0;

        for (let index = 0; index < id.length; index++) {
            const value = alphabetDictionary[id[index]];
            intId += Math.pow(alphabet.length, id.length - 1 - index) * value;
        }
        return intId;
    }

    async insert(url: string): Promise<string> {
        const reg: URLModel = URLModel.build({url: url});
        await reg.save();

        return this.intToString(reg.id - 1);
    }

    async get(id: string): Promise<string | null> {
        const intId = this.stringToInt(id) + 1;

        const reg: URLModel | null = await URLModel.findOne({
            where: {id: intId},
        });
        return reg ? reg.url : null;
    }
}

const shortener: Shortener = new Shortener();

export default shortener;
