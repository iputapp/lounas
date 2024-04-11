import Github from "@icons/github.svg";
import Instagram from "@icons/instagram.svg";
import LogoIputapp from "@icons/iputapp_logo.svg";
import Lock from "@icons/lock.svg";
import LogoOutline from "@icons/logo-outline.svg";
import SendDiagonal from "@icons/send-diagonal.svg";
import Twitter from "@icons/twitter.svg";
import X from "@icons/x.svg";

/** 設定一覧 */
const settings = [
  {
    title: "プライバシー",
    icon: <Lock />,
    url: "/privacy",
    isInternal: true,
  },
  {
    title: "利用規約",
    icon: <LogoOutline />,
    url: "/tos",
    isInternal: true,
  },
  {
    title: "Instagram",
    icon: <Instagram />,
    url: "https://www.instagram.com/lounas_app/",
    isInternal: false,
  },
  {
    title: "X",
    icon: <X />,
    url: "https://twitter.com/iputapp",
    isInternal: false,
  },
  {
    title: "フィードバック",
    icon: <SendDiagonal />,
    url: "https://forms.gle/c1gosjcJZf5gTtvCA",
    isInternal: false,
  },
  {
    title: "バグの報告",
    icon: <Github />,
    url: "https://github.com/iputapp/lounas/issues/new/choose",
    isInternal: false,
  },
  {
    title: "アプリ開発サークル",
    icon: <LogoIputapp />,
    url: "https://iputapp.lounas.jp/",
    isInternal: false,
  },
];

/** ユーザへのメッセージ - 確率: 0-100 (低い順) */
const messages = [
  {
    message: "おおきに。",
    prob: 10,
  },
  {
    message: "日々のご愛顧ありがとうございます。",
    prob: 75,
  },
  {
    message: "ご利用ありがとうございます。",
    prob: 100,
  },
];

export { messages, settings };
