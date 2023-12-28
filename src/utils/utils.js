/**
 * async...await...异常捕捉封装
 *
 * @param {Function} func 
 * @param {...any} args 
 * @returns
 * @example
 * const func = async (val) => {}
 * const { resp, err } = await asyncFuncWrapper(func, val)
 * @see https://blog.csdn.net/ymzhaobth/article/details/123273050
 */
export async function asyncFuncWrapper(func, ...args) {
  try {
    const resp = await func(...args)
    return { resp }
  } catch (err) {
    return { err }
  }
}
