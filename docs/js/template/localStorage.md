实现一个`localStorege`工具函数，可以为不同的业务统一添加前缀，并且能自动格式化数据，返回`json`格式。

```js
// 统一前缀
const PREFIX = 'zhuge-';

const local = window.localStorage;

// 格式化数据
function format(value: any) {
    return value === undefined || value === null ? '' : value;
}

// 格式化数据为string
function parseLocal(data: any) {
    try {
        return JSON.stringify({
            value: format(data)
        })
    } catch (e) {
        console.log('JSON.stringify ERR', e)
    }
    return null;
}

// parse返回的数据
function parseResult(data: string) {
    if (data == null) {
        return null;
    }
    try {
        const result = JSON.parse(data);
        return result.value;
    } catch (e) {
        console.log('JSON.parse ERR', e)
    }
}

class LocalData {
    clear(): void {
        local.clear();
    }

    del(key: string): void {
        local.removeItem(PREFIX + key);
    }

    get(key: string): any {
        return parseResult(local[PREFIX + key]);
    }

    // 添加数据
    set(key: string, value: any): void {
        try {
            const data = parseLocal(value);
            if (data != null) {
                // 添加统一的key
                local.setItem(PREFIX + key, data);
            }
        } catch (e) {
          console.log('set data ERR', e)
        }
    }
}

export default new LocalData();
```