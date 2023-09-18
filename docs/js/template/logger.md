实现一个`logger`日志工具函数，可以在 `logger`里面进行统一的日志管理（如可以统一上报等等）

``` js
const noop = () => {
  //
};

const isFunction = (fn) => typeof fn === 'function';

// 日志等级
const LOG_LEVEL = {
  DEBUG: 0,
  INFO: 1,
  WARN: 2,
  ERROR: 3,
};

type TOptions = {
  logger: any;
  level?: number;
  preventDefault?: boolean | ((levelType: string, params: any[]) => boolean);
  stringify?: boolean;
  format?: (levelType: string, params: any[]) => any[];
  onLog?: (levelType: string, params: any[]) => void;
};

class Logger {
  private options: TOptions;

  /**
   * @param {*} options
   * @param {*} options.logger 自定义基础日志类，不传默认是console
   * @param {String} options.level 日志级别，低于该级别的日志不输出
   * @param {Boolean|Function} options.preventDefault 是否禁用默认的打印行为，默认为false，如果是function，function返回false则禁用
   * @param {Boolean} options.stringify 是否通过string化日志内容，默认true
   * @param {Function} options.format 格式化回调，需返回格式化后的日志内容
   * @param {Function} options.onLog 打日志回调，每次打日志都会执行该回调
   */
  constructor(options: TOptions) {
    this.options = {
      level: LOG_LEVEL.DEBUG,
      onLog: noop,
      logger: console,
      preventDefault: false,
      stringify: true,
      ...options,
    };
  }

  setOptions(options: TOptions): void {
    Object.assign(this.options, options);
  }

  // 格式化日志内容
  format(levelType: string, params: any[]): any[] {
    let parsedParams = params;
    const { options } = this;
    const { logger } = options;

    // string化日志内容
    if (options.stringify) {
      parsedParams = params.map((p) => {
        if (p instanceof Error) {
          return p.stack;
        }

        if (typeof p === 'string') {
          return p;
        }

        try {
          return JSON.stringify(p);
        } catch (err) {
          if (isFunction(logger.warn)) {
            logger.warn('logger stringify error: ', err);
          }

          return p;
        }
      });
    }

    if (isFunction(options.format)) {
      parsedParams = options.format.call(this, levelType, parsedParams);
    }

    return parsedParams;
  }

  // 打印日志
  print(levelType: string, params: any[]): void {
    const { options } = this;
    const level = LOG_LEVEL[levelType] || 0;

    // 日志级别小于设定的级别，不打印
    if (level < options.level) {
      return;
    }

    const lowerLevelType = levelType.toLowerCase();

    const { logger } = this.options;

    if (isFunction(logger[lowerLevelType])) {
      const parsedParams = this.format(levelType, params);

      // 是否禁用默认的打印行为处理
      if (typeof options.preventDefault === 'function') {
        // 返回false则不禁用
        if (options.preventDefault.call(this, levelType, parsedParams) === false) {
          logger[lowerLevelType](...parsedParams);
        }
      } else if (!options.preventDefault) {
        logger[lowerLevelType](...parsedParams);
      }

      if (options.onLog) {
        // 调用传进来的console函数，可以自定义
        options.onLog.call(this, levelType, parsedParams);
      }
    }
  }

  debug(...args: any[]): void {
    this.print('DEBUG', args);
  }

  info(...args: any[]): void {
    this.print('INFO', args);
  }

  warn(...args: any[]): void {
    this.print('WARN', args);
  }

  error(...args: any[]): void {
    this.print('ERROR', args);
  }
}

export { Logger, LOG_LEVEL };
```

实例化：

```js
const logger = new Logger({
  level: LOG_LEVEL.DEBUG,
  logger: console, // 真正打印日志的模块
  stringify: true,
  format(level, logs) {
    const prefix = `${LOG_LEVEL[level].toUpperCase()}|T=${loadedTime}|`;

    return [prefix, ...logs];
  },

  /**
   * @desc 打完日志的回调, 上报日志
   * @param {String} type 日志类型，DEBUG/INFO/WARN/ERROR
   * @param {Array} logs 全部日志内容
   */
  onLog(level, logs: any[]): void {
    aegis.infoAll(...logs);
  },
});
```