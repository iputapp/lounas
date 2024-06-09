import { MediaLinks } from "@constants/links";

import styles from "./page.module.scss";

export default function Page() {
  return (
    <div className="mx-auto grid max-w-3xl gap-8 px-5 py-8">
      <div className={`grid w-full ${styles.gradientBorderB}`}>
        <h1 className="text-3xl font-bold text-neutral-800">利用規約</h1>
        <h2 className="text-sm font-semibold text-neutral-600">Terms of Service</h2>
      </div>
      <section className="grid gap-1 text-neutral-700">
        <span>
          lounas&#40;以下「本サービス」と総称します&#41;をご利用に際しましては、本利用規約&#40;以下「本規約」と称します&#41;に同意いただいた上でご利用いただきますようお願い申し上げます。
        </span>
        <span>
          また、
          <span className="text-neutral-800 underline">
            本サービスを利用することにより、ユーザーは本規約に同意したものとみなします。
          </span>
        </span>
      </section>
      <article className="grid gap-8 text-neutral-700">
        <ol className="mx-auto grid w-[90%] list-outside list-decimal gap-6">
          <li>
            <p>
              本サービスではユーザーのデータを用いて機能改善に活用し、ユーザー体験の向上に努めます。
            </p>
            <p>データの活用について、個人を特定できる形での提供は断じてございません。</p>
          </li>
          <li>ルート案内をご利用する際は周囲の交通状況に従い、マナーを守ってご利用ください。</li>
          <li>
            <p>
              本サービスに登録されている店舗情報について記録当時の情報をもとに作成しているため、実際の店舗情報とは異なる場合があることをご理解ください。
            </p>
            <p>
              最新情報の提供にご協力いただける方は{" "}
              <a
                className="text-blue-600"
                href={MediaLinks.FEEDBACK_FORM}
                target="_blank"
                rel="noopener noreferrer"
              >
                Google Forms{" "}
              </a>
              よりフィードバックを送信していただきますようお願い申し上げます。
            </p>
          </li>
          <li>
            <p>本サービスに転載されている写真やデザインはlounasの著作物です。</p>
            <p>
              また、本サービスを利用して飲食店や料理に対する誹謗中傷をSNSなどで発信することは控えるようお願い致します。
            </p>
          </li>
          <li>
            本サービスをご利用いただいた際に生じた損害について、当方は責任を負うことができかねますことをご承知おきくださいますようお願い申し上げます。
          </li>
        </ol>
        <section>
          <p>本規約は随時、追加・変更があることをご理解ください。</p>
          <p>
            ご不明な点・懸念事項がございましたら、お気軽に&#40;
            <a
              className="text-blue-600"
              href={MediaLinks.X}
              target="_blank"
              rel="noopener noreferrer"
            >
              X/Twitter
            </a>
            {"または"}
            <a
              className="text-blue-600"
              href={`${MediaLinks.IPUTAPP}/contact`}
              target="_blank"
              rel="noopener noreferrer"
            >
              アプリ開発サークル
            </a>
            &#41;までお問い合わせください。
          </p>
        </section>
      </article>
    </div>
  );
}
