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
  convert2Html(markdown) {
    return converter.makeHtml(markdown);
  }

  /**
   * 生成摘要
   * @param markdown
   * @returns {string}
   */
  createSyllabus(markdown) {
    let wrapper = document.createElement("div");
    wrapper.innerHTML = converter.makeHtml(markdown);
    let text = wrapper.innerText;
    let limit = text.length < 100 ? text.length : 100;
    return text.substr(0, limit) + "...";
  }
}