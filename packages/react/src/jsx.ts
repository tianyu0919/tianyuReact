/*
 * @Author: 卢天宇
 * @Date: 2024-04-30 17:37:29
 * @Description:
 */
import { REACT_ELEMENT_TYPE } from 'shared/ReactSymbols';
import { Type, Key, Ref, Props, ElementType, type ReactElement } from 'shared/ReactTypes';

// * ReactElement函数
const ReactElement = function (type: Type, key: Key, ref: Ref, props: Props): ReactElement {
  const element = {
    $$typeof: REACT_ELEMENT_TYPE,
    type,
    key,
    ref,
    props,
    __mark: '天宇'
  };

  return element;
};

export const jsx = (type: ElementType, config: any, ...maybeChildren: any) => {
  let key: Key = null;
  const props: Props = {};
  let ref: Ref = null;

  for (const prop in config) {
    const val = config[prop];
    if (prop === 'key') {
      if (val !== undefined) {
        key = '' + val;
      }
      continue;
    }
    if (prop === 'ref') {
      if (val !== undefined) {
        ref = val;
      }
      continue;
    }
    if ({}.hasOwnProperty.call(config, prop)) {
      props[prop] = val;
    }
  }
  const maybeChildrenLength = maybeChildren.length;
  // * child 为一个元素或者 [child1, child2, ...] 为多个
  if (maybeChildrenLength === 1) {
    props.children = maybeChildren[0];
  } else if (maybeChildrenLength) {
    props.children = maybeChildren;
  }

  return ReactElement(type, key, ref, props);
};

// * 设置生产环境和开发环境都是一个实现。
export const jsxDEV = jsx;
