export default function Rules() {
  const gradientTextStyle = {
    background: "linear-gradient(45deg, #ffffff, rgb(251, 255, 14), #27e82ad9)",
    WebkitBackgroundClip: "text" as const,
    WebkitTextFillColor: "transparent" as const,
    fontWeight: "bold",
  };

  return (
    <div
      className="fixed z-[9999] left-1/2 top-1/2 max-w-xl w-full p-6 rounded-2xl shadow-xl text-gray-800 leading-relaxed space-y-4 text-base"
      style={{
        transform: "translate(-50%, -50%)",
        background: "linear-gradient(75deg, #fbf7afef, #74d16eff, #efff14d9)",
      }}
    >
      <h1 className="text-2xl text-center mb-4" style={gradientTextStyle}>
        游戏规则
      </h1>

      <p>
        这是一个与四叶草有关的猜词卡的小游戏, 创作来源于桌游 So Clover!
      </p>

      <h2 className="font-bold text-lg" style={gradientTextStyle}>
        出题人
      </h2>
      <ul className="list-disc list-inside space-y-1">
        <li>系统会随机发放4张词卡到幸运草格子里。</li>
        <li>你需要在两个词之间的叶子上写下关联提示。</li>
        <li>提交后，词卡会被打乱并加入一张干扰卡。</li>
        <li>游戏中请保持答案秘密，别透漏哦。</li>
      </ul>

      <h2 className="font-bold text-lg" style={gradientTextStyle}>
        猜题人
      </h2>
      <ul className="list-disc list-inside space-y-1">
        <li>根据提示，摆放词卡。</li>
        <li>点击词卡中间按钮可旋转卡片，调整方向。</li>
        <li>放好后，点击提交按钮完成挑战。</li>
      </ul>

      <h2 className="font-bold text-lg" style={gradientTextStyle}>
        游戏流程
      </h2>
      <ul className="list-disc list-inside space-y-1">
        <li>出题人写提示词，提交。</li>
        <li>系统打乱词卡并加入干扰卡。</li>
        <li>猜题人摆放、调整并提交词卡。</li>
        <li>失败别气馁，继续尝试！</li>
      </ul>

      <p className="text-center text-sm text-green-900 font-semibold mt-6">
        轻松享受，祝你玩得开心！
      </p>
    </div>
  );
}
