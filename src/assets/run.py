import sys
try:
    from googlesearch import search
except ImportError: 
    print("No module named 'google' found")
# to search
query = sys.argv[1]
tld = sys.argv[2]
lang = sys.argv[3]
num = int(sys.argv[4])
stop = int(sys.argv[5])
pause = int(sys.argv[6])
 
for j in search(query, tld=tld, lang=lang, num=num, stop=stop, pause=pause):
    print(j)