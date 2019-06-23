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

    /**
     * 设置对象所有属性为null
     *
     * @param target 目标对象
     */
    clearObjVal(target) {
        if (!target) return;
        for (let i in target) {
            if (target.hasOwnProperty(i) && target[i]) {
                target[i] = null
            }
        }
    }
}