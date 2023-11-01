"use client";

import BookStack from "@icons/book-stack.svg";
import LogoFullColor from "@icons/logo-full-color.svg";
import LogoOutline from "@icons/logo-outline.svg";
import LounasRing from "@icons/lounas-ring.svg";
import NavigatorAlt from "@icons/navigator-alt.svg";
import PizzaSlice from "@icons/pizza-slice.svg";
import Shop from "@icons/shop.svg";
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
            src={"/images/demo/ranking.png"}
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
            src={"/images/demo/signup.png"}
            alt="demo"
            width={131.625}
            height={284.85}
            priority
          />
          <Image
            src={"/images/demo/recommend-loading.png"}
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
            src={"/images/demo/home.png"}
            alt="demo"
            width={131.625}
            height={284.85}
            priority
          />
          <Image
            src={"/images/demo/user-signout.png"}
            alt="demo"
            width={131.625}
            height={284.85}
            priority
          />
          <Image
            src={"/images/demo/privacy.png"}
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
            src={"/images/demo/restaurant-navi.png"}
            alt="demo"
            width={131.625}
            height={284.85}
            priority
          />
          <Image
            src={"/images/demo/dish.png"}
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
            src={"/images/demo/recommend-1.png"}
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
            <LogoFullColor />
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
      <div className="absolute inset-0 top-[28rem]">
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
              src={"/images/demo/restaurant-navi.png"}
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
                src={"/images/demo/restaurant-navi.png"}
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
                    stiffness: 120,
                    damping: 10,
                  }}
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
                    stiffness: 120,
                    damping: 10,
                  }}
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
              initial={{ scale: 0.1 }}
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
                src={"/images/demo/recommend-1.png"}
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
                src={"/images/demo/recommend-2.png"}
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
                src={"/images/demo/recommend-3.png"}
                alt="demo"
                width={160.2}
                height={324.54}
                priority
              />
            </motion.div>
          </section>
        </article>
      </div>
    </motion.main>
  );
}
