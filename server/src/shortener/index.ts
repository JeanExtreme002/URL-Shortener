import {Response} from 'express';
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

    async insert(url: string, res: Response): Promise<void> {
        const [instance, mustCreate]: [URLModel, boolean] =
            await URLModel.findOrBuild({
                where: {url: url},
                defaults: {url: url},
            });
        instance.visitedAt = new Date();

        const promise: Promise<URLModel> = instance.save();

        // Return the ID of the instance.
        if (!mustCreate) {
            const id: string = this.intToString(instance.id - 1);
            res.json({id: id});

            // Return the ID of the instance after saving it, if it does not exist.
        } else {
            promise
                .then(() => {
                    const id: string = this.intToString(instance.id - 1);
                    res.json({id: id});
                })
                .catch(() => {
                    res.sendStatus(500);
                });
        }
    }

    async get(id: string, res: Response): Promise<void> {
        const intId = this.stringToInt(id) + 1;

        // Try getting the original URL by the ID.
        URLModel.findOne({where: {id: intId}})
            .then((instance: URLModel | null) => {
                if (instance) {
                    res.json({url: instance.url});

                    // Update the last time the URL was visited.
                    instance.visitedAt = new Date();
                    instance.save();
                } else {
                    res.sendStatus(404);
                }
            })
            .catch(() => {
                res.sendStatus(500);
            });
    }
}

const shortener: Shortener = new Shortener();

export default shortener;
