// 数据文件里用"待补充"标记尚未确认的占位值；展示层统一跳过这些值。
// 展示语义与过滤逻辑保持单一来源，新增占位标记时只改这里。
export const PENDING_PLACEHOLDER = "待补充";

export function isPendingValue(value: string): boolean {
  return value.includes(PENDING_PLACEHOLDER);
}
