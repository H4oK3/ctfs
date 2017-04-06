import md5

md5_dic = open('md5_dic','w')

for i in range(0,0x2000000):
    s = "%.8x" % i
    md5_dic.write("%s %s\n" % (md5.md5(s).hexdigest()[:6], s))
