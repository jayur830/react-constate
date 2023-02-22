import {
  Context,
  createContext,
  createElement,
  FC,
  PropsWithChildren,
  useContext as useReactContext,
} from "react";

export interface NameMapObj<K extends keyof V, V> {
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

    nameMap = Object.entries(obj as any).reduce((result, [key, value]) => {
      if (!nameMap) {
        return {
          ...result,
          [key]: {
            context: createContext(value),
            value,
          },
        };
      }

      return {
        ...result,
        [key]: {
          ...nameMap[key as Keys],
          value,
        },
      };
    }, {}) as NameMap<Keys, Values>;

    return Object.entries(nameMap).reduceRight(
      (nameMapChildren, [, nameMapObj]) => {
        const { context, value } = nameMapObj as NameMap<
          keyof Values,
          Values
        >[keyof Values];
        return createElement(context.Provider, { value }, nameMapChildren);
      },
      children
    ) as JSX.Element;
  };

  function useContext<T extends NameMap<Keys, Values>[Keys]>(
    selector: (value: NameMap<Keys, Values>) => T
  ): T["value"];
  function useContext<Key extends Keys, R extends NameMap<Keys, Values>[Key]>(
    key: Key
  ): R["value"];
  function useContext(): { [Key in Keys]: Values[Key] };

  function useContext<
    T extends NameMap<Keys, Values>[Keys],
    Key extends Keys,
    R extends NameMap<Keys, Values>[Key]
  >(selector?: Key | ((value: NameMap<Keys, Values>) => T)) {
    if (!nameMap) {
      throw Error(
        "The context consumer must be wrapped with its corresponding Provider"
      );
    }

    if (selector) {
      if (typeof selector === "function") {
        const { context } = selector(nameMap);
        // eslint-disable-next-line react-hooks/rules-of-hooks
        return useReactContext<T["value"] | never>(context as any);
      }

      const { context } = nameMap[selector];
      // eslint-disable-next-line react-hooks/rules-of-hooks
      return useReactContext<R["value"] | never>(context as any);
    }

    return Object.entries(nameMap).reduce((result, [key, obj]) => {
      return {
        ...result,
        // eslint-disable-next-line react-hooks/rules-of-hooks
        [key]: useReactContext(
          (obj as NameMap<keyof Values, Values>[keyof Values]).context
        ),
      };
    }, {});
  }

  return { Provider, useContext };
}
