import type { Metadata } from "next";
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
        title="联系我"
        englishTitle="Contact"
        description="欢迎交流人工智能、机器人、自动化相关项目与实习机会。"
      />
      <ContactLinks />
    </Container>
  );
}
