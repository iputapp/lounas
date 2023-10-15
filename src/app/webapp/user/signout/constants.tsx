import Github from "@icons/github.svg";
import Instagram from "@icons/instagram.svg";
import Lock from "@icons/lock.svg";
import Twitter from "@icons/twitter.svg";

/** 設定一覧 */
const settings = [
  {
    title: "プライバシー",
    icon: <Lock />,
    url: "/privacy",
    isInternal: true,
  },
  {
    title: "バグの報告",
    icon: <Github />,
    url: "https://github.com/wiyco/imap/issues/new?assignees=&labels=bug%2Ctriage&projects=&template=bug-report.yml&title=%5BBug%5D%3A+%7B%E6%A6%82%E8%A6%81%7D",
    isInternal: false,
  },
  {
    title: "Instagram",
    icon: <Instagram />,
    url: "https://www.instagram.com/imap.bq/",
    isInternal: false,
  },
  {
    title: "Twitter",
    icon: <Twitter />,
    url: "https://twitter.com/imap_bq",
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
