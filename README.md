# React Constate

This is a utility function made to make React Context API convenient to use.

Reference: [constate](https://github.com/diegohaz/constate)

## Usage

```typescript
// [COMPONENT_DIR]/Provider.ts

function use[NAME](props) {
    const [a, setA] = useState<string>('abc');
    const [b, setB] = useState<number>(123);
    const [c, setC] = useState<boolean>(false);
    ...
    return { a, b, c, ... };
}

export const { Provider, useContext } = createProvider(use[NAME]);
```

```typescript
// [COMPONENT_DIR]/index.tsx

import { Provider } from './Provider';

export default function [NAME]() {
    ...
    return (
        <Provider {...}>
            <... />
        </Provider>
    );
}
```

```typescript
// [COMPONENT_DIR]/child/index.tsx

import { useContext } from '../Provider';

export default function [CHILD]() {
    const a = useContext((value) => value.a); // string
    const b = useContext((value) => value.b); // number
    const c = useContext((value) => value.c); // boolean
    ...
    return <... />;
}
```

or

```typescript
// [COMPONENT_DIR]/child/index.tsx

import { useContext } from '../Provider';

export default function [CHILD]() {
    const a = useContext('a'); // string
    const b = useContext('b'); // number
    const c = useContext('c'); // boolean
    ...
    return <... />;
}
```
