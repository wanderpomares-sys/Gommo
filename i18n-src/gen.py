# -*- coding: utf-8 -*-
import json,sys
sys.path.insert(0,'/home/claude/work')
from dict1 import D1
from dict2 import D2
try:
    from dict3 import D3
except Exception: D3=[]
rows={}
for r in D1+D2+D3:
    assert len(r)==4,r
    rows[r[0]]=r
# correções
rows['Passe a fase ']=['Passe a fase ','Beat level ','Supera el nivel ','Schaffe Level ']
D=list(rows.values())
ENGINE=open('/home/claude/gommo/i18n-src/engine.js').read()
try:
    from dict3 import RX
except Exception: RX=[]
out=ENGINE.replace('/*DICT*/',json.dumps(D,ensure_ascii=False,separators=(',',':'))).replace('/*RX*/',json.dumps(RX,ensure_ascii=False,separators=(',',':')))
open('/home/claude/gommo/i18n.js','w').write(out)
print(len(D),'entradas',len(out),'bytes')
