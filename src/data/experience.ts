import type { ExperienceItem } from "@/types/content";

export const experiences: ExperienceItem[] = [
  {
    id: "education-bistu",
    period: "在读",
    type: "教育",
    title: "自动化专业",
    organization: "北京信息科技大学",
    description:
      "围绕自动化基础、智能系统与软件工程持续学习，并通过个人项目连接课程知识与完整产品实践。",
  },
  {
    id: "aiot-greenhouse",
    period: "时间待补充",
    type: "项目",
    title: "AIoT 智慧温室种植系统原型",
    organization: "个人项目",
    description:
      "面向答辩演示的 AIoT MVP，完成环境数据监测、设备控制、报警与演示运行机制。",
    pending: true,
  },
  {
    id: "embodied-platform",
    period: "时间待补充",
    type: "项目",
    title: "Embodied Training Platform",
    organization: "个人项目",
    description:
      "以二维机器人仿真、路径规划和任务状态机为核心的全栈教学项目。",
    pending: true,
  },
  {
    id: "signal-hunt",
    period: "时间待补充",
    type: "项目",
    title: "SIGNAL-HUNT",
    organization: "项目经历",
    description:
      "包含现场控制、运营管理和大屏展示的 Electron 多端活动系统。",
    pending: true,
  },
  {
    id: "community",
    period: "时间待补充",
    type: "社团",
    title: "SNN 社团官网",
    organization: "社团经历",
    description: "围绕社团介绍、项目展示与品牌视觉完成响应式官网设计与开发。",
    pending: true,
  },
  {
    id: "internship-placeholder",
    period: "待补充",
    type: "实践",
    title: "实习与其他实践经历",
    organization: "待补充",
    description: "尚未提供可公开展示的信息。",
    pending: true,
  },
];

export function getPublicExperiences(): ExperienceItem[] {
  return experiences.filter((item) => !item.pending);
}
