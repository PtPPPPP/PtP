import { describe, expect, it } from "vitest";
import { serializeJsonLd } from "@/components/json-ld";

describe("JSON-LD 序列化", () => {
  it("转义可能提前关闭 script 的字符", () => {
    const serialized = serializeJsonLd({
      value: "</script><script>alert('xss')</script>",
    });

    expect(serialized).not.toContain("<");
    expect(serialized).toContain("\\u003c/script>");
  });
});
