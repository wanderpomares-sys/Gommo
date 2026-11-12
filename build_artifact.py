# Gera a versão de arquivo único (para o Artifact) embutindo assets.js, sounds.js e a música
import re,sys,base64
s=open('index.html').read()
for f in ('assets.js','sounds.js'):
    s=re.sub(r'<script src="%s[^"]*"></script>'%re.escape(f),lambda m:'<script>\n'+open(f).read()+'</script>',s)
m=re.search(r"const MUSIC_URL='([^']+)'",s)
s=s.replace("'"+m.group(1)+"'","'data:audio/mpeg;base64,"+base64.b64encode(open('music.mp3','rb').read()).decode()+"'",1)
i=s.index('<title>')
open(sys.argv[1],'w').write(s[i:])
