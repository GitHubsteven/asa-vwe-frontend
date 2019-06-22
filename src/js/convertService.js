import {Converter} from 'showdown';

let converter = new Converter({tables: true});

export class ConvertService {
    constructor() {
    }

    /**
     * 将markdown 转化为html
     *
     * @param markdown markdown内容
     * @returns html内容
     */
    makeHtml(markdown) {
        return converter.makeHtml(markdown);
    }
}