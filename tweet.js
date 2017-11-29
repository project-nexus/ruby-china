const text = "🍖かたまり肉が焼ける #ロティサリーグリル 🍖\n誰と一緒に食べたい？肉を楽しむグッズが当たる🎁\n ①アカウントをフォロー\n ②選択肢からツイート\n#ロティサリーグリルでいい肉を\n詳細⇒https://t.co/7EkhKQFbFA https://t.co/pJ7adCVkhB";

const displayTextRange = [0, 142];

const entities = {
  hashTags: [
    {
      indices: [12, 22],
      text: "ロティサリーグリル"
    },
    {
      indices: [76, 91],
      text: "ロティサリーグリルでいい肉を"
    }
  ]
};



entities.hashTags.forEach(hashTag => {
  console.log(text.slice(...hashTag.indices));
})
