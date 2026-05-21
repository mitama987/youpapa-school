import Link from "next/link";
import type { Metadata } from "next";

const LINE_URL = "https://lin.ee/ob91zIx";
const GH_DISCUSSIONS = "https://github.com/mitama987/youpapa-school/discussions";

export const metadata: Metadata = {
  title: "掲示板｜質問・進捗共有",
  description: "副業×AI×自動化スクール「シクミ」の掲示板。講座のつまずき・進捗・成果をGitHub DiscussionsとLINEで共有・質問できます。",
};

export default function Community() {
  return (
    <div className="comm">
      <span className="eyebrow">COMMUNITY</span>
      <div className="big">掲示板</div>
      <p>つまずき・進捗・成果はみんなで共有すると続きます。質問も歓迎です。</p>

      <div className="panel">
        <h3>GitHub Discussions（質問・進捗共有）</h3>
        <p>講座のつまずきや実践レポートはこちら。GitHubアカウントがあればすぐ書き込めます。</p>
        <p style={{ marginTop: 16 }}>
          <a className="btn btn-primary" href={GH_DISCUSSIONS} target="_blank" rel="noopener">
            掲示板を開く（GitHub Discussions）→
          </a>
        </p>
      </div>

      <div className="panel">
        <h3>LINE（1対1の相談・最新配布）</h3>
        <p>「作業時間の作り方」や自動化スキルの配布、個別の相談はLINEで。無料、合わなければすぐ解除できます。</p>
        <p style={{ marginTop: 16 }}>
          <a className="btn btn-line" href={LINE_URL}>
            LINEで受け取る（無料）
          </a>
        </p>
      </div>

      <p>
        <Link href="/">← 講座一覧へ戻る</Link>
      </p>
    </div>
  );
}
