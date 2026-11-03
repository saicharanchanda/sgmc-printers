# AI image prompts — machine photos

The client does not want real photos, and free stock libraries (Pexels/Unsplash, checked 2026-11-03)
have **no** usable photos of CTP plate-setters, folding machines, perfect binders or stitching lines.
So the machine images are AI-generated with the prompts below.

## Which tool

| Tool | Commercial use | Notes |
|---|---|---|
| **Adobe Firefly** (recommended) | Yes, trained on licensed images, Adobe offers indemnity | Best for a business site |
| ChatGPT (image generation) | Yes, you own the output | Good at following detailed prompts |
| Google Gemini / Imagen | Yes, per Google's terms | Fast, free tier |
| Midjourney | Paid plan only | Best-looking, least literal |

## Output settings (all images)

- **Aspect ratio 4:3, landscape**, at least **2000 px wide**
- Save as JPG with the exact file name, into `src/assets/images/`, then `git push` (the site resizes them)

## Shared style (paste after every prompt)

> Photorealistic industrial photography, inside a clean, well-lit Indian commercial printing
> factory, concrete floor, daylight from high windows mixed with overhead LED tubes, shot on a
> 35mm lens at chest height from a three-quarter angle, the whole machine in frame, shallow
> depth of field, neutral colour grading, sharp detail. No logos, no brand names, no readable
> text, no watermarks. No people, or at most one operator in a plain dark work shirt, seen from
> the side, face not prominent.

## Prompts

### 1. `machine-komori-coldset-web.jpg` — Komori Coldset Web Offset
> A large four-unit coldset web offset printing press, tall stacked printing towers with
> walkways and railings, a giant white paper reel unwinding at the reel stand on the left,
> a continuous paper web running through the units into a folder at the right end,
> grey and white machine panels.

### 2. `machine-orient-web-4i.jpg` — Orient Web Offset – 4i
> A compact four-unit web offset printing press used for books and newspapers, blue and
> white machine body, a paper reel stand at the back, printed web running over rollers into
> a delivery folder, stacks of printed signatures at the delivery end.

### 3. `machine-l37-offset.jpg` — L37 Offset Printing Machine
> A single-colour sheet-fed offset printing press, medium-size, with a sheet feeder pile of
> white paper on the right, ink rollers visible under a raised guard, a delivery pile of
> freshly printed sheets on the left, compact workshop setting.

### 4. `machine-komori-25x36.jpg` — Komori 25 × 36
> A long modern four-colour sheet-fed offset printing press with four identical printing
> units in a row, dark grey and white panels, a feeder with a tall stack of paper at one end
> and a delivery with printed colour sheets at the other, a small control console in front.

### 5. `machine-komori-18x25.jpg` — Komori 18 × 25
> A compact two-colour sheet-fed offset printing press, smaller format, two printing units,
> dark grey and white body, paper pile in the feeder, printed sheets stacked at delivery.

### 6. `machine-ctp.jpg` — CTP (Computer-to-Plate) System
> A computer-to-plate (CTP) platesetter in a clean pre-press room: a white and grey box-shaped
> plate imaging machine with a plate processor attached, shiny aluminium offset printing
> plates with blue imaged areas coming out onto the conveyor, a computer workstation with a
> monitor beside it.

### 7. `machine-folding.jpg` — Folding Machines
> An industrial paper folding machine for book signatures: a long buckle folder with several
> folding plates and rollers, a feeder holding a stack of large printed sheets, folded
> signatures coming out onto a delivery conveyor, neat stacks of folded sections beside it.

### 8. `machine-perfect-binding.jpg` — Perfect Binding
> An industrial perfect binding line producing paperback books: a long machine with a
> gathering section, a glue-binding unit and a cover feeder, finished softcover textbooks
> coming off the conveyor, stacks of bound books on a wooden pallet nearby.

### 9. `machine-pinning-stitching.jpg` — Pinning / Stitching
> An industrial saddle stitching line making booklets and notebooks: a row of gathering
> stations feeding folded sections onto a saddle chain, a wire stitching head, a three-knife
> trimmer at the end, finished stapled booklets stacking on the delivery belt.

## Check every image before using it

- Logos or gibberish lettering on the machine → regenerate, or ask the tool to remove them
- Physically impossible parts (rollers going nowhere, floating stairs) → regenerate
- People with odd hands or faces → regenerate, or crop them out
- It should look like the **type** of machine. Visitors will assume it's the real one, so keep
  the small "Representative image" label on the site (see below)

## Honesty note

These images show the *type* of machine, not SGMC's actual unit. The site labels each one
"Representative image" so no customer is misled. That protects the client and costs nothing.
Remove the label only if a real photo replaces it.
