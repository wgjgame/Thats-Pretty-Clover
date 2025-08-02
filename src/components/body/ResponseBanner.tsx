export default function ResponseBanner({
  matchSuccess,
  failedCount,
  warning,
}: {
  matchSuccess: boolean | undefined;
  failedCount: number;
  warning: { showWarning: boolean; type: string };
}) {
  const failMessages = [
    "哈哈，不对～你再想想。",
    "不行欸，这组合我不批。",
    "啧，又错啦～你是不是故意的？",
    "不是？你也太有才了吧～",
    "你是不是眼花了？再给你一次机会，认真看看！",
    "我服了，咱不行找个学上吧。",
    "王八办走读，鳖不住了",
    "开发商气的连夜卷款跑路咯。",
  ];

  const renderCenteredBanner = (text: string) => (
    <div className="mt-10 flex items-center justify-center pointer-events-none z-50">
      <div
        style={{
          background: "linear-gradient(90deg, #ede200d9, #84f000ff, #008819d9)",
        }}
        className="rounded-3xl p-5"
      >
        <h2
          style={{
            color: "black",
          }}
          className="text-green-1000 font-bold text-lg"
        >
          {text}
        </h2>
      </div>
    </div>
  );

  if (matchSuccess) return renderCenteredBanner("哇，你也太厉害了吧！");
  if (failedCount === 8 && matchSuccess === false)
    return renderCenteredBanner(failMessages[7]);
  if (failedCount <= 7 && matchSuccess === false) {
    return (
      <div
        style={{
          background: "linear-gradient(90deg, #1bf3c8ef, #90f317ff, #29be5fd9)",
        }}
        className="z-50 fixed top-4 left-1/2 -translate-x-1/2 text-lg border-4 border-green-300 font-semibold py-3 px-7 rounded-xl shadow-md"
      >
        {failMessages[failedCount-1]}
      </div>
    );
  }
  if (warning.showWarning === true)
    return (
      <div
        style={{
          background: "linear-gradient(90deg, #1bf3c8ef, #90f317ff, #29be5fd9)",
        }}
        className="fixed top-4 left-1/2 -translate-x-1/2 text-lg border-4 border-green-300 font-semibold py-3 px-7 rounded-xl shadow-md"
      >
        {warning.type === "lastFour"
          ? "你需要把每一张卡片放入幸运草格子内"
          : "你需要填写完每一个线索词"}
      </div>
    );

  return null;
}
