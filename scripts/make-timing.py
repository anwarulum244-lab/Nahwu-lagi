#!/usr/bin/env python3
"""Hitung waktu klausa/kata dari jeda suara (silencedetect), lalu tulis src/timing.ts."""
import re, subprocess, json, os

HERE = os.path.dirname(os.path.abspath(__file__))
WAV = os.path.join(HERE, "..", "public", "voiceover.wav")
OUT = os.path.join(HERE, "..", "src", "timing.ts")

# (adegan, klausa) — teks persis dari naskah pengguna
CL = [
("hook","Satu kesalahan baca Al-Qur’an,"),("hook","melahirkan ilmu yang dihafal santri sampai hari ini."),
("era","Abad pertama Hijriah."),("era","Islam meluas,"),("era","dan makin banyak orang non-Arab masuk Islam."),
("era","Kesalahan berbahasa Arab,"),("era","yang disebut lahn,"),("era","mulai merebak."),
("tugas","Khalifah Ali bin Abi Thalib pun menugaskan Abu al-Aswad ad-Du’ali,"),("tugas","untuk meletakkan kaidah dasarnya."),
("harakat","Abu al-Aswad bahkan memberi tanda harakat pada Al-Qur’an."),("harakat","Titik merah di atas huruf,"),("harakat","untuk fathah."),
("harakat","Dari sinilah,"),("harakat","bahasa Arab mulai punya aturan main."),
("ishabah","Dalam kitab al-Ishabah,"),("ishabah","Ibnu Hajar al-Asqalani menyebutkan bahwa Abu al-Aswad adalah orang pertama yang memberi harakat pada mushaf,"),
("ishabah","dan yang meletakkan al-‘Arabiyyah,"),("ishabah","nama awal ilmu ini."),("ishabah","Nama nahwu,"),("ishabah","baru dikenal sepeninggalnya."),
("kubu","Tapi ilmu ini belum selesai."),("kubu","Ia nyaris terbelah jadi dua kubu."),("kubu","Dua kubu itu bernama Basrah dan Kufah."),
("kubu","Di Basrah,"),("kubu","dikenal nama Sibawaih."),("kubu","Di Kufah,"),("kubu","ada al-Kisa’i."),
("kubu","Dua kota,"),("kubu","dua cara pandang,"),("kubu","dan perdebatan yang panjang."),
("tumpuk","Berabad-abad kemudian,"),("tumpuk","kaidah makin menumpuk,"),("tumpuk","dan makin berat dihafal."),
("peta","Lalu muncul seorang ulama Andalusia yang menetap di Damaskus."),("peta","Ibnu Malik."),
("alfiyah","Ibnu Malik menulis karya besar,"),("alfiyah","al-Kafiyah asy-Syafiyah,"),("alfiyah","sekitar dua ribu tujuh ratus lima puluh bait."),
("alfiyah","Terlalu berat bagi banyak pelajar."),("alfiyah","Maka ia memerasnya,"),("alfiyah","menjadi seribu dua bait."),("alfiyah","Itulah Alfiyah."),
("konon","Konon,"),("konon","saat menulis pembukanya,"),("konon","Ibnu Malik menyebut karyanya lebih unggul dari Alfiyah Ibnu Mu’thi."),
("konon","Seketika ia terhenti."),("konon","Paginya,"),("konon","ia buang bait itu,"),("konon","dan menggantinya dengan pujian untuk Ibnu Mu’thi."),
("konon","Ilmu tinggi,"),("konon","hati rendah."),
("wafat","Ibnu Malik wafat di Damaskus,"),("wafat","tahun enam ratus tujuh puluh dua Hijriah."),
("wafat","Tapi bait-baitnya masih dilantunkan,"),("wafat","tujuh abad kemudian."),
("cta","Simpan,"),("cta","dan kirim ke teman sekelas nahwu-mu."),
]

dur = float(subprocess.check_output(["ffprobe","-v","error","-show_entries","format=duration","-of","csv=p=0",WAV]).decode())
log = subprocess.run(["ffmpeg","-hide_banner","-i",WAV,"-af","silencedetect=noise=-38dB:d=0.28","-f","null","-"],capture_output=True,text=True).stderr
st = [float(x) for x in re.findall(r"silence_start: ([\d.]+)",log)]
en = [float(x) for x in re.findall(r"silence_end: ([\d.]+)",log)]
gaps = [(s,e) for s,e in zip(st,en) if s>0.3 and e<dur-0.3]
first = en[0] if st and st[0]<0.05 else 0.0

def speech_pos(t):
    return t-sum(min(e,t)-s for s,e in gaps if s<t)

total_speech = speech_pos(dur)
w = [len(re.sub(r"\W","",c)) for _,c in CL]
cum=[0]
for x in w: cum.append(cum[-1]+x)
S=cum[-1]
bpos=[cum[i]/S*total_speech for i in range(1,len(CL))]
gpos=[speech_pos(g[0]) for g in gaps]

INF=1e18; n=len(bpos); m=len(gpos); PEN=2.5
dp=[[INF]*(m+1) for _ in range(n+1)]; bk=[[None]*(m+1) for _ in range(n+1)]
dp[0][0]=0
for i in range(n+1):
    for j in range(m+1):
        if dp[i][j]>=INF: continue
        if j<m and dp[i][j]<dp[i][j+1]:
            dp[i][j+1]=dp[i][j]; bk[i][j+1]=("skip",i,j)
        if i<n:
            if dp[i][j]+PEN<dp[i+1][j]:
                dp[i+1][j]=dp[i][j]+PEN; bk[i+1][j]=("nogap",i,j)
            if j<m:
                c=dp[i][j]+abs(bpos[i]-gpos[j])
                if c<dp[i+1][j+1]:
                    dp[i+1][j+1]=c; bk[i+1][j+1]=("match",i,j)
best=min(range(m+1),key=lambda j:dp[n][j]); i,j=n,best; match={}
while (i,j)!=(0,0):
    k,pi,pj=bk[i][j]
    if k=="match": match[pi]=pj
    i,j=pi,pj

starts=[first]; ends=[]
for b in range(n):
    if b in match:
        g=gaps[match[b]]; ends.append(g[0]); starts.append(g[1])
    else:
        target=bpos[b]; lo,hi=0.0,dur
        for _ in range(40):
            mid=(lo+hi)/2
            if speech_pos(mid)<target: lo=mid
            else: hi=mid
        ends.append(lo); starts.append(lo+0.05)
ends.append(dur-0.2)

def split_chunks(words,maxw=5):
    k=max(1,-(-len(words)//maxw)); size=-(-len(words)//k)
    return [words[i:i+size] for i in range(0,len(words),size)]

clauses=[]; chunks=[]
for idx,((sc,txt),s,e) in enumerate(zip(CL,starts,ends)):
    clauses.append({"i":idx,"scene":sc,"s":round(s,3),"e":round(e,3)})
    parts=split_chunks(txt.split())
    letters=[sum(len(re.sub(r"\W","",x))+1 for x in p) for p in parts]
    tot=sum(letters); acc=0.0
    for p,l in zip(parts,letters):
        cs=s+(e-s)*acc/tot; acc+=l; ce=s+(e-s)*acc/tot
        wl=[len(re.sub(r"\W","",x))+1 for x in p]; wt=sum(wl); wa=0.0; ws=[]
        for x,l2 in zip(p,wl):
            a=cs+(ce-cs)*wa/wt; wa+=l2; b=cs+(ce-cs)*wa/wt
            ws.append({"t":x,"s":round(a,3),"e":round(b,3)})
        chunks.append({"clause":idx,"s":round(cs,3),"e":round(ce,3),"words":ws})

scenes=[]
for c in clauses:
    if not scenes or scenes[-1]["key"]!=c["scene"]:
        scenes.append({"key":c["scene"],"s":c["s"],"first":c["i"]})
for k,sc in enumerate(scenes):
    sc["e"]=scenes[k+1]["s"] if k+1<len(scenes) else dur
scenes[0]["s"]=0.0

with open(OUT,"w",encoding="utf-8") as f:
    f.write("// DIHASILKAN oleh scripts/make-timing.py — jangan diedit manual.\n")
    f.write(f"export const AUDIO_SECONDS = {dur:.3f};\n")
    f.write("export type Word = {t: string; s: number; e: number};\n")
    f.write("export type Chunk = {clause: number; s: number; e: number; words: Word[]};\n")
    f.write("export const CLAUSES: {i: number; scene: string; s: number; e: number}[] = "+json.dumps(clauses)+";\n")
    f.write("export const CHUNKS: Chunk[] = "+json.dumps(chunks,ensure_ascii=False)+";\n")
    f.write("export const SCENES: {key: string; s: number; e: number; first: number}[] = "+json.dumps(scenes)+";\n")
print("klausa",len(CL),"jeda",len(gaps),"cocok",len(match),"durasi",dur)
for sc in scenes: print(sc)
