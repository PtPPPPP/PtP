import type {
  Project,
  ProjectCategory,
  ProjectListItem,
} from "@/types/content";
import {
  getSignalHuntAdminUrl,
  getSignalHuntUrl,
  getStdmUrl,
} from "@/lib/site";

export const projectCategories: Array<"全部" | ProjectCategory> = [
  "全部",
  "AI 与计算机视觉",
  "具身智能与机器人",
  "AIoT 与自动化",
  "Web 与产品开发",
  "交互与视觉设计",
];

export const projects: Project[] = [
  {
    slug: "aiot-greenhouse",
    title: "AIoT 智慧温室种植系统原型",
    subtitle: "从环境数据到设备控制的答辩演示 MVP",
    description:
      "围绕温室种植场景构建的本地优先控制与演示系统，覆盖监测、控制、报警、快照和多种运行模式。",
    category: "AIoT 与自动化",
    tags: ["AIoT", "工业自动化", "智慧农业"],
    technologies: [
      "React",
      "TypeScript",
      "Vite",
      "Vitest",
      "Playwright",
      "Dexie",
      "Canvas",
    ],
    status: "mvp",
    featured: true,
    evidenceReady: false,
    year: "时间待补充",
    github: "https://github.com/PtPPPPP/AIoT-",
    demo: null,
    background:
      "温室种植需要把环境状态、设备动作和异常信息放进同一套操作流程。这个项目以答辩演示为边界，重点验证一套可理解、可操作、可扩展的前端原型。",
    problem:
      "在没有接入真实工业现场和设备的前提下，如何清楚展示监测、控制与异常处理之间的关系，并为后续外部设备集成保留明确边界。",
    features: [
      "环境数据监测与趋势展示",
      "自动和手动设备控制",
      "报警中心与设备管理",
      "AI 识别结果展示",
      "快照导入、导出与 CSV 数据导出",
      "答辩演示模式",
      "simulation、external、playback 三种运行类型",
    ],
    architecture: [
      "界面层：监控看板、控制面板、报警与设备管理",
      "领域层：统一处理设备状态、报警规则与运行模式",
      "数据层：Dexie 保存本地数据与快照",
      "适配层：为工业网关和外部设备预留接口",
    ],
    responsibilities: [
      "产品流程与信息架构",
      "前端界面与交互实现",
      "本地数据模型与运行模式设计",
      "自动化测试与答辩演示流程",
    ],
    highlights: [
      "把演示数据、回放数据和外部数据接入收敛到统一运行模型",
      "在不依赖真实设备的情况下完整展示关键操作闭环",
    ],
    challenges: [
      {
        problem: "演示数据与未来真实数据的来源不同，容易让业务组件出现大量条件判断。",
        solution:
          "通过统一运行类型和数据接口隔离数据来源，让界面只消费标准化状态。",
      },
    ],
    nextSteps: ["补充真实项目截图", "验证工业网关适配层", "补充现场设备接入测试"],
    limitations: [
      "当前以模拟数据和接口预留为主",
      "尚未声明完成真实工业现场部署",
    ],
  },
  {
    slug: "embodied-training-platform",
    title: "Embodied Training Platform",
    subtitle: "把指令、规划与执行放进二维机器人教学仿真",
    description:
      "围绕二维机器人仿真建立任务教学流程，串联指令解析、避障路径规划、目标抓取与前后端状态同步。",
    category: "具身智能与机器人",
    tags: ["具身智能", "机器人教学", "全栈开发"],
    technologies: ["React", "TypeScript", "FastAPI", "Python"],
    status: "pending-details",
    featured: true,
    evidenceReady: false,
    year: "时间待补充",
    github: "https://github.com/PtPPPPP/embodied-training-platform",
    demo: null,
    background:
      "具身智能学习常常从抽象概念开始。这个个人教学项目尝试通过可观察的二维仿真，把任务理解、路径规划和动作执行连接成一条完整链路。",
    problem:
      "如何用有限的二维场景解释机器人从接收规则化自然语言指令，到规划路径并完成目标抓取的过程。",
    features: [
      "二维机器人仿真",
      "BFS 避障路径规划",
      "目标抓取",
      "任务状态机",
      "自动任务执行",
      "前后端状态同步",
      "规则化自然语言指令解析",
    ],
    architecture: [
      "React 负责场景渲染、指令输入与执行状态可视化",
      "FastAPI 负责指令解析、任务状态与规划服务",
      "BFS 在离散地图中生成避障路径",
      "任务状态机协调移动、到达、抓取和完成状态",
    ],
    responsibilities: [
      "教学场景与任务流程设计",
      "React 仿真界面实现",
      "FastAPI 服务与状态同步",
      "BFS 规划和规则化指令解析",
    ],
    highlights: [
      "把抽象的任务执行过程转换为可观察状态",
      "前后端共同维护清晰的任务边界",
    ],
    challenges: [
      {
        problem: "路径规划结果、动画进度和后端任务状态需要保持一致。",
        solution:
          "用任务状态机定义合法转换，并让动画只呈现已经确认的状态。",
      },
    ],
    nextSteps: ["补充项目截图", "扩展地图与任务类型", "评估更开放的指令解析方式"],
    limitations: ["这是二维教学仿真项目，不是真实机器人控制平台"],
  },
  {
    slug: "signal-hunt",
    title: "SIGNAL-HUNT",
    subtitle: "面向现场活动的多窗口桌面控制系统",
    description:
      "由 Staff 控制端、Admin 管理端和 Display 展示端组成的 Electron 应用，关注现场可控性、状态恢复和大屏体验。",
    category: "交互与视觉设计",
    tags: ["活动系统", "桌面应用", "交互设计"],
    technologies: ["Electron", "React", "TypeScript"],
    status: "pending-details",
    featured: true,
    evidenceReady: false,
    year: "时间待补充",
    github: "https://github.com/PtPPPPP/SIGNAL-HUNT",
    demo: getSignalHuntUrl(),
    admin: getSignalHuntAdminUrl(),
    background:
      "线下活动系统需要同时服务现场操作、后台管理和公众观看，不同窗口共享同一活动状态，但信息密度和交互重点完全不同。",
    problem:
      "如何让多个桌面窗口在现场流程中保持一致，并在异常或重启后快速恢复到可继续操作的状态。",
    features: [
      "Staff 现场控制端",
      "Admin 运营管理端",
      "Display 大屏展示端",
      "抽奖过程视觉动画",
      "多窗口状态恢复",
      "异常处理",
      "响应式设计",
      "无障碍与 reduced-motion 支持",
    ],
    architecture: [
      "Electron 主进程管理窗口与应用生命周期",
      "React 渲染三个职责不同的界面",
      "统一活动状态在窗口之间同步",
      "持久化状态用于异常后的流程恢复",
    ],
    responsibilities: [
      "多端信息架构与交互设计",
      "Electron 多窗口应用实现",
      "状态恢复与异常流程设计",
      "大屏动效和无障碍适配",
    ],
    highlights: [
      "按角色拆分信息密度与操作权限",
      "为现场不确定性设计可恢复流程",
    ],
    challenges: [
      {
        problem: "多个窗口同时展示同一活动进度，重启后还要保持一致。",
        solution:
          "将活动状态集中管理并持久化，通过明确事件同步各窗口视图。",
      },
    ],
    nextSteps: ["补充真实界面截图", "补充项目时间与个人工作边界"],
    limitations: [
      "在线体验版：抽奖数据保存在访问者浏览器本地，不同设备数据不互通",
      "跨设备同步与云端活动管理需要后续服务端支持",
    ],
  },
  {
    slug: "stdm",
    title: "Diamond Track Atlas",
    subtitle: "钻石联赛田径数据的可溯源交互图鉴",
    description:
      "聚合运动员档案、项目科普与比赛记录的田径图鉴网站，每条成绩都附带原始来源链接与人工核验状态。",
    category: "Web 与产品开发",
    tags: ["数据可视化", "信息导航", "前端产品"],
    technologies: ["React", "TypeScript", "Vite", "Tailwind CSS"],
    status: "mvp",
    featured: true,
    evidenceReady: false,
    year: "时间待补充",
    github: "https://github.com/PtPPPPP/stdm",
    demo: getStdmUrl(),
    background:
      "田径爱好者常常需要在多个来源之间反复核对成绩与纪录。这个项目把运动员档案、项目科普和最近比赛记录聚合到一个可追溯的界面中，强调数据从哪来、可信度如何。",
    problem:
      "如何让比赛成绩、PB/SB 标记和数据来源在同一页面内清晰可查，并在自动同步失败时保留可人工核验的数据管道。",
    features: [
      "运动员档案与照片回退占位图",
      "项目科普分类介绍",
      "比赛记录来源链接与核验状态",
      "PB / SB 标记展示",
      "自研 SVG 雷达图",
      "运动员多维度对比面板",
      "响应式设计",
      "可选 Express REST API 后端",
    ],
    architecture: [
      "前端只从统一数据层读取已生成的数据文件",
      "最近比赛与 PB / SB 由纯函数从比赛记录计算得出",
      "Node 脚本与 GitHub Actions 负责公开数据同步与校验",
      "可选 Express 后端把数据以 REST 接口暴露给第三方",
    ],
    responsibilities: [
      "信息架构与页面编排",
      "前端界面与自研图表实现",
      "数据同步、校验与核验流程设计",
      "CI 自动更新 PR 工作流",
    ],
    highlights: [
      "每条记录都带原始来源与核验状态，数据可追溯",
      "自动同步失败时不猜测、不覆盖旧数据，只生成审计报告",
    ],
    challenges: [
      {
        problem: "官方页面结构变化或 JS 渲染会让自动解析失败。",
        solution:
          "同步失败时保留旧数据并输出审计报告，另提供手动导入流程作为兜底。",
      },
    ],
    nextSteps: ["补充项目截图", "完善数据核验覆盖", "评估部署可选 REST 后端"],
    limitations: [
      "非官方数据源，成绩仅用于科普与学习参考",
      "当前静态部署不包含可选的 Express 后端 API",
    ],
  },
  {
    slug: "finding-job",
    title: "Finding Job",
    subtitle: "把岗位信息整理成可检索、可比较的静态导航",
    description:
      "服务求职信息整理与产品验证的静态导航网站，提供公司岗位、筛选排序、技能矩阵和分享入口。",
    category: "Web 与产品开发",
    tags: ["求职工具", "信息导航", "前端产品"],
    technologies: ["React", "TypeScript", "Vite", "Tailwind CSS", "Vitest"],
    status: "mvp",
    featured: false,
    evidenceReady: false,
    year: "时间待补充",
    github: "https://github.com/PtPPPPP/f1ti",
    demo: "/finding-jobs/",
    background:
      "求职信息往往散落在不同来源，缺少统一字段会增加查找、比较和回顾成本。项目先用静态产品验证信息结构是否有效。",
    problem:
      "如何用统一结构呈现公司、岗位与技能要求，并让筛选结果可以方便地分享。",
    features: [
      "公司与岗位信息展示",
      "筛选与排序",
      "技能矩阵",
      "分享链接",
      "数据完整性检查",
    ],
    architecture: ["静态数据层与页面结构分离", "筛选条件映射到可分享的页面状态"],
    responsibilities: ["信息架构", "前端产品实现", "数据字段与完整性规则"],
    highlights: ["用字段完整性检查减少信息缺漏"],
    challenges: [
      {
        problem: "详细问题与解决过程尚未提供。",
        solution: "待补充。",
      },
    ],
    nextSteps: ["补充项目截图", "补充数据来源与维护方式"],
    limitations: [
      "当前主要用于信息整理和产品验证",
      "在线体验版部署在本站 /finding-jobs/ 子路径，开发环境需先运行 npm run build 生成",
    ],
  },
  {
    slug: "snn-community-website",
    title: "SNN 社团官网",
    subtitle: "以科技感但克制的视觉讲清社团与项目",
    description:
      "包含社团介绍、项目展示和公众号入口的响应式官网，同时承担社团品牌视觉的线上表达。",
    category: "Web 与产品开发",
    tags: ["社团官网", "品牌设计", "前端开发"],
    technologies: ["技术栈待补充"],
    status: "pending-details",
    featured: false,
    evidenceReady: false,
    year: "时间待补充",
    github: "https://github.com/PtPPPPP/snn",
    demo: null,
    background:
      "社团需要一个集中说明自身方向、展示项目并连接公众号内容的公开入口。",
    problem:
      "如何在有限内容下建立清晰的信息层级，同时保持与科技主题相符的品牌识别。",
    features: [
      "社团介绍",
      "项目展示",
      "公众号入口",
      "科技风品牌视觉",
      "响应式网页设计",
    ],
    architecture: ["具体技术架构待补充"],
    responsibilities: ["品牌视觉设计", "响应式前端开发"],
    highlights: ["统一社团介绍、项目与内容入口"],
    challenges: [
      {
        problem: "详细问题与解决过程尚未提供。",
        solution: "待补充。",
      },
    ],
    nextSteps: ["补充技术栈", "补充官网链接与截图", "补充项目时间"],
    limitations: ["公开链接与技术细节待补充"],
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

export function getFeaturedProjects(): Project[] {
  return projects.filter((project) => project.featured);
}

export function toProjectListItem(project: Project): ProjectListItem {
  return {
    slug: project.slug,
    title: project.title,
    description: project.description,
    category: project.category,
    tags: project.tags,
    technologies: project.technologies,
    status: project.status,
    year: project.year,
    demo: project.demo,
  };
}
