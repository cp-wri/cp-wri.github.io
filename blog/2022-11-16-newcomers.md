---
title: Newcomers Guide - Competitive Programming
cover_title: Newcomers Guide
path: /newcomers
date: 2022-11-16
summary: Halo! Selamat datang di Competitive Programming - Workshop & Riset Informatika. Di sini, kita akan membahas tentang apa itu Competitive Programming, bagaimana cara memulai, dan sumber - sumber yang dapat membantu kalian dalam belajar Competitive Programming.
tags: ['newcomers', 'introduction']
categories: ['introduction']
thumbnail: ./newcomers.png
alternate: "Newcomers Guide - Competitive Programming"
is_archived: false
---

Kamu ingin belajar Competitive Programming? Tapi ngga tau harus mulai dari mana? Atau kamu sudah belajar tapi masih bingung harus belajar apa selanjutnya? 

Tenang, di sini kita akan membahas tentang apa itu Competitive Programming, bagaimana cara memulai, dan sumber - sumber yang dapat membantu kalian dalam belajar Competitive Programming!

### Apa itu Competitive Programming? 🤔

Singkatnya, Competitive Programming adalah sebuah kompetisi di mana kita akan diberikan sebuah permasalahan dan kita harus menyelesaikannya dengan menggunakan algoritma yang tepat. Biasanya, kita akan diberikan sebuah input dan kita harus mengeluarkan sebuah output yang sesuai dengan permasalahan yang diberikan.

### Untuk kamu yang baru memulai

Oke, untuk kamu yang baru memulai, kamu bisa memulai dengan belajar dasar - dasar pemrograman C++ terlebih dahulu. Kamu bisa banget nih belajar di [Tlx Toki Basic Fundamental](https://tlx.toki.id/courses/basic/chapters/01), di sana kamu akan diajari dasar - dasar pemrograman C++ yang sangat mudah dipahami.

Setelah kamu memahami basic - basic C++ tersebut, kamu bisa mulai mempelajari dasar - dasar pemrograman kompetitif di [Tlx Toki - Dasar Pemrograman Kompetitif](https://tlx.toki.id/courses/competitive/chapters/01/). Di sana kamu akan diajari tentang algoritma dan struktur data yang biasa digunakan dalam pemrograman kompetitif.

### Contoh Permasalahan

Oh iya, hampir semua permasalahan di pemrograman kompetitif memiliki format yang sama, yaitu:

1. Nama Permasalahan
2. Deskripsi / Cerita Permasalahan
3. Batasan Masukan
4. Format Masukan dan Keluaran
5. Contoh Masukan dan Keluaran
6. Penjelasan Contoh (Kadang ada, kadang ngga)
7. Time Limit dan Memory Limit

#### Permasalahan

##### Mencari Faktor Bilangan
**Time Limit:** 1 second

**Memory Limit:** 64 MB

Diberikan sebuah bilangan bulat positif N. Cari semua faktor dari N. Faktor dari sebuah bilangan N adalah bilangan bulat positif yang habis membagi N.

**Format Masukan**

Bilangan bulat positif N. (1 ≤ N ≤ 10^9)

**Format Keluaran**

Print semua faktor dari N.

**Contoh Masukan**

```bash
24
```

**Contoh Keluaran**

```bash
1 2 3 4 6 8 12 24
```

**Contoh Masukan 2**

```bash
1024   
```

**Contoh Keluaran 2**

```bash
1 2 4 8 16 32 64 128 256 512 1024
```

**Penjelasan**

**Contoh Masukan 1:** Faktor dari 24 adalah 1, 2, 3, 4, 6, 8, 12, 24.

**Cara penyelesaian:** dengan mencari bilangan bulat yang habis membagi 24. Bilangan bulat yang habis membagi 24 adalah 1, 2, 3, 4, 6, 8, 12, 24.

### Set-Up Competitive Programming

Untuk memulai competitive programming, kita memerlukan beberapa tools. Well, tools yang kita butuhkan tidak banyak. Kita hanya membutuhkan [Visual Studio Code](https://code.visualstudio.com/) dan [C++ Compiler](https://www.jagoankode.com/tutorial-install-dev-c-terlengkap/).

Kenapa disarankan menggunakan C++? Hal ini dikarenakan C++ sangat cepat dibandingkan bahasa pemrograman lainnya. Selain itu, C++ juga memiliki banyak library yang dapat membantu kita dalam menyelesaikan permasalahan.

### Contoh Penyelesaian Permasalahan

Kita akan menyelesaikan permasalahan Mencari Faktor Bilangan menggunakan C++. Namun di sini kita akan mencoba untuk membandingkan waktu eksekusi dari 2 cara penyelesaian yang berbeda.

> Disarankan untuk mencoba menyelesaikan permasalahan ini sendiri terlebih dahulu sebelum melihat penyelesaian yang ada di bawah ini.


```cpp
// Cara 1
#include <bits/stdc++.h>
using namespace std;

int main() {
    int n;
    cin >> n;
    for (int i = 1; i <= n; i++) {
        if (n % i == 0) {
            cout << i << " ";
        }
    }
    cout << endl;
    return 0;
}
```

Kalau kita lihat solusi pertama, dia akan mencoba mencari bilangan bulat yang habis membagi N hingga N kali. Jadi, kompleksitasnya adalah O(N). Bayangkan kalau N nya 10^9, maka dia akan mencoba mencari bilangan bulat yang habis membagi 10^9 hingga 10^9 kali. Jadi, kompleksitasnya adalah O(10^9). Nah, ini adalah salah satu cara yang tidak efisien dalam menyelesaikan permasalahan ini.

Lalu, bagaimana cara yang efisien dalam menyelesaikan permasalahan ini? Kita bisa mencoba menyelesaikan permasalahan ini dengan cara yang berbeda.

```cpp
// Cara 2
#include <bits/stdc++.h>
using namespace std;

int main() {
    int n;
    cin >> n;
    for (int i = 1; i * i <= n; i++) {
        if (n % i == 0) {
            cout << i << " ";
            if (i * i != n) {
                cout << n / i << " ";
            }
        }
    }
    cout << endl;
    return 0;
}
```

Kalau kita lihat solusi kedua, dia akan mencoba mencari bilangan bulat yang habis membagi N hingga akar dari N kali. Jadi, kompleksitasnya adalah O(akar dari N). 

Misalkan N yang kita masukkan adalah 10^9, maka dia akan mencoba mencari bilangan bulat yang habis membagi 10^9 hingga akar dari 10^9 kali. Jadi, kompleksitasnya adalah O(akar 10^9). Nah, ini adalah salah satu cara yang efisien dalam menyelesaikan permasalahan ini.

### Penutup

Yang paling penting, jangan lupa untuk selalu berlatih! Latihan tidak sekadar "latihan", namun latihan harus dilakukan dengan cara yang benar. Tidak harus cepat - cepatan, FOMO, atau yang lainnya. Berusaha untuk belajar cara belajar yang benar. Selamat mencoba!

### Another Resources

As always, kamu bisa menemukan banyak resource untuk belajar competitive programming di internet. Berikut adalah beberapa resource yang bisa kamu coba:

- [What is Competitive Programming?](https://www.youtube.com/watch?v=ueNT-w7Oluw)
- [How to Become Red Coder?](https://www.youtube.com/watch?v=y7169jEvb-Y)
- [cp-algorithms](https://cp-algorithms.com/)
- [Competitive Programmer's Handbook](https://cses.fi/book/book.pdf)
- [Fundamental Algorithms](https://www.geeksforgeeks.org/fundamentals-of-algorithms/)