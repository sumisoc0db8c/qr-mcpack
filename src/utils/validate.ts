/**
 * 入力チェック
 * 空、140文字以内、制御文字NG
 * 
 * @param text 
 * @returns エラーメッセージ or 正常時はnull
 */
export function validateInput(text: string): string | null {
  if (!text.trim()) {
    return "文字を入力してください";
  }
  if (text.length > 140) {
    return "140文字以内で入力してください";
  }
  // 制御文字チェック
  if (/[\x00-\x1F]/.test(text)) {
    return "制御文字は使用できません";
  }
  return null; // 問題なし
}