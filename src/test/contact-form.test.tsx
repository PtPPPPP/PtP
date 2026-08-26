import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ContactForm } from "@/components/contact-form";

describe("联系入口", () => {
  it("未启用发送服务时不渲染可提交表单", () => {
    const { container } = render(<ContactForm />);

    expect(screen.getByText("联系表单暂未启用")).toBeInTheDocument();
    expect(container.querySelector("form")).not.toBeInTheDocument();
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });
});
