/*
 * @Author: 卢天宇
 * @Date: 2024-04-30 17:40:13
 * @Description:
 */
// * 查看是否支持Symbol
const supportSymbol = typeof Symbol === 'function' && Symbol.for;

export const REACT_ELEMENT_TYPE = supportSymbol ? Symbol.for('react.element') : 0xeac7;
