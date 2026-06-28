from pathlib import Path

from PIL import Image, ImageOps


SOURCES = {
    "tralalero": r"C:\Users\bentu\.codex\generated_images\019ed196-5b29-76f3-9fdd-ae8626338990\exec-a130b774-74fc-46cf-be2e-dfce13173a79.png",
    "bombardiro": r"C:\Users\bentu\.codex\generated_images\019ed196-5b29-76f3-9fdd-ae8626338990\exec-fc424ef8-aa3c-4cfe-a2b8-2cebe2670353.png",
    "ballerina": r"C:\Users\bentu\.codex\generated_images\019ed196-5b29-76f3-9fdd-ae8626338990\exec-2e1d7842-73a3-415e-830f-92fdc83a2f9e.png",
    "tung": r"C:\Users\bentu\.codex\generated_images\019ed196-5b29-76f3-9fdd-ae8626338990\exec-060b48a6-1cc9-455d-b1f3-63b40bee19bc.png",
    "chimpanzini": r"C:\Users\bentu\.codex\generated_images\019ed196-5b29-76f3-9fdd-ae8626338990\exec-953c8e6d-06f5-446e-9232-4c5db367c9ee.png",
    "lirili": r"C:\Users\bentu\.codex\generated_images\019ed196-5b29-76f3-9fdd-ae8626338990\exec-8fecf848-43bc-499b-8d8f-eaf1494347de.png",
    "cocofanto": r"C:\Users\bentu\.codex\generated_images\019ed196-5b29-76f3-9fdd-ae8626338990\exec-cd5250ca-193a-4d1a-aca3-85945aa4e2d6.png",
    "trenostruzzo": r"C:\Users\bentu\.codex\generated_images\019ed196-5b29-76f3-9fdd-ae8626338990\exec-9b055232-d069-44f3-966d-7039d33e62bc.png",
}

OUTPUT = Path("assets/coloring")
OUTPUT.mkdir(parents=True, exist_ok=True)

for name, source in SOURCES.items():
    image = Image.open(source).convert("L")
    image = ImageOps.autocontrast(image, cutoff=1)
    image.thumbnail((900, 1200), Image.Resampling.LANCZOS)
    image = image.point(lambda value: 0 if value < 205 else 255, mode="1").convert("L")

    page = Image.new("L", (900, 1200), 255)
    x = (page.width - image.width) // 2
    y = (page.height - image.height) // 2
    page.paste(image, (x, y))
    page.save(OUTPUT / f"{name}.png", optimize=True)
    print(f"Wrote {OUTPUT / f'{name}.png'}")
