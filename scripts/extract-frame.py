import struct
import sys
import zlib
from pathlib import Path


PNG_SIG = b"\x89PNG\r\n\x1a\n"


def read_png(path):
    data = Path(path).read_bytes()
    if not data.startswith(PNG_SIG):
        raise ValueError("Not a PNG file")

    pos = len(PNG_SIG)
    chunks = []
    while pos < len(data):
        length = struct.unpack(">I", data[pos : pos + 4])[0]
        kind = data[pos + 4 : pos + 8]
        payload = data[pos + 8 : pos + 8 + length]
        chunks.append((kind, payload))
        pos += 12 + length

    ihdr = dict()
    compressed = bytearray()
    for kind, payload in chunks:
        if kind == b"IHDR":
            (
                ihdr["width"],
                ihdr["height"],
                ihdr["bit_depth"],
                ihdr["color_type"],
                ihdr["compression"],
                ihdr["filter"],
                ihdr["interlace"],
            ) = struct.unpack(">IIBBBBB", payload)
        elif kind == b"IDAT":
            compressed.extend(payload)

    if ihdr["bit_depth"] != 8 or ihdr["color_type"] != 2 or ihdr["interlace"] != 0:
        raise ValueError("Expected 8-bit non-interlaced RGB PNG")

    raw = zlib.decompress(bytes(compressed))
    width = ihdr["width"]
    height = ihdr["height"]
    bpp = 3
    stride = width * bpp
    rows = []
    i = 0
    prev = bytearray(stride)

    for _ in range(height):
        filter_type = raw[i]
        i += 1
        row = bytearray(raw[i : i + stride])
        i += stride

        for x in range(stride):
          left = row[x - bpp] if x >= bpp else 0
          up = prev[x]
          up_left = prev[x - bpp] if x >= bpp else 0

          if filter_type == 1:
              row[x] = (row[x] + left) & 255
          elif filter_type == 2:
              row[x] = (row[x] + up) & 255
          elif filter_type == 3:
              row[x] = (row[x] + ((left + up) >> 1)) & 255
          elif filter_type == 4:
              p = left + up - up_left
              pa = abs(p - left)
              pb = abs(p - up)
              pc = abs(p - up_left)
              predictor = left if pa <= pb and pa <= pc else up if pb <= pc else up_left
              row[x] = (row[x] + predictor) & 255
          elif filter_type != 0:
              raise ValueError(f"Unsupported PNG filter {filter_type}")

        rows.append(row)
        prev = row

    return width, height, rows


def write_png(path, width, height, rgba_rows):
    def chunk(kind, payload):
        return (
            struct.pack(">I", len(payload))
            + kind
            + payload
            + struct.pack(">I", zlib.crc32(kind + payload) & 0xFFFFFFFF)
        )

    raw = bytearray()
    for row in rgba_rows:
        raw.append(0)
        raw.extend(row)

    output = bytearray(PNG_SIG)
    output.extend(chunk(b"IHDR", struct.pack(">IIBBBBB", width, height, 8, 6, 0, 0, 0)))
    output.extend(chunk(b"IDAT", zlib.compress(bytes(raw), 9)))
    output.extend(chunk(b"IEND", b""))
    Path(path).write_bytes(output)


def keep_pixel(x, y, w, h):
    sx = x / w
    sy = y / h

    # Actual border strips from the Canva render.
    vertical_frame = (0.043 <= sx <= 0.077 or 0.923 <= sx <= 0.957) and 0.035 <= sy <= 0.967
    horizontal_frame = (0.035 <= sy <= 0.067 or 0.936 <= sy <= 0.968) and 0.043 <= sx <= 0.957

    # Corner florals/decorations from the PDF.
    top_left_floral = 0.055 <= sx <= 0.315 and 0.035 <= sy <= 0.19
    bottom_right_floral = 0.705 <= sx <= 0.965 and 0.845 <= sy <= 0.985

    # Preserve the very outer paper edge so the extracted frame feels native.
    outer_edge = sx <= 0.035 or sx >= 0.965 or sy <= 0.035 or sy >= 0.965

    return vertical_frame or horizontal_frame or top_left_floral or bottom_right_floral or outer_edge


def main():
    if len(sys.argv) != 3:
        raise SystemExit("Usage: extract-frame.py INPUT.png OUTPUT.png")

    width, height, rows = read_png(sys.argv[1])
    rgba_rows = []

    for y, row in enumerate(rows):
        rgba = bytearray()
        for x in range(width):
            offset = x * 3
            r, g, b = row[offset], row[offset + 1], row[offset + 2]
            alpha = 255 if keep_pixel(x, y, width, height) else 0
            rgba.extend((r, g, b, alpha))
        rgba_rows.append(rgba)

    write_png(sys.argv[2], width, height, rgba_rows)


if __name__ == "__main__":
    main()
