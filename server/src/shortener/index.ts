import URL from './url';

// Define the characters for the ID of a shortened URL.
const upperCaseLetters: Array<string> = [...Array(26)].map((_, i) =>
    String.fromCharCode(i + 65)
);
const lowerCaseLetters: Array<string> = [...Array(26)].map((_, i) =>
    String.fromCharCode(i + 97)
);
const numbers: Array<string> = [...Array(10)].map((_, i) => i.toString());

const alphabet: Array<string> = Array.prototype.concat(
    upperCaseLetters,
    lowerCaseLetters,
    numbers
);

// Create a JSON for querying the index of a character at the alphabet.
const alphabetDictionary: {[key: string]: number} = {};

for (let index = 0; index < alphabet.length; index++) {
    alphabetDictionary[alphabet[index]] = index;
}

class Shortener {
    public constructor() {}

    private intToString(id: number): string {
        const divisor = alphabet.length;
        let stringId = '';

        while (id > 1) {
            stringId = alphabet[id % divisor] + stringId;
            id = Math.trunc(id / divisor);
        }
        return stringId;
    }

    private stringToInt(id: string): number {
        let intId = 0;

        for (let index = 0; index < id.length; index++) {
            const value = alphabetDictionary[id[index]];
            intId += Math.pow(alphabet.length, id.length - index - 1) * value;
        }
        return intId;
    }

    async insert(url: string): Promise<string> {
        const reg: URL = URL.build({url: url});
        await reg.save();

        return this.intToString(reg.id);
    }

    async get(id: string): Promise<string | null> {
        const intId = this.stringToInt(id);

        const reg: URL | null = await URL.findOne({where: {id: intId}});
        return reg ? reg.url : null;
    }
}

const shortener: Shortener = new Shortener();

export default shortener;
