"use client";

import BookStack from "@icons/book-stack.svg";
import Instagram from "@icons/instagram.svg";
import LogoFullColor from "@icons/logo-full-color.svg";
import LogoOutline from "@icons/logo-outline.svg";
import LounasRing from "@icons/lounas-ring.svg";
import NavigatorAlt from "@icons/navigator-alt.svg";
import PizzaSlice from "@icons/pizza-slice.svg";
import SendDiagonal from "@icons/send-diagonal.svg";
import Shop from "@icons/shop.svg";
import Twitter from "@icons/twitter.svg";
import { motion } from "framer-motion";
import { Noto_Sans_JP } from "next/font/google";
import Image from "next/image";
import Link from "next/link";

import { NavigationPlayer } from "@/components/lottie/Navigation";

import styles from "./page.module.scss";

const notoSansJP = Noto_Sans_JP({
  subsets: ["latin"],
  display: "swap",
});

export default function Page() {
  return (
    <>
      <header></header>
      <motion.main
        className={`${styles.container} ${notoSansJP.className}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, ease: "easeInOut" }}
      >
        <article className={styles.bgDemo}>
          <motion.section
            initial={{ y: "-100%" }}
            animate={{ y: 0 }}
            transition={{ duration: 1.8, ease: [0.83, 0, 0.17, 1] }} // easeInOutQuint
          >
            <Image
              src={"/images/demo/ranking.webp"}
              alt="demo"
              width={131.625}
              height={284.85}
              priority
            />
          </motion.section>
          <motion.section
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            transition={{ duration: 1.8, ease: [0.83, 0, 0.17, 1] }}
          >
            <Image
              src={"/images/demo/signup.webp"}
              alt="demo"
              width={131.625}
              height={284.85}
              priority
            />
            <Image
              src={"/images/demo/recommend-loading.webp"}
              alt="demo"
              width={131.625}
              height={284.85}
              priority
            />
          </motion.section>
          <motion.section
            initial={{ y: "-100%" }}
            animate={{ y: 0 }}
            transition={{ duration: 1.8, ease: [0.83, 0, 0.17, 1] }}
          >
            <Image
              src={"/images/demo/home.webp"}
              alt="demo"
              width={131.625}
              height={284.85}
              priority
            />
            <Image
              src={"/images/demo/user-signout.webp"}
              alt="demo"
              width={131.625}
              height={284.85}
              priority
            />
            <Image
              src={"/images/demo/privacy.webp"}
              alt="demo"
              width={131.625}
              height={284.85}
              priority
            />
          </motion.section>
          <motion.section
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            transition={{ duration: 1.8, ease: [0.83, 0, 0.17, 1] }}
          >
            <Image
              src={"/images/demo/restaurant-navi.webp"}
              alt="demo"
              width={131.625}
              height={284.85}
              priority
            />
            <Image
              src={"/images/demo/dish.webp"}
              alt="demo"
              width={131.625}
              height={284.85}
              priority
            />
          </motion.section>
          <motion.section
            initial={{ y: "-100%" }}
            animate={{ y: 0 }}
            transition={{ duration: 1.8, ease: [0.83, 0, 0.17, 1] }}
          >
            <Image
              src={"/images/demo/recommend-1.webp"}
              alt="demo"
              width={131.625}
              height={284.85}
              priority
            />
          </motion.section>
        </article>
        <motion.article
          className={styles.bgDemoOverlay}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8, duration: 0.5, ease: "easeInOut" }}
        >
          <div>
            <h1>
              <LogoFullColor title="lounas" />
            </h1>
            <section>
              <Link href="/signup">今すぐアプリを使う</Link>
              <div>
                <small>※本サービスはスマートフォン向けに最適化しております。</small>
                <small>
                  {"　"}スマートフォンでの使用を<strong>強く</strong>おすすめします。
                </small>
              </div>
            </section>
          </div>
        </motion.article>
        <div className="-mt-[26rem]">
          <article className={styles.smoothExperience}>
            <section>
              <h2>Smooth Experience</h2>
              <h3>シンプルで便利なランチ体験を提供いたします。</h3>
            </section>
            <section>
              <div>
                <h4>
                  <span>
                    <NavigatorAlt />
                  </span>
                  <span>的確なルート案内</span>
                </h4>
                <h4>
                  <span>
                    <PizzaSlice />
                  </span>
                  <span>豊富な料理数</span>
                </h4>
                <h4>
                  <span>
                    <BookStack />
                  </span>
                  <span>便利なランチ日記</span>
                </h4>
              </div>
              <div>
                <h4>
                  <span>
                    <LogoOutline />
                  </span>
                  <span>シンプルなデザイン</span>
                </h4>
                <h4>
                  <span>
                    <Shop />
                  </span>
                  <span>詳細な店舗情報</span>
                </h4>
              </div>
            </section>
          </article>
          <article className={styles.routeFirst}>
            <section>
              <span>これまでにない</span>
              <h3>
                <span>わかりやすい</span>
                <span>ルート案内。</span>
              </h3>
              <span>目的地まで正確にご案内いたします。</span>
            </section>
            <motion.div
              initial={{ x: "115%", rotateY: 0 }}
              whileInView={{ x: 0, rotateY: -360 }}
              transition={{
                duration: 1,
                ease: [0.65, 0, 0.35, 1], // easeInOutCubic
              }}
              viewport={{ once: true }}
            >
              <Image
                src={"/images/demo/restaurant-navi.webp"}
                alt="demo"
                width={200.25}
                height={405.675}
                priority
              />
            </motion.div>
          </article>
          <article className={styles.routeSecond}>
            <div>
              <motion.div
                initial={{ y: "50%" }}
                whileInView={{ y: 0 }}
                transition={{
                  duration: 0.8,
                  ease: [0.65, 0, 0.35, 1], // easeInOutCubic
                }}
              >
                <Image
                  src={"/images/demo/restaurant-navi.webp"}
                  alt="demo"
                  width={333.75}
                  height={676.125}
                  priority
                />
              </motion.div>
              <h3>
                <span>もちろん</span>
                <span>地下も対応</span>
              </h3>
            </div>
          </article>
          <article className={styles.lunchTime}>
            <section>
              <h4>近場の厳選された飲食店のみ掲載</h4>
              <motion.span
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                transition={{
                  delay: 0.1,
                  duration: 0.8,
                  ease: [0.65, 0, 0.35, 1], // easeInOutCubic
                }}
                viewport={{ once: true }}
                style={{ transformOrigin: "left" }}
              />
              <div>
                <section>
                  <div>
                    <span>コクーンタワー</span>
                    <NavigationPlayer />
                    <span>お店</span>
                  </div>
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{
                      delay: 0.3,
                      type: "spring",
                      stiffness: 150,
                      damping: 20,
                    }}
                    viewport={{ once: true }}
                  >
                    <span>最大</span>
                    <span>8分</span>
                  </motion.div>
                  <span>移動時間</span>
                </section>
                <section>
                  <div>
                    <Image src={"/images/dish.webp"} alt="dish" width={100} height={75} />
                    {/* <span>コクーンタワー</span>
                  <NavigationPlayer />
                  <span>お店</span> */}
                  </div>
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{
                      delay: 0.6,
                      type: "spring",
                      stiffness: 150,
                      damping: 20,
                    }}
                    viewport={{ once: true }}
                  >
                    <span>最大</span>
                    <span>25分</span>
                  </motion.div>
                  <span>店内滞在時間</span>
                </section>
              </div>
            </section>
            <section>
              <div>
                <LounasRing />
              </div>
              <div>
                <span>限られた時間でも</span>
                <h3>
                  <span>彩る</span>ランチを
                </h3>
              </div>
            </section>
          </article>
          <article className={styles.recommendFirst}>
            <div>
              <motion.span
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{
                  delay: 0,
                  type: "spring",
                  stiffness: 80,
                  damping: 8,
                }}
              >
                がっつり
              </motion.span>
              <motion.span
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{
                  delay: 0.2,
                  type: "spring",
                  stiffness: 80,
                  damping: 8,
                }}
              >
                普通
              </motion.span>
              <motion.span
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{
                  delay: 0.1,
                  type: "spring",
                  stiffness: 80,
                  damping: 8,
                }}
              >
                少なめ
              </motion.span>
              <motion.span
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{
                  delay: 0.3,
                  type: "spring",
                  stiffness: 80,
                  damping: 8,
                }}
              >
                おまかせ
              </motion.span>
            </div>
            <section>
              <h3>
                <span>検索はいたって</span>
                <span>シンプル</span>
              </h3>
            </section>
          </article>
          <article className={styles.recommendSecond}>
            <div>
              <span>たった</span>
            </div>
            <section>
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{
                  duration: 0.8,
                  ease: [0.65, 0, 0.35, 1], // easeInOutCubic
                }}
              >
                <span>3</span>
                <span>つ</span>
              </motion.div>
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{
                  delay: 0.7,
                  duration: 0.6,
                  ease: [0.65, 0, 0.35, 1], // easeInOutCubic
                }}
              >
                <Image
                  src={"/images/demo/recommend-1.webp"}
                  alt="demo"
                  width={160.2}
                  height={324.54}
                  priority
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{
                  delay: 0.8,
                  duration: 0.6,
                  ease: [0.65, 0, 0.35, 1], // easeInOutCubic
                }}
              >
                <Image
                  src={"/images/demo/recommend-2.webp"}
                  alt="demo"
                  width={160.2}
                  height={324.54}
                  priority
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{
                  delay: 0.9,
                  duration: 0.6,
                  ease: [0.65, 0, 0.35, 1], // easeInOutCubic
                }}
              >
                <Image
                  src={"/images/demo/recommend-3.webp"}
                  alt="demo"
                  width={160.2}
                  height={324.54}
                  priority
                />
              </motion.div>
            </section>
          </article>
          <article className={styles.recommendEyecatch}>
            <div>
              <motion.span
                initial={{ x: "-800%", scale: 3 }}
                whileInView={{ x: 0, scale: 1 }}
                transition={{
                  delay: 0.1,
                  duration: 0.6,
                  ease: [0.65, 0, 0.35, 1], // easeInOutCubic
                }}
              >
                の
              </motion.span>
              <motion.span
                initial={{ x: "400%", scale: 3 }}
                whileInView={{ x: 0, scale: 1 }}
                transition={{
                  delay: 0.5,
                  duration: 0.6,
                  ease: [0.65, 0, 0.35, 1], // easeInOutCubic
                }}
              >
                質問で
              </motion.span>
            </div>
          </article>
          <article className={styles.recommendThird}>
            <section>
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1143.916"
                  height="936.837"
                  viewBox="0 0 1143.916 936.837"
                >
                  <g transform="translate(-560.574 -357.163)">
                    <rect
                      width="82"
                      height="510"
                      rx="41"
                      transform="matrix(0.602, -0.799, 0.799, 0.602, 787.574, 876.206)"
                      fill="#00ffb1"
                    />
                    <rect
                      width="82"
                      height="510"
                      rx="41"
                      transform="matrix(0.602, -0.799, 0.799, 0.602, 868.574, 834.206)"
                      fill="#00ffb1"
                    />
                    <rect
                      width="120.203"
                      height="510"
                      rx="60.102"
                      transform="matrix(0.602, -0.799, 0.799, 0.602, 719.781, 625.867)"
                      fill="#00ffb1"
                    />
                    <rect
                      width="78"
                      height="510"
                      rx="39"
                      transform="matrix(0.602, -0.799, 0.799, 0.602, 560.574, 601.206)"
                      fill="#f5f5f5"
                    />
                    <rect
                      width="63.947"
                      height="69.824"
                      rx="31.973"
                      transform="matrix(0.602, -0.799, 0.799, 0.602, 728, 503.746)"
                      fill="#07f"
                    />
                    <rect
                      width="22.585"
                      height="137.824"
                      rx="11.293"
                      transform="matrix(0.602, -0.799, 0.799, 0.602, 698.584, 739.588)"
                      fill="#00dcff"
                    />
                    <rect
                      width="21.45"
                      height="30.902"
                      rx="10.725"
                      transform="matrix(0.602, -0.799, 0.799, 0.602, 869.781, 851.7)"
                      fill="#07f"
                    />
                    <rect
                      width="39.45"
                      height="99.499"
                      rx="19.725"
                      transform="matrix(0.602, -0.799, 0.799, 0.602, 771.23, 727.35)"
                      fill="#07f"
                    />
                    <rect
                      width="44.917"
                      height="270.824"
                      rx="22.459"
                      transform="matrix(0.602, -0.799, 0.799, 0.602, 719.781, 912.896)"
                      fill="#07f"
                    />
                    <rect
                      width="25.898"
                      height="43.142"
                      rx="12.949"
                      transform="matrix(0.602, -0.799, 0.799, 0.602, 719.781, 983.809)"
                      fill="#00ffb1"
                    />
                    <rect
                      width="25.898"
                      height="27.142"
                      rx="12.949"
                      transform="matrix(0.602, -0.799, 0.799, 0.602, 744.801, 855.253)"
                      fill="#00dcff"
                    />
                    <rect
                      width="25.898"
                      height="27.142"
                      rx="12.949"
                      transform="matrix(0.602, -0.799, 0.799, 0.602, 1053.531, 570.253)"
                      fill="#07f"
                    />
                    <rect
                      width="25.898"
                      height="27.142"
                      rx="12.949"
                      transform="matrix(0.602, -0.799, 0.799, 0.602, 665.531, 559.596)"
                      fill="#00ffb1"
                    />
                    <rect
                      width="132.947"
                      height="510"
                      rx="66.473"
                      transform="matrix(0.602, -0.799, 0.799, 0.602, 1006.002, 886.074)"
                      fill="#07f"
                    />
                    <rect
                      width="132.947"
                      height="510"
                      rx="66.473"
                      transform="matrix(0.602, -0.799, 0.799, 0.602, 855.77, 621.176)"
                      fill="#07f"
                    />
                    <rect
                      width="88"
                      height="510"
                      rx="44"
                      transform="matrix(0.602, -0.799, 0.799, 0.602, 1165.277, 427.444)"
                      fill="#00dcff"
                    />
                    <rect
                      width="88"
                      height="510"
                      rx="44"
                      transform="matrix(0.602, -0.799, 0.799, 0.602, 1244.227, 570.097)"
                      fill="#00dcff"
                    />
                    <rect
                      width="88"
                      height="510"
                      rx="44"
                      transform="matrix(0.602, -0.799, 0.799, 0.602, 1152.098, 575.074)"
                      fill="#00dcff"
                    />
                    <rect
                      width="88"
                      height="510"
                      rx="44"
                      transform="matrix(0.602, -0.799, 0.799, 0.602, 888.574, 987.074)"
                      fill="#00dcff"
                    />
                    <rect
                      width="88"
                      height="120.181"
                      rx="44"
                      transform="matrix(0.602, -0.799, 0.799, 0.602, 1044.234, 886.173)"
                      fill="#00dcff"
                    />
                    <rect
                      width="175.22"
                      height="400.61"
                      rx="87.61"
                      transform="matrix(0.602, -0.799, 0.799, 0.602, 1185.971, 919.835)"
                      fill="#00dcff"
                    />
                    <rect
                      width="72.77"
                      height="274.815"
                      rx="36.385"
                      transform="matrix(0.602, -0.799, 0.799, 0.602, 1090.791, 709.865)"
                      fill="#00ffb1"
                    />
                    <rect
                      width="32.77"
                      height="59.815"
                      rx="16.385"
                      transform="matrix(0.602, -0.799, 0.799, 0.602, 1118.352, 628.741)"
                      fill="#00ffb1"
                    />
                    <rect
                      width="40"
                      height="253"
                      rx="20"
                      transform="matrix(0.602, -0.799, 0.799, 0.602, 1165.277, 475.756)"
                      fill="#f5f5f5"
                    />
                    <rect
                      width="41.963"
                      height="321.786"
                      rx="20.982"
                      transform="matrix(0.602, -0.799, 0.799, 0.602, 1300.756, 764.844)"
                      fill="#07f"
                    />
                    <rect
                      width="50.342"
                      height="370.786"
                      rx="25.171"
                      transform="matrix(0.602, -0.799, 0.799, 0.602, 1170.756, 622.237)"
                      fill="#07f"
                    />
                  </g>
                </svg>
              </div>
            </section>
            <section>
              <div>
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{
                    duration: 0.6,
                    ease: [0.65, 0, 0.35, 1], // easeInOutCubic
                  }}
                >
                  <Image
                    src={"/images/demo/recommend-result.webp"}
                    alt="demo"
                    width={200.25}
                    height={324.54}
                    priority
                  />
                </motion.div>
                <motion.div
                  initial={{ x: "-75%", opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  transition={{
                    delay: 0.4,
                    duration: 0.6,
                    ease: [0.65, 0, 0.35, 1], // easeInOutCubic
                  }}
                >
                  <Image
                    src={"/images/demo/dish.webp"}
                    alt="demo"
                    width={160.2}
                    height={405.675}
                    priority
                  />
                </motion.div>
              </div>
              <h3>
                <span>あなたにおすすめなお店</span>
                <span>を提案いたします!!</span>
              </h3>
            </section>
          </article>
          <article className={styles.ourMission}>
            <Image src={"/images/cocoon.webp"} alt="cocoon" fill priority />
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{
                delay: 0.3,
                duration: 0.6,
                ease: [0.65, 0, 0.35, 1], // easeInOutCubic
              }}
              viewport={{ once: true }}
            >
              <section>
                <div>
                  <p>数多くの飲食店がある新宿に</p>
                  <p>立地するコクーンタワー。</p>
                  <p>その中で過ごす人たち</p>
                  <p>のランチを便利にしたいという思いから</p>
                  <p>「lounas」プロジェクトが生まれました。</p>
                </div>
                <div>
                  <p>私たちは、学生が手軽に近くの飲食店やカフェを見つけ、</p>
                  <p>選択肢を比較し、好みに合ったランチを</p>
                  <p>見つけるのに役立つアプリを</p>
                  <p>開発しました。</p>
                  <p>これは、学生生活をより楽しいものにするための一助</p>
                  <p>となるであろうとの信念がありました。</p>
                </div>
                <div>
                  <p>これからも、多くの方にご愛顧いただけるようアプリの品質向上に努め</p>
                  <p>学生の生活が少しでも豊かになれるよう日々活動してまいります。</p>
                </div>
              </section>
              <section>
                <div>
                  <p>チームlounas一同</p>
                  <p>Powered by ChatGPT</p>
                </div>
              </section>
            </motion.div>
          </article>
          <article className={styles.nextNiki}>
            <div>
              <span className={`${styles.circle} ${styles.blue}`}></span>
              <span className={`${styles.circle} ${styles.cyan}`}></span>
              <span className={`${styles.circle} ${styles.green}`}></span>
            </div>
            <h2>これからもよりよいサービスを</h2>
            <div>
              <section>
                <h3>
                  <motion.span
                    initial={{ x: "95%" }}
                    whileInView={{ x: 0 }}
                    transition={{
                      delay: 0.5,
                      duration: 0.6,
                      ease: [0.65, 0, 0.35, 1], // easeInOutCubic
                    }}
                    viewport={{ once: true }}
                  >
                    <LogoFullColor />
                  </motion.span>
                  <motion.span
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{
                      delay: 1,
                      duration: 0.6,
                      ease: [0.65, 0, 0.35, 1], // easeInOutCubic
                    }}
                    viewport={{ once: true }}
                  >
                    は進化し続けます。
                  </motion.span>
                </h3>
              </section>
              <section>
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{
                    duration: 0.6,
                    ease: [0.65, 0, 0.35, 1], // easeInOutCubic
                  }}
                >
                  <span>ランキング</span>
                  <Image
                    src={"/images/demo/ranking.webp"}
                    alt="demo"
                    width={98.71875}
                    height={213.6375}
                  />
                </motion.div>
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{
                    duration: 0.6,
                    ease: [0.65, 0, 0.35, 1], // easeInOutCubic
                  }}
                >
                  <span>My日記</span>
                  <Image
                    src={"/images/demo/diary.webp"}
                    alt="demo"
                    width={98.71875}
                    height={213.6375}
                  />
                </motion.div>
              </section>
              <section>
                <p>
                  フィードバックなどは
                  <Link
                    href={"https://forms.gle/c1gosjcJZf5gTtvCA"}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    こちらのForms
                  </Link>
                  に
                </p>
                <p>ご連絡くださいますと幸いです。</p>
              </section>
            </div>
          </article>
        </div>
      </motion.main>
      <footer className={`${styles.footer} ${notoSansJP.className}`}>
        <section>
          <div>
            <h2>
              <span>
                <LogoFullColor title="lounas" />
              </span>
              <small>コクーンタワーのためのランチサービス</small>
            </h2>
            <div>
              <h5>
                <Link href={"/tos"} target="_blank" rel="noopener noreferrer">
                  利用規約
                </Link>
              </h5>
              <h5>
                <Link href={"/webapp"} target="_blank" rel="noopener noreferrer">
                  お試し
                </Link>
              </h5>
            </div>
          </div>
          <div>
            <div>
              <h4>
                <Link
                  href={"https://forms.gle/c1gosjcJZf5gTtvCA"}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span>
                    <SendDiagonal />
                  </span>
                  <span>Feedback Form</span>
                </Link>
              </h4>
              <h4>
                <Link href={"https://x.com/lounas_app"} target="_blank" rel="noopener noreferrer">
                  <span>
                    <Twitter />
                  </span>
                  <span>X/Twitter</span>
                </Link>
              </h4>
              <h4>
                <Link
                  href={"https://www.instagram.com/lounas_app"}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span>
                    <Instagram />
                  </span>
                  <span>Instagram</span>
                </Link>
              </h4>
            </div>
          </div>
          <div>
            <h3>
              <Link href={"/signup"}>今すぐアプリを使う</Link>
            </h3>
            <div>
              <small>※本アプリはスマートフォン向けに最適化しております。</small>
              <small>{"　"}スマートフォンでの使用を強くおすすめします。</small>
              <small>※サービスの利用にはサインインする必要があります。</small>
              <small>※現在β版のため以下の学校に対応しています。(順次展開予定)</small>
              <ul>
                <li>東京国際工科専門職大学</li>
              </ul>
            </div>
          </div>
        </section>
        <section>
          <h6>&copy; {new Date().getFullYear()} lounas App Dev. Co. All rights reserved.</h6>
        </section>
      </footer>
    </>
  );
}
