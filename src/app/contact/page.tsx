import type { Metadata } from "next";
import { ContactForm } from "@/components/contact-form";
import { ContactLinks } from "@/components/contact-links";
import { Container } from "@/components/container";
import { PageIntro } from "@/components/page-intro";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "联系",
  description: "联系黄柏霖，交流人工智能、机器人、AIoT 与产品工程。",
  pathname: "/contact",
});

export default function ContactPage() {
  return (
    <Container className="page-shell contact-page">
      <PageIntro
        index="05"
        eyebrow="Contact"
        title="从一个具体问题开始交流。"
        description="如果你正在做 AI、机器人、自动化或产品工程相关的项目，可以通过下面已公开的入口联系。"
      />
      <div className="contact-page__grid">
        <div>
          <h2>公开联系方式</h2>
          <ContactLinks />
        </div>
        <div>
          <h2>其他联系方式</h2>
          <ContactForm />
        </div>
      </div>
    </Container>
  );
}
