---
title: Bedah Kode - Runtuh
cover_title: Runtuh - TLX TOKI
path: /bedah-kode-runtuh-tlx-toki
date: 2022-11-15
summary: Bedah Kode Soal Runtuh kategori Pemrograman Kompetitif Dasar TLX TOKI
tags: ['tlxtoki', 'bedah-kode', 'pkd']
categories: ['bedahkode']
is_archived: false
thumbnail: ./covers/runtuh-tlx-toki.png
author: Tio Irawan
---

Halo gaes, kali ini kita akan membahas soal kedua dari materi [Pemrograman Kompetitif Dasar](https://tlx.toki.id/courses/competitive/chapters/01/problems/B) dari [TLX TOKI](https://tlx.toki.id/).

Untuk soalnya dapat kalian lihat di [sini](https://tlx.toki.id/courses/competitive/chapters/01/problems/B).

> CATATAN: Jika kalian mencari solusi yang efisien, ini bukan solusi yang kalian cari :)

## Deskripsi Soal

Ini soal menarik! kalian tau **Tetris**? Nah, soal ini mirip dengan itu. Kalian diberikan sebuah array 2D yang berisi angka 0 dan 1. Angka 0 berarti tidak ada blok, sedangkan angka 1 berarti ada blok. Kalian harus menghapus blok yang dalam 1 baris terisi penuh. Setelah itu blok-blok yang berada di atasnya harus "diruntuhkan" ke bawah. Langsung aja kita lihat contohnya.

### Contoh Masukkan
![penuh](https://sandalphon.tlx.toki.id/api/v2/problems/JIDPROGFOsWIXAfSildUCgSt40R/render/image1.PNG)

Jika kita lihat, baris ke-5, 7, dan 8 terisi penuh dengan blok. Kita harus menghapus blok-blok itu.

![dihapus](https://sandalphon.tlx.toki.id/api/v2/problems/JIDPROGFOsWIXAfSildUCgSt40R/render/image2.PNG)

Setelah dihapus maka akan menyisahkan blok seperti gambar di atas. Kemudian kita harus merunthkan blok-blok yang berada di atasnya.

![hasilakhir](https://sandalphon.tlx.toki.id/api/v2/problems/JIDPROGFOsWIXAfSildUCgSt40R/render/image3.PNG)

Jika kalian lihat, blok-blok di atasnya jatuh secara independen. Lihat pada blok pada kolom 5 dan 6, blok di kolom 5 jatuh ke baris 10, sedangkan blok di kolom 6 jatuh ke baris 9. Dapat disimpulkan bahwa blok-blok yang telah runtuh tidak dapat lagi melayang. Jika kalian perhatikan, blok-blok di bawahnya tidak berubah posisinya. Menarik bukan?

## Let's Crack the Egg

Oke, di sini aku menggunakan cara yang bisa dibilang *naive*, jadi buat kalian
yang punya solusi lebih efisien, silahkan kirimkan di kolom komentar di bawah ya!

1. Ini tahapan yang paling simpel, kita tinggal cek tiap baris apa ada blok yang terisi penuh. Jika ada kita ubah nilainya jadi 0.
2. Setelah itu kita runtuhkan seluruh blok diatas baris terakhir yang dihapus/diubah sampai ke *last standing blocks*. Apa itu *last standing blocks*? Jadi ini adalah blok-blok pertama setelah baris terakhir yang dihapus. Masih bingung? lihat contoh di bawah ini.

Misal ada blok seperti ini

```bash
0 0 1 0
1 1 0 1
1 1 1 1
0 1 0 1
1 0 0 1
```
Setelah kita hapus baris ke-3, akan menjadi seperti ini

```bash
0 0 1 0
1 1 0 1
0 0 0 0
0 1 0 1
1 0 0 1
```
Jadi last *last standing blocks*nya adalah (X)

```bash
0 0 1 0
1 1 0 1
0 0 0 0
0 X 0 X
X 0 0 1
    X
```
Kita runtuhkan blok-blok diatasnya sampai ke *last standing blocks*.

```bash
0 0 0 0
0 0 0 0
0 1 0 1
1 X 0 X
X 0 1 1
    X
```
Sehingga menjadi

```bash
0 0 0 0
0 0 0 0
0 1 0 1
1 1 0 1
1 0 1 1
```
Jika kita lihat, seluruh blok di atas *last standing blocks* sudah runtuh. Sedangkan posisi dari *last standing blocks* dan block-block di bawahnya tidak berubah.

3. Setelah itu kita ulangi langkah 1 dan 2 sampai tidak ada lagi baris yang terisi penuh.

## Format Input dan Output

### Format Masukkan
> Baris pertama berisi dua buah bilangan bulat R dan C. R baris berikutnya masing-masing berisi C buah karakter 0 atau 1. Karakter 1 menandakan adanya bangun pada posisi tersebut.

### Format Keluaran
> R buah baris, masing-masing berisi C buah karakter yaitu kondisi akhir dari papan permainan tersebut.

### Contoh Masukkan

```bash
11 6
000000
000000
011100
110011
111111
111000
111111
111111
111001
001100
111011
```

### Contoh Keluaran

```bash
000000
000000
000000
000000
000000
010000
111000
111001
111101
001110
111011
```


## Lets Code!

Oke, sekarang kita langsung ke kode. Kita akan menggunakan bahasa pemrograman C++. Untuk proses input dan output nanti bisa dilihat di final solution.

Agar lebih mudah, di sini aku pakai array of string, jadi 
untuk proses apakah suatu baris itu terisi penuh atau tidak kita tidak perlu melakukan looping lagi.

```cpp
int r = 11, c = 6;

string blocks[r];

// variable pendukung
int top = 0; // keeping track of block teratas, jadi iterasi selanjutnya bisa dimulai dari sini, efficiency++

int lastStanding[c] = {0};  // last standing untuk tiap kolom

string fullBlock(c, '1'); // "111111"
string emptyBlock(c, '0'); // "000000"

int lastRow = -1; // varible ini punya 2 fungsi, pertama untuk mengetahui baris terakhir yang dihapus, kedua untuk mengetahui apakah emang ada baris yang dihapus.
```

Setelah itu kita buat `do-while` loop selama `lastRow != -1`. Artinya masih terdapat baris yang terisi penuh. Sehingga kita harus mengeceknya lagi

```cpp
do {
    lastRow = -1; // reset lastRow tiap iterasi

    bool topFounded = false; // to check if the topmost block has been found
    
    for (int i = top; i < r; i++) {
      if (!topFounded) { 
        // top block itu adalah block paling atas
        // sendiri, jadi nggak harus 1 baris
        bool h = blocks[i].find("1") != string::npos;

        if (h) {
          topFounded = true;
          top = i;
        }
      }

      // check apakah baris ini terisi penuh
      bool isFull = blocks[i].find(fullBlock) != string::npos;

      if (isFull) {
        blocks[i] = emptyBlock; // kita replace baris ini dengan baris kosong
        lastRow = i; // selalu perbarui lastRow
      }
    }

    ...

  } while (lastRow != -1);
```

Untuk mengecek dan menghapus baris penuh sudah selesai.
Sekarang kita tinggal runtuhkan blok-blok diatasnya.
This is a bit tricky :D

```cpp
do {

  ...

  if (lastRow != -1) {
    // pertama kita cari dulu last standing blocks
    for (int k = 0; k < c; k++) { // loop tiap kolom
      int offset = 1; // offset dimulai dari 1 (baris pertama setelah lastRow), ingat, semakin besar nilai offset, semakin ke bawah.

      while (lastRow + offset < r && blocks[lastRow + offset][k] != '1') {
        offset++;
      }

      lastStanding[k] = lastRow + offset;
    }

    // proses runtuhkan blok
    for (int i = 0; i < c; i++) {
      // kita catat ada berapa blok sebelum last standing blocks di kolom ini
      int numOfBlock = 0;
      
      for (int j = top; j < lastStanding[i]; j++) {
        if (blocks[j][i] == '1') {
          numOfBlock++;
          blocks[j][i] = '0'; // sambil dihitung sambil dihapus
        }
      }

      // setelah itu kita tinggal taruh aja blok diatas last standing block sesuai dengan jumlah block yang kita hitung
      for (int k = lastStanding[i] - numOfBlock; k < lastStanding[i]; k++) {
        blocks[k][i] = '1';
      }
    }
  }

} while (lastRow != -1);
```

And that's it! :D
Kita tinggal print hasilnya.

## Final Solution

```cpp
#include <bits/stdc++.h>
#define FAST                        \
  ios_base::sync_with_stdio(false); \
  cin.tie(NULL);
#define MOD 1000000007
typedef long long ll;

using namespace std;

int main() {
  FAST;

  int r, c;

  cin >> r >> c;

  string blocks[r];

  getline(cin, blocks[0]);

  for (int i = 0; i < r; i++) {
    getline(cin, blocks[i]);
  }

  int top = 0;
  int lastStanding[c] = {0};  // last standing
  string fullBlock(c, '1');
  string emptyBlock(c, '0');

  int lastRow = -1;

  do {
    bool topFounded = false;
    lastRow = -1;

    for (int i = top; i < r; i++) {
      if (!topFounded) { 
        bool h = blocks[i].find("1") != string::npos;

        if (h) {
          topFounded = true;
          top = i;
        }
      }

      bool isFull = blocks[i].find(fullBlock) != string::npos;

      if (isFull) {
        blocks[i] = emptyBlock;
        lastRow = i;
      }
    }

    if (lastRow != -1) {
      // pencarian last standing blocks
      for (int k = 0; k < c; k++) {
        int offset = 1;
        while (lastRow + offset < r && blocks[lastRow + offset][k] != '1') {
          offset++;
        }
        lastStanding[k] = lastRow + offset;
      }

      // proses meruntuhkan
      for (int i = 0; i < c; i++) {
        int numOfBlock = 0;

        for (int j = top; j < lastStanding[i]; j++) {
          if (blocks[j][i] == '1') {
            numOfBlock++;
            blocks[j][i] = '0';
          }
        }

        for (int k = lastStanding[i] - numOfBlock; k < lastStanding[i]; k++) {
          blocks[k][i] = '1';
        }
      }
    }

  } while (lastRow != -1);

  for (int i = 0; i < r; i++) {
    cout << blocks[i] << "\n";
  }

  return 0;
}
```