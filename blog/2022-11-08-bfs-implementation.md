---
title: Implementasi Depth First Search (DFS) dalam Menghitung Jumlah Pulau Menggunakan Java — Leetcode#200 Problems!
cover_title: DFS dalam Menghitung Jumlah Pulau
path: /dfs-implementation
date: 2022-11-08
summary: Kita akan mempelajari bagaimana cara mengimplementasikan Depth First Search (DFS) dalam menghitung jumlah pulau menggunakan Java.
tags: ['leetcode', 'bfs', 'dfs', 'java']
categories: ['leetcode']
thumbnail: ./dfs-implementation.png
is_archived: false
---

Alohaaa! Buat yang belum kenal aku, salam kenal namaku Ali Zul!

Nah di kesempatan kali ini aku mau sedikit sharing seputar implementasi depth first search atau dfs di problem menghitung jumlah pulau menggunakan java nih! Well, sebenernya ini merupakan problem dari leetcode tapi di sini aku mau coba breakdown step by step supaya temen — temen juga bisa paham :)

Sebenernya sekalian ngenalin ke temen — temen tentang competitive programming + how to think the algorithm supaya bisa solve suatu problem itu sendiri. Oke daripada berlama — lama, lets crack this problem!

<!-- image -->
![Island](https://miro.medium.com/max/720/0*r1O3j2zZC3N7XAcG)

## Definisi Dasar Depth First Search
Depth First Search atau DFS merupakan sebuah algoritma untuk melakukan pencarian secara depth atau dalam dari sebuah titik start secara berurutan.

![DFS](https://miro.medium.com/max/720/0*hfiszpvOfr5TEVhP.jpg)

## Pahamin soalnya, yuk!

![Leetcode_question](https://miro.medium.com/max/640/1*w0-IHlGwvFezNLdH4R5bww.png)

Jadi kalau dipahamin definisi dasar dari soalnya, kita diberikan sebuah grid sebesar m x n (2 Dimensi) yang berisi sebuah karakter 0 dan 1 yang mengrepresentasikan daratan (‘1’) dan laut (‘0’).

Pemahaman kata kunci yang kedua adalah, sebuah daratan akan terhitung satu kesatuan pulau apabila daratan dikelilingi oleh laut dan daratan berdekatan satu sama lain secara horizontal maupun vertikal (tidak secara miring)

Bingung? Oke kita lihat contohnya, yuk!

Contoh 1

```python
grid = [
  ["1","1","1","1","0"],
  ["1","1","0","1","0"],
  ["1","1","0","0","0"],
  ["0","0","0","0","0"]
]
Output: 1
```

Wah kenapa ini bisa jadi 1 pulau? padahal itu kan 1-nya ada banyak, well kalau kita lihat kembali ke definisi dasar bahwa “Sebuah pulau adalah daratan yang terkoneksi dan dikelilingi laut yang terhubung secara horizontal maupun vertikal”

Oke mari kita visualisasikan supaya temen — temen makin paham sama konsepnya

![Contoh 1](https://miro.medium.com/max/720/1*mCZsJ5oCxu2y7DODF78zNQ.png)

Nah, karena yang ditanya adalah “Jumlah pulau” bukan “Jumlah daratan” dan ada definisi bahwa pulau merupakan daratan yang berdekatan atau terkoneksi secara horizontal maupun vertikal maka apabila ada sebuah daratan ke-1 dan ke-2 yang bersebelahan akan dianggap menjadi satu pulau. Kita coba ke contoh yang kedua ya!

```python
Input: grid = [
  ["1","1","0","0","0"],
  ["1","1","0","0","0"],
  ["0","0","1","0","0"],
  ["0","0","0","1","1"]
]
Output: 3
```

Kalau kita visualisasikan akan menjadi seperti ini 👇

![Contoh 2](https://miro.medium.com/max/720/1*sbR6JACehLrjMvcByunn-A.png)

Kenapa kok terhitung 3 padahal kalau divisualkan itu seperti tersambung satu sama lain? Kembali ke definisi bahwa pulau merupakan gabungan dari daratan yang terkoneksi secara HORIZONTAL maupun VERTIKAL. Jadi, kalau di luar itu akan terhitung 1 pulau tersendiri

![Contoh 3](https://miro.medium.com/max/640/1*mMGElrvJEj7JFRjqeAdl9w.png)

That’s the reason why terhitung menjadi 3 pulau aja :) Oke, idenya sudah dapat, kan? Sekarang, gimana caranya untuk solve problem di atas? Lets go to the next chapter!

## How to solve the problem

Oke sekarang kita masuk ke dalam part yang penting banget, yaitu pemahaman logika untuk menyelesaikan soal di atas

Pertama — tama untuk menyelesaikan soal ini kita perlu membuat kerangka logika seperti ini :

### Visual Step by Step :

![Visual Step by Step](https://miro.medium.com/max/720/1*eUw9OhrA9l16VDLEqWReLA.png)

#### Logika Dasar

1. Baca grid baris ke-i dan kolom ke-j, apabila dia bernilai ‘1’ atau daratan maka kita ubah grid baris ke-i dan kolom ke-j menjadi ‘0’, kenapa ini dilakukan? Well, ini hanya sebagai penanda bahwa daratan tersebut sudah dilewati
2. Setelah kita ubah menjadi ‘0’, kita cek grid baris ke-(i+1) dan kolom ke-j, jadi misalkan nih saat ini kita di grid(x,y) → grid(0,0), kita cek dulu ke grid(1,0) →grid(2,0), sampai nanti ada suatu titik (x,y) yang ternyata itu bernilai ‘0’, maka kita berhenti
3. Setelah kita berhenti melakukan pengecekan terhadap baris dan kolom tersebut, kita tambahkan index kolom untuk melakukan pengecekan ke grid baris ke-i dan kolom-j berikutnya yaitu grid(2,1) →grid(1,1) →grid(0,1)
4. Setelah itu kita lakukan cek ke baris dan kolom seterusnya hingga tidak ada lagi daratan tersisa dalam satu koneksi
5. Apabila dalam satu koneksi daratan sudah tidak ada daratan lain yang berdekatan secara horizontal ataupun vertikal, kita hitung koneksi tersebut sebagai 1 pulau
6. Ulangi step 1 dengan menambahkan kolom untuk melakukan cek ke kanan, lalu kita tambahkan index baris untuk melakukan cek ke bawah

### Code Step By Step
```java
public static int dfsSolve(char[][] grid, int baris, int kolom) {
}
```

Kode di atas merupakan deklarasi function di bahasa pemrograman java yang menerima 3 buah argumen, yaitu :

1. Grid → Array 2 dimensi yang berisi ‘0’ dan ‘1’,
2. Baris → Baris ke berapa nantinya,
3. Kolom → Kolom ke berapa nantinya.

```java
public static int dfsSolve(char[][] grid, int baris, int kolom){
if ( baris >= grid.length || kolom >= grid[0].length || baris < 0 || kolom < 0 || grid[baris][kolom] == '0' || grid.length == 0) return 0;
}
```

Di awal kita memberikan base case, yaitu kita melakukan check terhadap 5 jenis kondisi, mulai dari :

1. Apakah baris melebihi panjang baris dari array (baris ≥ grid.length?)
2. Apakah kolom melebihi panjang kolom dari array (kolom ≥ grid[0].length?)
3. Apakah nilai baris kurang dari 0? (baris < 0 ?)
4. Apakah nilai kolom kurang dari 0? (kolom < 0?)
5. Apakah grid baris ke-i dan kolom ke-j adalah ‘0’?
6. dan yang terakhir, apakah grid tidak ada isinya atau grid.length == 0? Jika iya, maka kita kembalikan nilai 0

Langkah ke-2
```java
public static int dfsSolve(char[][] grid, int baris, int kolom){
if ( baris >= grid.length || kolom >= grid[0].length || baris < 0 || kolom < 0 || grid[baris][kolom] == '0' || grid.length == 0) { 
return 0;
}
if (grid[baris][kolom] == '1') {
    grid[baris][kolom] = '0';
            
    dfsSolve(grid, baris + 1, kolom);
    dfsSolve(grid, baris - 1, kolom);
    dfsSolve(grid, baris, kolom + 1);
    dfsSolve(grid, baris, kolom - 1);
 }
return 1;
}
```

Di tahap berikutnya kita akan melakukan pengecekan terhadap grid baris ke-i dan kolom ke-j, apakah dia bernilai ‘1’ ? Jika iya, maka akan kita melakukan step :

1. Ubah grid baris ke-i dan kolom ke-j menjadi ‘0’ atau sudah dikunjungi
2. Panggil fungsi dfsSolve namun, tambahkan 1 nilai ke baris supaya melakukan pengecekan ke baris berikutnya
3. Panggil fungsi dfsSolve lagi, namun saat ini kurangi 1 nilainya untuk melakukan pengecekan ke baris sebelumnya
4. Panggil fungsi dfsSolve, tetapi saat ini tambahkan 1 ke dalam kolomnya supaya dapat mengecek ke kolom kanan
5. Panggil lagi fungsi dfsSolve, namun kali ini kurangkan 1 ke dalam kolom supaya dapat melakukan pengecekan ke kolom bagian kiri
6. Jika sudah selesai, maka kembalikan nilai 1

Step di atas merupakan sebuah step secara rekursif, jadi dia akan memanggil fungsinya sendiri dan akan melakukan logika dari awal lagi.

#### Main Program
```java
public int numIslands(char[][] grid) {
        int res = 0;
        
        for (int i = 0; i < grid.length; i++) {
            for (int j = 0; j < grid[i].length; j++) {
                res += dfsSolve(grid, i, j);
            }
        }
        
        return res;
}
```

Nah di sini sebenernya simple2 aja, di awal kita inisialisasikan sebuah variable result dengan tipe data integer dan memiliki nilai awal 0

Setelah itu kita lakukan nested loop dan kita beri nilai tambah ke dalam variable res dengan memanggil fungsi yang berisi dfsSolve(grid, i, j)

### Full Program

```java
class Solution {
    public int numIslands(char[][] grid) {
        int res = 0;
        
        for (int i = 0; i < grid.length; i++) {
            for (int j = 0; j < grid[i].length; j++) {
                res += dfsSolve(grid, i, j);
            }
        }
        
        return res;
    }
    
    public static int dfsSolve(char [][] grid, int baris, int kolom) {
        if ( baris >= grid.length || kolom >= grid[0].length || baris < 0 || kolom < 0 || grid[baris][kolom] == '0' || grid.length == 0) return 0;
        
        if (grid[baris][kolom] == '1') {
            grid[baris][kolom] = '0';
            
            dfsSolve(grid, baris + 1, kolom);
            dfsSolve(grid, baris - 1, kolom);
            dfsSolve(grid, baris, kolom + 1);
            dfsSolve(grid, baris, kolom - 1);
        }
        
        return 1;
    }
}
```

## Penutup

Yuhuu! Gimana, seru gak sih nyelesaiin soal yang beginii? Eits, tapi kalo temen — temen ngerasa “kok susah ya?”, “kok kurang paham ya?” jangan takut! Sebenernya temen — temen bukan “ngga paham”, tapi “belum dapet ide”-nya aja! Nah caranya gimana sih biar bisa paham sama soal — soal yang competitive, tentu dengan dilatih setiap hari secara konsisten.

Kalian bisa belajar melalui hackerrank, leetcode, codeforces, tlx toki, ataupun website lainnya. Lalu yang kedua, kalian bisa nih dengan belajar lebih dalam konsep dasar dari algoritma dan struktur data! So, pemahaman kalian akan jauuuh lebih matang :)
