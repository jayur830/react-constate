import {
  Context,
  createContext,
  createElement,
  FC,
  PropsWithChildren,
  useContext as useReactContext,
} from "react";

interface NameMapObj<K extends keyof V, V> {
  value: V[K];
  context: Context<V[K]>;
}

type NameMap<Keys extends keyof Values, Values> = {
  [K in Keys]: NameMapObj<K, Values>;
};

export function createProvider<Props, Values>(
  useValue: (props: Props) => Values
) {
  type Keys = keyof Values;

  let nameMap: NameMap<Keys, Values> | never;

  const Provider: FC<PropsWithChildren<Props>> = ({ children, ...props }) => {
    const obj = useValue(props as Props);

    nameMap = Object.keys(obj as any).reduce((result, key) => {
      if (!nameMap) {
        return {
          ...result,
          [key]: {
            context: createContext(obj[key as Keys]),
            value: obj[key as Keys],
          },
        };
      }

      return {
        ...result,
        [key]: {
          ...nameMap[key as Keys],
          value: obj[key as Keys],
        },
      };
    }, {}) as NameMap<Keys, Values>;

    return Object.keys(nameMap).reduceRight((children, key) => {
      const { context, value } = nameMap[key as Keys];
      return createElement(context.Provider, { value }, children);
    }, children) as JSX.Element;
  };

  const useContext = <T extends NameMap<Keys, Values>[Keys]>(
    selector: (value: NameMap<Keys, Values>) => T
  ) => {
    if (!nameMap) {
      throw Error(
        `The context consumer must be wrapped with its corresponding Provider`
      );
    }

    const { context } = selector(nameMap);
    return useReactContext<T["value"] | never>(context as any);
  };

  return { Provider, useContext };
}
