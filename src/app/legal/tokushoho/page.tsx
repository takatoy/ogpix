import { Nav } from "@/components/nav";

export default function TokushohoPage() {
  return (
    <div className="min-h-screen">
      <Nav />
      <div className="max-w-3xl mx-auto px-6 pt-24 pb-16">
        <h1 className="text-3xl font-bold mb-8">特定商取引法に基づく表記</h1>

        <div className="border border-zinc-800 rounded-xl overflow-hidden">
          <table className="w-full text-sm">
            <tbody className="divide-y divide-zinc-800">
              <Row label="販売業者" value="【あなたの氏名または屋号を記入】" />
              <Row label="運営統括責任者" value="【あなたの氏名を記入】" />
              <Row
                label="所在地"
                value="【請求があった場合に遅滞なく開示いたします】"
              />
              <Row
                label="電話番号"
                value="【請求があった場合に遅滞なく開示いたします】"
              />
              <Row label="メールアドレス" value="support@ogpix.dev" />
              <Row label="URL" value="https://ogpix.dev" />
              <Row
                label="販売価格"
                value="Free: $0/月、Pro: $9/月（税込）、Business: $29/月（税込）"
              />
              <Row
                label="商品代金以外の必要料金"
                value="なし（インターネット接続料金はお客様のご負担となります）"
              />
              <Row
                label="支払方法"
                value="クレジットカード（Stripe経由）"
              />
              <Row
                label="支払時期"
                value="サブスクリプション契約時に初回決済、以降毎月自動決済"
              />
              <Row
                label="商品の引渡し時期"
                value="決済完了後、直ちにサービスをご利用いただけます"
              />
              <Row
                label="返品・キャンセルについて"
                value="サブスクリプションはいつでもキャンセル可能です。キャンセル後は現在の請求期間の終了までサービスをご利用いただけます。デジタルサービスの性質上、日割り返金には対応しておりません。"
              />
              <Row
                label="動作環境"
                value="REST APIとして提供。インターネット接続環境およびHTTPリクエストが可能な環境が必要です。"
              />
            </tbody>
          </table>
        </div>

        <p className="text-zinc-500 text-xs mt-6">
          ※ 個人事業主のため、氏名・住所・電話番号は請求があった場合に遅滞なく開示いたします。
        </p>
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <tr>
      <td className="p-4 font-semibold text-zinc-300 bg-zinc-900/50 w-48 align-top">
        {label}
      </td>
      <td className="p-4 text-zinc-400">{value}</td>
    </tr>
  );
}
