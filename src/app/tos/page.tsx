export default function Page() {
  return (
    <div className="grid gap-8 px-5 py-8">
      <div className="grid w-fit gap-1 border-b-2 border-b-neutral-500 pe-8">
        <h1 className="text-3xl font-bold text-neutral-800">利用規約</h1>
        <h2 className="text-lg text-neutral-600">Terms of Service</h2>
      </div>
      <section className="grid gap-6">
        <span className="text-neutral-700">
          lounas(以下本アプリ)をご利用に際しましては、以下の規約に同意いただいた上でご利用いただきますようお願い申し上げます。
        </span>
      </section>
      <article className="grid gap-8 text-neutral-700">
        <ol className="mx-auto grid w-[90%] list-outside list-decimal gap-6">
          <li>
            <p>
              本アプリではユーザーのデータを用いてアプリの機能に活用し、ユーザー体験の向上に努めます。
            </p>
            <p>データの活用について、個人を特定できる形での提供は断じてございません。</p>
          </li>
          <li>ルート案内をご利用する際は周囲の交通状況に従い、マナーを守ってご利用ください。</li>
          <li>
            <p>
              本アプリに登録されている店舗情報について記録当時の情報をもとに作成しているため、実際の店舗情報とは異なる場合があることをご理解ください。
            </p>
            <p>
              最新情報の提供にご協力いただける方は{" "}
              <a
                className="text-blue-600"
                href="https://forms.gle/c1gosjcJZf5gTtvCA"
                target="_blank"
                rel="noopener noreferrer"
              >
                Google Forms
              </a>
              よりフィードバックを送信していただきますようお願い申し上げます。
            </p>
          </li>
          <li>
            <p>本アプリに転載されている写真やデザインはlounasの著作物です。</p>
            <p>
              また、本アプリを利用して飲食店や料理に対する誹謗中傷をSNSなどで発信することは控えるようお願い致します。
            </p>
          </li>
          <li>
            本アプリをご利用いただいた際に生じた損害について、当方は責任を負うことができかねますことをご承知おきくださいますようお願い申し上げます。
          </li>
        </ol>
        <section>
          <p>規約は随時、追加・変更があることをご理解ください。</p>
          <p>
            ご不明な点・懸念事項がございましたら、お気軽にSNS(
            <a
              className="text-blue-600"
              href="https://x.com/lounas_app"
              target="_blank"
              rel="noopener noreferrer"
            >
              X/Twitter
            </a>
            {", "}
            <a
              className="text-blue-600"
              href="https://www.instagram.com/lounas_app/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Instagram
            </a>
            )のDMにお問い合わせください。
          </p>
        </section>
      </article>
    </div>
  );
}
