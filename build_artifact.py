# Gera a versão de arquivo único (para o Artifact) embutindo assets.js e sounds.js
import re,sys
s=open('index.html').read()
for f in ('assets.js','sounds.js'):
    s=re.sub(r'<script src="%s[^"]*"></script>'%re.escape(f),lambda m:'<script>\n'+open(f).read()+'</script>',s)
i=s.index('<title>')
open(sys.argv[1],'w').write(s[i:])
