"""汎用サムネイル生成テンプレート（任意・画像生成は上級ステップ／Python要）。

gpt-image-2 で 1536x1024 を生成 → 中央を 1.91:1 にクロップ → 1280x670（note推奨）へ縮小する。
APIキーは環境変数 OPENAI_API_KEY、または data.json（環境変数 OPENAI_DATA_JSON でパス指定）から読む。

使い方:
    uv run python gen_thumbnail.py "サムネのプロンプト文" 出力先.png

依存: openai, pillow（uv add openai pillow）
"""
import base64
import io
import json
import os
import pathlib
import sys

from openai import OpenAI
from PIL import Image

TARGET_W, TARGET_H = 1280, 670  # note 推奨サイズ（1.91:1）


def load_openai_config() -> tuple[str, str]:
    """OpenAIキーとモデルを 環境変数 → data.json の順で取得。"""
    key = os.environ.get("OPENAI_API_KEY")
    model = os.environ.get("OPENAI_IMAGE_MODEL", "gpt-image-2")
    if key:
        return key, model
    cfg_path = os.environ.get("OPENAI_DATA_JSON")  # 例: <Vault>\.obsidian\plugins\buzzblog-generator\data.json
    if cfg_path and pathlib.Path(cfg_path).exists():
        cfg = json.loads(pathlib.Path(cfg_path).read_text(encoding="utf-8"))
        return cfg["openaiApiKey"], cfg.get("openaiImageModel", model)
    raise SystemExit(
        "OPENAI_API_KEY が見つかりません。環境変数 OPENAI_API_KEY を設定するか、"
        "OPENAI_DATA_JSON に data.json のパスを設定してください。"
    )


def main() -> None:
    if len(sys.argv) < 3:
        raise SystemExit('使い方: uv run python gen_thumbnail.py "プロンプト" 出力.png')
    prompt = sys.argv[1]
    out = pathlib.Path(sys.argv[2])

    api_key, model = load_openai_config()
    client = OpenAI(api_key=api_key)

    resp = client.images.generate(model=model, prompt=prompt, size="1536x1024", n=1)
    img = Image.open(io.BytesIO(base64.b64decode(resp.data[0].b64_json))).convert("RGB")

    # 中央を 1.91:1 にクロップ → LANCZOS で 1280x670 に縮小
    ratio = TARGET_W / TARGET_H
    w, h = img.size
    new_h = int(round(w / ratio))
    top = max(0, (h - new_h) // 2)
    img = img.crop((0, top, w, top + new_h)).resize((TARGET_W, TARGET_H), Image.LANCZOS)

    out.parent.mkdir(parents=True, exist_ok=True)
    img.save(out, format="PNG", optimize=True)
    print(f"saved: {out} ({out.stat().st_size} bytes)")


if __name__ == "__main__":
    main()
