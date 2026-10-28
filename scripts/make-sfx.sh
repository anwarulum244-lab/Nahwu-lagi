#!/usr/bin/env bash
# Membuat SFX & backsound sintetis (milik sendiri, bebas hak cipta) dengan ffmpeg.
set -e
D="$(dirname "$0")/../public/sfx"; mkdir -p "$D"
F="ffmpeg -hide_banner -loglevel error -y"
# whoosh halus
$F -f lavfi -i "anoisesrc=d=1.0:c=pink:a=0.6:r=44100" -af "highpass=f=300,lowpass=f=5000,tremolo=f=3:d=0.3,afade=t=in:st=0:d=0.45:curve=qsin,afade=t=out:st=0.45:d=0.55:curve=exp,volume=1.2" "$D/whoosh.wav"
# impact / hit dalam
$F -f lavfi -i "sine=f=55:d=1.4:r=44100" -f lavfi -i "anoisesrc=d=0.25:c=brown:a=0.7:r=44100" -filter_complex "[0]afade=t=out:st=0:d=1.4:curve=exp[a];[1]lowpass=f=900,afade=t=out:st=0:d=0.25[b];[a][b]amix=inputs=2:normalize=0,volume=1.6" "$D/impact.wav"
# chime lembut
$F -f lavfi -i "sine=f=880:d=1.8:r=44100" -f lavfi -i "sine=f=1318.5:d=1.8:r=44100" -f lavfi -i "sine=f=1760:d=1.8:r=44100" -filter_complex "[0][1][2]amix=inputs=3:normalize=0,afade=t=in:st=0:d=0.01,afade=t=out:st=0:d=1.8:curve=exp,aecho=0.8:0.5:90:0.3,volume=0.6" "$D/chime.wav"
# tick pendek (hitung)
$F -f lavfi -i "sine=f=2200:d=0.05:r=44100" -af "afade=t=out:st=0:d=0.05,volume=0.7" "$D/tick.wav"
# goresan / coret
$F -f lavfi -i "anoisesrc=d=0.45:c=white:a=0.5:r=44100" -af "bandpass=f=2500:w=1800,afade=t=in:st=0:d=0.05,afade=t=out:st=0.2:d=0.25" "$D/scratch.wav"
# riser pendek
$F -f lavfi -i "anoisesrc=d=1.6:c=pink:a=0.5:r=44100" -af "bandpass=f=1200:w=900,afade=t=in:st=0:d=1.5:curve=exp,afade=t=out:st=1.5:d=0.1" "$D/riser.wav"
# pad ambient (backsound) ~150 dtk, mp3
$F -f lavfi -i "sine=f=110:d=150:r=44100" -f lavfi -i "sine=f=164.81:d=150:r=44100" -f lavfi -i "sine=f=220:d=150:r=44100" -f lavfi -i "sine=f=277.18:d=150:r=44100" -filter_complex "[0]volume=1.0[a];[1]volume=0.6,tremolo=f=0.15:d=0.5[b];[2]volume=0.5,tremolo=f=0.11:d=0.6[c];[3]volume=0.25,tremolo=f=0.1:d=0.7[d];[a][b][c][d]amix=inputs=4:normalize=0,lowpass=f=900,aecho=0.7:0.6:700|1100:0.35|0.25,afade=t=in:st=0:d=3,volume=0.9" -c:a libmp3lame -b:a 128k "$D/pad.mp3"
ls -la "$D"
