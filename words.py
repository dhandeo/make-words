from __future__ import print_function
from uniseg.graphemecluster import grapheme_clusters
import unicodedata

def splitclusters(s):
    """Generate the grapheme clusters for the string s. (Not the full
    Unicode text segmentation algorithm, but probably good enough for
    Devanagari.)

    """
    virama = u'\N{DEVANAGARI SIGN VIRAMA}'
    cluster = u''
    last = None
    for c in s:
        cat = unicodedata.category(c)[0]
        if cat == 'M' or cat == 'L' and last == virama:
            cluster += c
        else:
            if cluster:
                yield cluster
            cluster = c
        last = c
    if cluster:
        yield cluster

fin = open("wordlist.mr.txt")
for aline in fin.readlines():
    if len(aline):
        print(aline)
        # for i in grapheme_clusters(aline):
        for i in splitclusters(aline):
            print(i)
