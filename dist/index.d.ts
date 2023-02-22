import { Context, FC, PropsWithChildren } from "react";
export interface NameMapObj<K extends keyof V, V> {
    value: V[K];
    context: Context<V[K]>;
}
declare type NameMap<Keys extends keyof Values, Values> = {
    [K in Keys]: NameMapObj<K, Values>;
};
export declare function createProvider<Props, Values>(useValue: (props: Props) => Values): {
    Provider: FC<PropsWithChildren<Props>>;
    useContext: {
        <T extends NameMap<keyof Values, Values>[keyof Values]>(selector: (value: NameMap<keyof Values, Values>) => T): T["value"];
        <Key extends keyof Values, R extends NameMap<keyof Values, Values>[Key]>(key: Key): R["value"];
        (): { [Key_1 in keyof Values]: Values[Key_1]; };
    };
};
export {};
