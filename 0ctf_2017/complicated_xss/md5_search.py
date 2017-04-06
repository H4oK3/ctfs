import IPython

def solution(s):
  line_len = len("afff57 00451787\n")

  with open("md5_sort", "rb") as f:
    L = 0
    R = 33554432-1

    while R - L > 1:
      C = L + (R - L) / 2
      offset = C * line_len
      f.seek(offset)
      ln = f.read(line_len).strip()
      head = ln[:6]
      if s == head:
        print ln
        return ln.split(" ")[1]

      if s < head:
        R = C
        continue

      L = C

    return None

